import type { NovedadImagen } from "@/lib/novedades/types";

/**
 * Una imagen del carrusel del inicio.
 *
 * Comparte el contrato de las imágenes de una novedad —de ahí que el uploader
 * del panel se reutilice sin tocarlo— y suma el punto focal, que es lo propio
 * de este caso: la imagen ocupa siempre todo el espacio del carrusel y se
 * recorta para llenarlo, así que hay que decidir qué parte sobrevive.
 */
export type HeroImagen = NovedadImagen & {
  /**
   * Par de porcentajes con el formato de `object-position` de CSS: el primero
   * es horizontal, el segundo vertical. `"50% 0%"` conserva la parte de
   * arriba, `"50% 100%"` la de abajo.
   *
   * Es el mismo ajuste que antes estaba escrito a mano por slide en el código
   * del carrusel, ahora editable desde el panel.
   */
  foco: string;
};

/**
 * El carrusel del inicio.
 *
 * No es una colección: hay una única fila en la base, garantizada por su clave
 * primaria booleana. De ahí que no exista un `id` de dominio ni un listado.
 */
export type Hero = {
  imagenes: HeroImagen[];
  updated_at: string;
};

export const TABLE_HERO = "hero_home";

/** La fila es única y su clave primaria solo admite este valor. */
export const HERO_ID = true;

/**
 * Tope de imágenes del carrusel.
 *
 * No es una limitación técnica: con la rotación de 5 segundos, seis imágenes
 * ya son medio minuto de recorrido completo, más de lo que dura una visita al
 * inicio. Sumar más solo hace que las últimas no las vea nadie.
 */
export const HERO_MAX_IMAGENES = 6;

/** Centrado, que es lo que tenían cinco de las seis slides originales. */
export const FOCO_PREDETERMINADO = "50% 50%";

/** Imágenes en el orden definido desde el panel. */
export function getImagenesOrdenadas(hero: Pick<Hero, "imagenes">): HeroImagen[] {
  return [...hero.imagenes].sort((a, b) => a.orden - b.orden);
}

/**
 * Completa el punto focal de una imagen que no lo tenga.
 *
 * El campo se guarda siempre, pero el uploader del panel produce imágenes con
 * el contrato de una novedad, sin `foco`. En vez de duplicar el uploader, se
 * normaliza acá al incorporarlas.
 */
export function conFoco(imagen: NovedadImagen & { foco?: string }): HeroImagen {
  return { ...imagen, foco: imagen.foco || FOCO_PREDETERMINADO };
}
