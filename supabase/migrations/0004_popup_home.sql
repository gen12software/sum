-- ─────────────────────────────────────────────────────────────
-- Pop-up del inicio
--
-- Ejecutar una única vez desde el SQL Editor de Supabase, ANTES
-- de desplegar el código que la usa: sin la tabla, la pantalla
-- del panel falla al abrirse.
--
-- Crea la tabla de configuración del aviso, su fila única, el
-- bucket de imágenes y la política de lectura pública.
-- ─────────────────────────────────────────────────────────────

-- ── Configuración del pop-up ─────────────────────────────────
-- No es una colección: hay un único aviso vigente. La tabla se
-- restringe a una sola fila con una clave primaria booleana que
-- solo admite el valor true. Así el panel siempre lee un
-- registro y nunca tiene que distinguir entre "no configurado" y
-- "vacío".

create table if not exists public.popup_home (
  id              boolean     primary key default true,
  activo          boolean     not null default false,
  -- [{ url, path, alt, orden, ancho?, alto? }] — mismo contrato
  -- que novedades.imagenes, para poder reutilizar el uploader.
  imagenes        jsonb       not null default '[]'::jsonb,
  -- Ruta interna del sitio o dirección absoluta. Opcional.
  enlace          text,
  -- Vigencia opcional. Se evalúa en el navegador del visitante,
  -- no en la consulta: las páginas se generan estáticas y un
  -- filtro por fecha del lado del servidor quedaría congelado
  -- hasta la próxima revalidación.
  vigencia_desde  date,
  vigencia_hasta  date,
  updated_at      timestamptz not null default now(),

  constraint popup_home_fila_unica check (id),

  constraint popup_home_vigencia_coherente
    check (
      vigencia_desde is null
      or vigencia_hasta is null
      or vigencia_hasta >= vigencia_desde
    )
);

comment on table public.popup_home is
  'Configuración del único aviso emergente del inicio. Tabla de una sola fila.';

comment on column public.popup_home.imagenes is
  'Array de { url, path, alt, orden, ancho?, alto? }. Con una imagen el aviso se muestra fijo; con varias, como carrusel.';

comment on column public.popup_home.enlace is
  'Destino opcional al tocar el aviso: ruta interna que empieza con / o dirección absoluta http(s).';

-- ── Mantenimiento de updated_at ──────────────────────────────
-- Reutiliza la función creada en la migración 0001. El valor
-- además identifica la versión del contenido: el sitio lo usa
-- como parte de la clave con la que recuerda que un visitante ya
-- cerró el aviso, de modo que al editarlo vuelva a mostrarse.

drop trigger if exists popup_home_set_updated_at on public.popup_home;

create trigger popup_home_set_updated_at
  before update on public.popup_home
  for each row
  execute function public.set_updated_at();

-- ── Fila inicial ─────────────────────────────────────────────
-- Desactivada y sin imágenes: el sitio queda exactamente igual
-- que antes hasta que alguien cargue contenido desde el panel.

insert into public.popup_home (id)
values (true)
on conflict (id) do nothing;

-- ── Row Level Security ───────────────────────────────────────
-- Igual que novedades: se habilita sin definir políticas, lo que
-- bloquea todo acceso con las claves anon y authenticated. La
-- lectura y la escritura ocurren en el servidor con la
-- service_role key, que omite RLS por diseño.

alter table public.popup_home enable row level security;

-- ── Bucket de Storage ────────────────────────────────────────
-- Separado del de novedades para que borrar el contenido de un
-- dominio nunca pueda alcanzar al otro, y para que el uso de
-- almacenamiento sea legible por separado.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'popup-imagenes',
  'popup-imagenes',
  true,
  10485760, -- 10 MB
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
  set public             = excluded.public,
      file_size_limit    = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- Lectura pública para cualquiera. No se definen políticas de
-- escritura: subir y borrar requiere la service_role key, que
-- solo se usa del lado del servidor tras validar la sesión.

drop policy if exists "popup imagenes lectura publica" on storage.objects;

create policy "popup imagenes lectura publica"
  on storage.objects
  for select
  to public
  using (bucket_id = 'popup-imagenes');
