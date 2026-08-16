import { z } from "zod";

export const TITULO_MAX = 150;
export const IMAGEN_MAX_BYTES = 10 * 1024 * 1024; // 10 MB
export const VIDEO_MAX_BYTES = 50 * 1024 * 1024; // 50 MB

export const IMAGEN_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;
export const VIDEO_MIME_TYPES = ["video/mp4", "video/webm"] as const;

export const imagenSchema = z.object({
  url: z.string().url(),
  path: z.string().min(1),
  alt: z.string().max(300).default(""),
  orden: z.number().int().min(0),
  // Medidas en el navegador al subir el archivo. Opcionales: las imágenes
  // cargadas antes de esta capacidad no las tienen, y la lectura de
  // dimensiones puede fallar sin que eso deba impedir la subida.
  ancho: z.number().int().positive().optional(),
  alto: z.number().int().positive().optional(),
});

export const novedadFormSchema = z
  .object({
    titulo: z
      .string()
      .trim()
      .min(1, "El título es obligatorio.")
      .max(TITULO_MAX, `El título no puede superar los ${TITULO_MAX} caracteres.`),
    // Texto plano: los saltos de línea se preservan y el HTML se muestra
    // literal, nunca interpretado.
    descripcion: z.string().trim().min(1, "La descripción es obligatoria."),
    imagenes: z.array(imagenSchema).default([]),
    video_url: z.string().url().nullable().default(null),
    video_path: z.string().nullable().default(null),
    video_orientacion: z.enum(["vertical", "horizontal"]).nullable().default(null),
    destacada: z.boolean().default(false),
    publicada: z.boolean().default(false),
    mostrar_en_inicio: z.boolean().default(false),
  })
  .refine((data) => !data.video_url || data.video_orientacion !== null, {
    message: "Indicá si el video es vertical u horizontal.",
    path: ["video_orientacion"],
  })
  // Una novedad sin nada que mostrar deja la tarjeta del listado con el fondo
  // de marca y el detalle en puro texto. El panel además deshabilita el botón
  // de guardar, pero la regla se valida acá para que no dependa del cliente.
  .refine((data) => data.imagenes.length > 0 || data.video_url !== null, {
    message: "Agregá al menos una imagen o un video.",
    path: ["imagenes"],
  });

export type NovedadFormInput = z.input<typeof novedadFormSchema>;
export type NovedadFormData = z.output<typeof novedadFormSchema>;

export const reordenarSchema = z.array(z.string().uuid()).min(1);
