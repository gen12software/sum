export type VideoOrientacion = "vertical" | "horizontal";

export type NovedadImagen = {
  /** URL pública servida desde Supabase Storage */
  url: string;
  /** Path dentro del bucket. Necesario para poder borrar el archivo después. */
  path: string;
  alt: string;
  orden: number;
  /**
   * Dimensiones del archivo original, medidas en el navegador al subirlo.
   *
   * Son opcionales: las imágenes cargadas antes de que existiera esta
   * capacidad no las tienen y se muestran con ASPECTO_PREDETERMINADO. La
   * orientación y la relación de aspecto se derivan de acá en tiempo de
   * lectura en lugar de persistirse, así no hay dos datos que sincronizar.
   */
  ancho?: number;
  alto?: number;
};

export type OrientacionImagen = "apaisada" | "vertical" | "cuadrada";

export type Novedad = {
  id: string;
  slug: string;
  titulo: string;
  descripcion: string;
  imagenes: NovedadImagen[];
  video_url: string | null;
  video_path: string | null;
  video_orientacion: VideoOrientacion | null;
  destacada: boolean;
  publicada: boolean;
  /**
   * La novedad aparece en el home. Es independiente de `destacada`: esa
   * condición ordena y realza dentro de /novedades, esta define presencia en
   * la página principal. Solo tiene efecto si además está publicada.
   */
  mostrar_en_inicio: boolean;
  orden: number;
  created_at: string;
  updated_at: string;
};

export const TABLE_NOVEDADES = "novedades";

/**
 * La portada de una novedad es su primera imagen. También hace de poster del
 * video: generar un thumbnail desde el archivo requeriría procesamiento
 * externo, y un <video> sin poster se ve como un rectángulo negro.
 */
export function getPortada(novedad: Pick<Novedad, "imagenes">): NovedadImagen | null {
  if (!novedad.imagenes.length) return null;
  return [...novedad.imagenes].sort((a, b) => a.orden - b.orden)[0];
}

/** Imágenes en el orden definido desde el panel. */
export function getImagenesOrdenadas(novedad: Pick<Novedad, "imagenes">): NovedadImagen[] {
  return [...novedad.imagenes].sort((a, b) => a.orden - b.orden);
}

/**
 * Relación de aspecto que se aplica cuando una imagen no declara dimensiones.
 * Es la que el sitio usaba de forma fija antes de medirlas, así que el
 * contenido anterior se sigue viendo igual que siempre.
 */
export const ASPECTO_PREDETERMINADO = 16 / 9;

/** Por debajo de esta diferencia relativa una imagen se considera cuadrada. */
const TOLERANCIA_CUADRADA = 0.05;

/**
 * Relación ancho/alto de una imagen. Sirve para reservar el espacio antes de
 * que el archivo termine de descargarse y evitar el salto de maquetación.
 */
export function getAspecto(imagen: Pick<NovedadImagen, "ancho" | "alto">): number {
  const { ancho, alto } = imagen;
  if (!ancho || !alto) return ASPECTO_PREDETERMINADO;
  return ancho / alto;
}

/** Orientación derivada de las dimensiones; nunca se declara a mano. */
export function getOrientacion(
  imagen: Pick<NovedadImagen, "ancho" | "alto">,
): OrientacionImagen {
  const aspecto = getAspecto(imagen);
  if (Math.abs(aspecto - 1) <= TOLERANCIA_CUADRADA) return "cuadrada";
  return aspecto > 1 ? "apaisada" : "vertical";
}

/**
 * Relación de aspecto del carrusel: la más ancha del conjunto.
 *
 * Se calcula sobre todas las imágenes y no una por una a propósito. Si cada
 * diapositiva tuviera su propia altura, el carrusel saltaría de tamaño al
 * navegar y el scroll-snap se volvería errático. Con una caja estable y las
 * imágenes contenidas, una foto vertical se ve entera sin mover el resto.
 */
export function getAspectoCarrusel(
  imagenes: Pick<NovedadImagen, "ancho" | "alto">[],
): number {
  if (!imagenes.length) return ASPECTO_PREDETERMINADO;
  return Math.max(...imagenes.map(getAspecto));
}

/** Extracto para las tarjetas del listado y la metadata. */
export function getExtracto(descripcion: string, maxLength = 160): string {
  const flat = descripcion.replace(/\s+/g, " ").trim();
  if (flat.length <= maxLength) return flat;
  return `${flat.slice(0, maxLength).trimEnd()}…`;
}
