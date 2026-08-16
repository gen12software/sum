/**
 * El carrusel original, incluido en el proyecto.
 *
 * Es el respaldo: mientras no haya ninguna imagen cargada desde el panel —o si
 * la base no responde—, el inicio muestra estas seis imágenes, con sus títulos
 * y encuadres de siempre. Así el despliegue es seguro por sí solo, sin una
 * ventana en la que el sitio esté publicado y el carrusel vacío esperando a
 * que alguien entre al panel.
 *
 * Los títulos viven acá y en ningún otro lado: las imágenes que se cargan
 * desde el panel traen su texto incorporado en el propio archivo y no llevan
 * nada dibujado por encima. Por eso `titulo` es opcional en el carrusel.
 *
 * Estos archivos de `public/images/hero/` no son un remanente: se conservan a
 * propósito. Borrarlos deja al sitio sin respaldo.
 */

export type HeroSlideFallback = {
  src: string;
  alt: string;
  titulo: string;
  linea2?: string;
  foco: string;
};

export const HERO_FALLBACK: HeroSlideFallback[] = [
  {
    src: "/images/hero/1.DOCTORA.png",
    alt: "Médica de SUM S.A. en un pasillo del centro de atención",
    titulo: "ESTAMOS CUIDANDO",
    linea2: "MÁS IMPORTA",
    // La cara queda en la mitad superior: centrar el recorte la dejaría fuera
    // de cuadro en pantallas anchas.
    foco: "50% 0%",
  },
  {
    src: "/images/hero/2.ATENCIÓN.png",
    alt: "Equipo de SUM S.A. atendiendo a una persona",
    titulo: "CUIDAMOS PERSONAS, ACOMPAÑAMOS SIEMPRE",
    foco: "50% 50%",
  },
  {
    src: "/images/hero/3.DESPACHO.png",
    alt: "Central de despacho y coordinación de SUM S.A.",
    titulo: "TECNOLOGÍA Y COORDINACIÓN AL SERVICIO DE LA VIDA",
    foco: "50% 50%",
  },
  {
    src: "/images/hero/4.CATEDRAL.png",
    alt: "Ambulancia de SUM S.A. frente a la Catedral de La Plata",
    titulo: "PRESENCIA Y COBERTURA",
    linea2: "TODO EL AÑO",
    foco: "50% 50%",
  },
  {
    src: "/images/hero/5.LA PLATA.png",
    alt: "Vista de la ciudad de La Plata",
    titulo: "DESDE HACE 40 AÑOS, CUIDANDO LA SALUD EN NUESTRA CIUDAD",
    foco: "50% 50%",
  },
  {
    src: "/images/hero/6.CUARENTAAÑOS.jpeg",
    alt: "SUM S.A. celebrando 40 años de servicio",
    titulo: "40 AÑOS PRESENTES",
    linea2: "CUANDO MÁS IMPORTA",
    foco: "50% 50%",
  },
];
