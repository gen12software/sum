import { z } from "zod";

import { imagenSchema } from "@/lib/novedades/schema";

/** Formato de los campos de fecha del formulario: `YYYY-MM-DD`. */
const FECHA = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Un campo vacío llega como cadena vacía desde el formulario y significa
 * "sin valor", no "valor inválido".
 */
const opcional = z
  .string()
  .trim()
  .transform((valor) => (valor.length ? valor : null))
  .nullable()
  .default(null);

const enlaceSchema = opcional.refine(
  (valor) =>
    valor === null ||
    // Ruta interna del sitio, o dirección absoluta. No se admite un dominio
    // suelto como "sumsa.com.ar": el navegador lo resolvería como ruta
    // relativa y el enlace llevaría a una página inexistente.
    valor.startsWith("/") ||
    /^https?:\/\/.+/i.test(valor),
  {
    message:
      "El enlace debe ser una página del sitio (empieza con /) o una dirección completa (empieza con https://).",
  },
);

const fechaSchema = opcional.refine((valor) => valor === null || FECHA.test(valor), {
  message: "La fecha no es válida.",
});

export const popupFormSchema = z
  .object({
    activo: z.boolean().default(false),
    imagenes: z.array(imagenSchema).default([]),
    enlace: enlaceSchema,
    vigencia_desde: fechaSchema,
    vigencia_hasta: fechaSchema,
  })
  // Un aviso activo sin imágenes no tiene nada que mostrar. El contenido puede
  // quedar vacío mientras esté apagado, para poder borrarlo sin trámite.
  .refine((data) => !data.activo || data.imagenes.length > 0, {
    message: "Para activar el pop-up agregá al menos una imagen.",
    path: ["imagenes"],
  })
  // Comparación como texto: el formato `YYYY-MM-DD` ordena igual que las
  // fechas que representa.
  .refine(
    (data) =>
      !data.vigencia_desde ||
      !data.vigencia_hasta ||
      data.vigencia_hasta >= data.vigencia_desde,
    {
      message: "La fecha de fin no puede ser anterior a la de inicio.",
      path: ["vigencia_hasta"],
    },
  );

export type PopupFormInput = z.input<typeof popupFormSchema>;
export type PopupFormData = z.output<typeof popupFormSchema>;
