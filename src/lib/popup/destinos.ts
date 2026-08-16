/**
 * Catálogo de destinos posibles del pop-up, para elegirlos de una lista en
 * lugar de escribir una dirección a mano.
 *
 * Pedirle una URL a quien administra el sitio es pedirle que se equivoque: una
 * barra de más, un dominio mal tipeado o un enlace a una página que no existe
 * no se detectan hasta que un visitante lo toca. Con una lista, el destino es
 * siempre válido.
 *
 * Las novedades no están acá porque cambian: se cargan desde la base y se
 * suman a la lista en el formulario.
 */

export type Destino = { href: string; label: string };

export type GrupoDestinos = { titulo: string; destinos: Destino[] };

/**
 * Las páginas fijas del sitio. Se mantiene a mano porque las rutas no están
 * centralizadas en ningún lado: viven en la estructura de carpetas de la app y
 * en NAV_LINKS del Navbar, que solo lista las principales.
 *
 * Al agregar una página nueva al sitio, sumarla acá para que pueda elegirse
 * como destino del aviso.
 */
export const SECCIONES: GrupoDestinos[] = [
  {
    titulo: "Páginas principales",
    destinos: [
      { href: "/", label: "Inicio" },
      { href: "/emergencias", label: "Emergencias" },
      { href: "/planes", label: "Planes" },
      { href: "/servicios", label: "Servicios" },
      { href: "/novedades", label: "Novedades" },
      { href: "/contacto", label: "Contacto" },
    ],
  },
  {
    titulo: "Servicios",
    destinos: [
      { href: "/servicios/acompanamiento-terapeutico", label: "Acompañamiento Terapéutico" },
      { href: "/servicios/enfermero-en-casa", label: "Enfermero en Casa" },
      { href: "/servicios/cuidador-en-domicilio", label: "Cuidador en Domicilio" },
    ],
  },
  {
    titulo: "Otras páginas",
    destinos: [
      { href: "/contacto/pagos", label: "Medios de pago" },
      { href: "/contacto/trabaja", label: "Trabajá con nosotros" },
      { href: "/datos-personales", label: "Datos personales" },
      { href: "/terminos", label: "Términos y condiciones" },
    ],
  },
];

/**
 * Valor del desplegable que revela el campo de dirección libre. No es una ruta
 * válida, y por eso empieza con `__`: nunca puede colisionar con un destino
 * real ni llegar a guardarse como enlace.
 */
export const DESTINO_EXTERNO = "__externo__";

/** Todas las rutas fijas, para saber si un enlace guardado sigue en la lista. */
export function esSeccionConocida(href: string): boolean {
  return SECCIONES.some((grupo) => grupo.destinos.some((destino) => destino.href === href));
}
