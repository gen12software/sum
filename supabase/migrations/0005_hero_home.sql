-- ─────────────────────────────────────────────────────────────
-- Carrusel del inicio
--
-- Ejecutar una única vez desde el SQL Editor de Supabase, ANTES
-- de desplegar el código que la usa: sin la tabla, la pantalla
-- del panel falla al abrirse.
--
-- El sitio público, en cambio, tolera que esta migración no haya
-- corrido: sin imágenes cargadas el carrusel cae al respaldo
-- incluido en el proyecto y el inicio se ve como siempre.
--
-- Crea la tabla de configuración del carrusel, su fila única, el
-- bucket de imágenes y la política de lectura pública.
-- ─────────────────────────────────────────────────────────────

-- ── Configuración del carrusel ───────────────────────────────
-- No es una colección: hay un único carrusel. Igual que en
-- popup_home, la tabla se restringe a una sola fila con una
-- clave primaria booleana que solo admite el valor true. Así el
-- panel siempre lee un registro y nunca tiene que distinguir
-- entre "no configurado" y "vacío".

create table if not exists public.hero_home (
  id          boolean     primary key default true,
  -- [{ url, path, alt, orden, foco, ancho?, alto? }] — el mismo
  -- contrato que novedades.imagenes más `foco`, para poder
  -- reutilizar el uploader del panel tal como está.
  --
  -- `foco` es un par de porcentajes con el formato de la
  -- propiedad object-position de CSS ("50% 50%", "50% 0%"): la
  -- imagen ocupa todo el espacio del carrusel y se recorta para
  -- llenarlo, y este valor decide qué parte queda visible. Es
  -- exactamente el ajuste que antes estaba escrito a mano en el
  -- código, uno por slide.
  imagenes    jsonb       not null default '[]'::jsonb,
  updated_at  timestamptz not null default now(),

  constraint hero_home_fila_unica check (id)
);

comment on table public.hero_home is
  'Configuración del único carrusel del inicio. Tabla de una sola fila. Sin imágenes, el sitio usa el respaldo incluido en el proyecto.';

comment on column public.hero_home.imagenes is
  'Array de { url, path, alt, orden, foco, ancho?, alto? }. Hasta 6 imágenes; el tope se valida en la aplicación. `foco` es un object-position de CSS que define qué parte de la imagen sobrevive al recorte.';

-- ── Mantenimiento de updated_at ──────────────────────────────
-- Reutiliza la función creada en la migración 0001.

drop trigger if exists hero_home_set_updated_at on public.hero_home;

create trigger hero_home_set_updated_at
  before update on public.hero_home
  for each row
  execute function public.set_updated_at();

-- ── Fila inicial ─────────────────────────────────────────────
-- Sin imágenes: el inicio sigue mostrando el carrusel de
-- respaldo, idéntico al de hoy, hasta que alguien cargue
-- contenido desde el panel.

insert into public.hero_home (id)
values (true)
on conflict (id) do nothing;

-- ── Row Level Security ───────────────────────────────────────
-- Igual que novedades y el pop-up: se habilita sin definir
-- políticas, lo que bloquea todo acceso con las claves anon y
-- authenticated. La lectura y la escritura ocurren en el
-- servidor con la service_role key, que omite RLS por diseño.

alter table public.hero_home enable row level security;

-- ── Bucket de Storage ────────────────────────────────────────
-- Separado del de novedades y del pop-up para que borrar el
-- contenido de un dominio nunca pueda alcanzar al otro, y para
-- que el uso de almacenamiento sea legible por separado.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'hero-imagenes',
  'hero-imagenes',
  true,
  10485760, -- 10 MB
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
  set public             = excluded.public,
      file_size_limit    = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- Lectura pública para cualquiera: son las imágenes principales
-- del inicio. No se definen políticas de escritura: subir y
-- borrar requiere la service_role key, que solo se usa del lado
-- del servidor tras validar la sesión.

drop policy if exists "hero imagenes lectura publica" on storage.objects;

create policy "hero imagenes lectura publica"
  on storage.objects
  for select
  to public
  using (bucket_id = 'hero-imagenes');
