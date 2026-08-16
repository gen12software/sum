-- ─────────────────────────────────────────────────────────────
-- Novedades — esquema inicial
--
-- Ejecutar una única vez desde el SQL Editor de Supabase.
-- Crea las tablas, los índices, los buckets de Storage, las
-- políticas de acceso y el usuario del panel.
-- ─────────────────────────────────────────────────────────────

-- Provee crypt() y gen_salt(): el hasheo de contraseñas ocurre
-- dentro de la base, no en la aplicación.
create extension if not exists pgcrypto with schema extensions;

-- Las llamadas a crypt() y gen_salt() van sin calificar y se
-- resuelven por search_path: así funcionan tanto si pgcrypto quedó
-- en el esquema extensions como si ya estaba instalado en public.
set search_path = public, extensions;

-- ── Tabla de novedades ───────────────────────────────────────

create table if not exists public.novedades (
  id                 uuid primary key default gen_random_uuid(),
  slug               text        not null unique,
  titulo             text        not null,
  descripcion        text        not null,
  -- [{ url, path, alt, orden }]
  imagenes           jsonb       not null default '[]'::jsonb,
  video_url          text,
  video_path         text,
  video_orientacion  text,
  destacada          boolean     not null default false,
  publicada          boolean     not null default false,
  orden              integer     not null default 0,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now(),

  constraint novedades_video_orientacion_valida
    check (video_orientacion is null or video_orientacion in ('vertical', 'horizontal')),

  -- Una novedad con video debe declarar su orientación
  constraint novedades_video_requiere_orientacion
    check (video_url is null or video_orientacion is not null),

  constraint novedades_titulo_largo
    check (char_length(titulo) between 1 and 150)
);

-- Ordenamiento del listado: destacadas primero, luego posición manual
create index if not exists novedades_orden_idx
  on public.novedades (destacada desc, orden asc);

-- Filtrado del listado público
create index if not exists novedades_publicada_idx
  on public.novedades (publicada)
  where publicada;

-- ── Mantenimiento de updated_at ──────────────────────────────

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists novedades_set_updated_at on public.novedades;

create trigger novedades_set_updated_at
  before update on public.novedades
  for each row
  execute function public.set_updated_at();

-- ── Reordenamiento ───────────────────────────────────────────
-- Reasigna la posición de todas las novedades en una sola
-- sentencia, según el orden del array recibido. Hacerlo con un
-- update por fila desde la aplicación dejaría el listado en un
-- estado intermedio si alguno fallara.

create or replace function public.reordenar_novedades(ids uuid[])
returns void
language sql
as $$
  update public.novedades as n
     set orden = pos.idx::integer
    from unnest(ids) with ordinality as pos(id, idx)
   where n.id = pos.id;
$$;

-- Solo se invoca desde el servidor con la service_role key.
revoke execute on function public.reordenar_novedades(uuid[]) from public, anon, authenticated;

-- ── Usuario del panel ────────────────────────────────────────
-- La contraseña se guarda como hash bcrypt generado por pgcrypto.
-- Nunca en texto plano, y nunca sale de la base: la verificación
-- también ocurre acá (ver verificar_credenciales más abajo).
--
-- No hay pantalla de registro ni recuperación automática.

create table if not exists public.admin_usuarios (
  id            uuid primary key default gen_random_uuid(),
  usuario       text        not null unique,
  password_hash text        not null,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

drop trigger if exists admin_usuarios_set_updated_at on public.admin_usuarios;

create trigger admin_usuarios_set_updated_at
  before update on public.admin_usuarios
  for each row
  execute function public.set_updated_at();

-- ── Verificación de credenciales ─────────────────────────────
-- Devuelve el id del usuario si las credenciales son correctas, o
-- NULL en cualquier otro caso.
--
-- Cuando el usuario no existe se ejecuta igualmente un crypt()
-- contra un hash señuelo: sin eso la respuesta sería mucho más
-- rápida y permitiría descubrir qué nombres de usuario son válidos.

create or replace function public.verificar_credenciales(
  p_usuario  text,
  p_password text
)
returns uuid
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_id   uuid;
  v_hash text;
begin
  select id, password_hash
    into v_id, v_hash
    from public.admin_usuarios
   where usuario = p_usuario;

  if v_hash is null then
    perform crypt(p_password, gen_salt('bf', 12));
    return null;
  end if;

  -- crypt() rehashea con el salt embebido en v_hash: si coinciden,
  -- la contraseña es correcta.
  if v_hash = crypt(p_password, v_hash) then
    return v_id;
  end if;

  return null;
end;
$$;

-- ── Cambio de contraseña ─────────────────────────────────────
-- Exige la contraseña actual. Devuelve true solo si se actualizó.

create or replace function public.cambiar_password(
  p_usuario text,
  p_actual  text,
  p_nueva   text
)
returns boolean
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_id uuid;
begin
  if char_length(p_nueva) < 8 then
    return false;
  end if;

  v_id := public.verificar_credenciales(p_usuario, p_actual);

  if v_id is null then
    return false;
  end if;

  update public.admin_usuarios
     set password_hash = crypt(p_nueva, gen_salt('bf', 12))
   where id = v_id;

  return true;
end;
$$;

-- Estas funciones son SECURITY DEFINER: hay que quitarles el
-- permiso de ejecución público o cualquiera con la clave anon
-- podría probar contraseñas contra ellas. Solo las invoca el
-- servidor con la service_role key.
revoke execute on function public.verificar_credenciales(text, text) from public, anon, authenticated;
revoke execute on function public.cambiar_password(text, text, text) from public, anon, authenticated;

-- ── Usuario inicial ──────────────────────────────────────────
-- No se crea acá: el usuario y la contraseña se eligen en
--
--   supabase/migrations/0002_usuario_inicial.sql
--
-- Ese archivo está fuera del control de versiones, para que la
-- contraseña en claro no termine commiteada en el repositorio.
-- Ejecutarlo después de esta migración.

-- ── Intentos de login del panel ──────────────────────────────
-- El contador en memoria de src/lib/rate-limit.ts no sirve en
-- serverless: cada instancia mantiene su propio estado. Los
-- intentos se registran acá para que el límite sea efectivo.

create table if not exists public.admin_login_attempts (
  id         bigserial   primary key,
  ip         text        not null,
  created_at timestamptz not null default now()
);

create index if not exists admin_login_attempts_ip_idx
  on public.admin_login_attempts (ip, created_at desc);

-- ── Row Level Security ───────────────────────────────────────
-- Se habilita RLS sin definir políticas: eso bloquea todo acceso
-- con las claves anon y authenticated. Toda la lectura y escritura
-- ocurre del lado del servidor con la service_role key, que
-- omite RLS por diseño.

alter table public.novedades            enable row level security;
alter table public.admin_usuarios       enable row level security;
alter table public.admin_login_attempts enable row level security;

-- ── Buckets de Storage ───────────────────────────────────────
-- Públicos para lectura, porque las imágenes y videos se sirven
-- directo al visitante. La escritura se restringe más abajo.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'novedades-imagenes',
  'novedades-imagenes',
  true,
  10485760, -- 10 MB
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
  set public             = excluded.public,
      file_size_limit    = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'novedades-videos',
  'novedades-videos',
  true,
  52428800, -- 50 MB
  array['video/mp4', 'video/webm']
)
on conflict (id) do update
  set public             = excluded.public,
      file_size_limit    = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- ── Políticas de Storage ─────────────────────────────────────
-- Lectura pública para cualquiera. No se definen políticas de
-- escritura: subir y borrar requiere la service_role key, que
-- solo se usa del lado del servidor tras validar la sesión.

drop policy if exists "novedades media lectura publica" on storage.objects;

create policy "novedades media lectura publica"
  on storage.objects
  for select
  to public
  using (bucket_id in ('novedades-imagenes', 'novedades-videos'));
