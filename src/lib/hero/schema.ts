import { z } from "zod";

import { imagenSchema } from "@/lib/novedades/schema";
import { FOCO_PREDETERMINADO, HERO_MAX_IMAGENES } from "@/lib/hero/types";

/**
 * Punto focal con el formato de `object-position`: dos porcentajes separados
 * por un espacio. Se acepta cualquier valor entre 0 y 100, con decimales,
 * porque el control del panel permite fijar el punto con un clic y no solo
 * elegir entre atajos.
 *
 * Se valida con una expresión y no de forma libre porque el valor termina
 * escrito en un atributo `style` del sitio público: cualquier cadena que
 * llegue de la base debe ser inofensiva por construcción.
 */
const PORCENTAJE = "(?:100(?:\\.0+)?|\\d{1,2}(?:\\.\\d+)?)%";
const FOCO = new RegExp(`^${PORCENTAJE} ${PORCENTAJE}$`);

const focoSchema = z
  .string()
  .trim()
  .default(FOCO_PREDETERMINADO)
  .refine((valor) => FOCO.test(valor), {
    message: "El encuadre de la imagen no es válido.",
  });

/** El contrato de una imagen de novedad más el punto focal. */
export const heroImagenSchema = imagenSchema.extend({
  foco: focoSchema,
});

export const heroFormSchema = z.object({
  imagenes: z
    .array(heroImagenSchema)
    .max(HERO_MAX_IMAGENES, `El carrusel admite hasta ${HERO_MAX_IMAGENES} imágenes.`)
    .default([]),
});

export type HeroFormInput = z.input<typeof heroFormSchema>;
export type HeroFormData = z.output<typeof heroFormSchema>;
