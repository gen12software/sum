import { NextResponse } from "next/server";
import { z } from "zod";

import { getSession } from "@/lib/auth/guard";
import {
  BUCKET_IMAGENES,
  BUCKET_POPUP_IMAGENES,
  BUCKET_VIDEOS,
  supabaseAdmin,
} from "@/lib/supabase/server";
import {
  IMAGEN_MAX_BYTES,
  IMAGEN_MIME_TYPES,
  VIDEO_MAX_BYTES,
  VIDEO_MIME_TYPES,
} from "@/lib/novedades/schema";

/**
 * Emite una URL de subida firmada para que el navegador suba el archivo directo
 * a Supabase Storage.
 *
 * Los archivos no pasan por acá: el límite de tamaño de body de las funciones
 * serverless de Vercel haría fallar cualquier video. Esta ruta solo autoriza y
 * devuelve el token.
 */

const requestSchema = z.object({
  tipo: z.enum(["imagen", "video", "popup-imagen"]),
  nombre: z.string().min(1).max(255),
  contentType: z.string().min(1),
  size: z.number().int().positive(),
});

const REGLAS = {
  imagen: {
    bucket: BUCKET_IMAGENES,
    maxBytes: IMAGEN_MAX_BYTES,
    mimeTypes: IMAGEN_MIME_TYPES as readonly string[],
    etiqueta: "La imagen",
    formatos: "JPG, PNG o WebP",
  },
  video: {
    bucket: BUCKET_VIDEOS,
    maxBytes: VIDEO_MAX_BYTES,
    mimeTypes: VIDEO_MIME_TYPES as readonly string[],
    etiqueta: "El video",
    formatos: "MP4 o WebM",
  },
  // Mismos formatos y mismo límite que las imágenes de una novedad; lo único
  // que cambia es el bucket de destino.
  "popup-imagen": {
    bucket: BUCKET_POPUP_IMAGENES,
    maxBytes: IMAGEN_MAX_BYTES,
    mimeTypes: IMAGEN_MIME_TYPES as readonly string[],
    etiqueta: "La imagen",
    formatos: "JPG, PNG o WebP",
  },
} as const;

function extensionDe(nombre: string): string {
  const match = nombre.toLowerCase().match(/\.([a-z0-9]{1,8})$/);
  return match ? match[1] : "bin";
}

export async function POST(request: Request) {
  if (!(await getSession())) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  const { tipo, nombre, contentType, size } = parsed.data;
  const regla = REGLAS[tipo];

  // El cliente ya valida antes de llegar acá; esto cubre las llamadas directas.
  if (!regla.mimeTypes.includes(contentType)) {
    return NextResponse.json(
      { error: `${regla.etiqueta} debe estar en formato ${regla.formatos}.` },
      { status: 400 },
    );
  }

  if (size > regla.maxBytes) {
    const maxMb = Math.round(regla.maxBytes / (1024 * 1024));
    return NextResponse.json(
      { error: `${regla.etiqueta} no puede superar los ${maxMb} MB.` },
      { status: 400 },
    );
  }

  const path = `${crypto.randomUUID()}.${extensionDe(nombre)}`;

  const { data, error } = await supabaseAdmin.storage
    .from(regla.bucket)
    .createSignedUploadUrl(path);

  if (error || !data) {
    console.error("[upload] No se pudo emitir la URL firmada:", error?.message);
    return NextResponse.json(
      { error: "No se pudo preparar la subida. Intentá de nuevo." },
      { status: 500 },
    );
  }

  const { data: publicUrl } = supabaseAdmin.storage.from(regla.bucket).getPublicUrl(path);

  return NextResponse.json({
    bucket: regla.bucket,
    path: data.path,
    // El navegador sube con PUT contra esta URL. Se expone la URL completa en
    // lugar del token para poder usar XHR y reportar el progreso de la
    // transferencia, algo que el cliente de Supabase no ofrece.
    signedUrl: data.signedUrl,
    url: publicUrl.publicUrl,
  });
}
