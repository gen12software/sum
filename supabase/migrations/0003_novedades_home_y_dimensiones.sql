-- ─────────────────────────────────────────────────────────────
-- Novedades — curaduría del home y dimensiones de imágenes
--
-- Ejecutar una única vez desde el SQL Editor de Supabase, ANTES
-- de desplegar el código que la usa: sin la columna nueva, el
-- guardado desde el panel falla.
-- ─────────────────────────────────────────────────────────────

-- ── Selección manual de novedades para el inicio ─────────────
-- Hasta ahora el home mostraba las tres primeras publicadas
-- según el ordenamiento vigente, sin que nadie lo decidiera.
-- Este indicador es independiente de `destacada`: esa condición
-- ordena y realza dentro de /novedades, mientras que esta define
-- presencia en la página principal.

alter table public.novedades
  add column if not exists mostrar_en_inicio boolean not null default false;

comment on column public.novedades.mostrar_en_inicio is
  'La novedad aparece en la página principal. Solo tiene efecto si además está publicada.';

-- Consulta del home: publicadas y marcadas, en el orden vigente.
create index if not exists novedades_inicio_idx
  on public.novedades (destacada desc, orden asc)
  where publicada and mostrar_en_inicio;

-- ── Dimensiones de las imágenes ──────────────────────────────
-- No hay cambio de esquema: `imagenes` es jsonb y los objetos
-- pasan a incluir dos claves más. Se documenta acá porque el
-- contrato del jsonb no es visible de otro modo.
--
-- El ancho y el alto se miden en el navegador al subir el
-- archivo y se guardan tal cual. La orientación (apaisada,
-- vertical, cuadrada) y la relación de aspecto se derivan de
-- ellos en tiempo de lectura: no se persisten, para no tener
-- que mantenerlos sincronizados.
--
-- Ambas claves son OPCIONALES. Las imágenes cargadas antes de
-- esta migración no las tienen y se muestran con una relación
-- de aspecto predeterminada. No se hace backfill: recuperar las
-- dimensiones exigiría descargar cada archivo desde Storage.

comment on column public.novedades.imagenes is
  'Array de { url, path, alt, orden, ancho?, alto? }. ancho/alto en píxeles, opcionales: las imágenes previas a la migración 0003 no los tienen.';

-- ── Preservación del home actual (OPCIONAL) ──────────────────
-- Sin esto, la sección de novedades del home queda vacía hasta
-- que alguien marque contenido desde el panel.
--
-- Este UPDATE marca las tres novedades que el home venía
-- mostrando —las primeras publicadas según el ordenamiento
-- vigente— para que el sitio se vea igual que antes del cambio.
--
-- Comentar el bloque si se prefiere empezar con el home vacío y
-- elegir el contenido deliberadamente.

update public.novedades
   set mostrar_en_inicio = true
 where id in (
   select id
     from public.novedades
    where publicada
    order by destacada desc, orden asc
    limit 3
 );
