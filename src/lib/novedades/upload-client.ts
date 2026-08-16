import {
  IMAGEN_MAX_BYTES,
  IMAGEN_MIME_TYPES,
  VIDEO_MAX_BYTES,
  VIDEO_MIME_TYPES,
} from "@/lib/novedades/schema";

/**
 * Subida de archivos desde el navegador, directo a Supabase Storage.
 *
 * Se usa XHR en lugar de fetch porque es la única forma de reportar el progreso
 * de la transferencia, que en videos de decenas de MB hace la diferencia entre
 * una espera comprensible y una pantalla que parece colgada.
 */

/**
 * El tipo determina qué valida el cliente y a qué bucket va el archivo. Las
 * imágenes del pop-up del inicio se validan igual que las de una novedad y solo
 * difieren en el destino, que resuelve la ruta que emite la URL firmada.
 */
export type TipoArchivo = "imagen" | "video" | "popup-imagen";

export type ArchivoSubido = {
  url: string;
  path: string;
  /** Solo para imágenes, y solo si el navegador pudo medirlas. */
  ancho?: number;
  alto?: number;
};

export type Dimensiones = { ancho: number; alto: number };

const REGLAS = {
  imagen: {
    maxBytes: IMAGEN_MAX_BYTES,
    mimeTypes: IMAGEN_MIME_TYPES as readonly string[],
    etiqueta: "La imagen",
    formatos: "JPG, PNG o WebP",
    sugerencia: "",
  },
  video: {
    maxBytes: VIDEO_MAX_BYTES,
    mimeTypes: VIDEO_MIME_TYPES as readonly string[],
    etiqueta: "El video",
    formatos: "MP4 o WebM",
    sugerencia: " Probá comprimirlo antes de subirlo.",
  },
  "popup-imagen": {
    maxBytes: IMAGEN_MAX_BYTES,
    mimeTypes: IMAGEN_MIME_TYPES as readonly string[],
    etiqueta: "La imagen",
    formatos: "JPG, PNG o WebP",
    sugerencia: "",
  },
} as const;

/** Las dimensiones solo se miden en archivos de imagen. */
function esImagen(tipo: TipoArchivo): boolean {
  return tipo !== "video";
}

/**
 * Valida antes de pedir la URL firmada, para que el error aparezca de inmediato
 * y no después de transferir media hora de video.
 *
 * Devuelve el mensaje de error, o null si el archivo es válido.
 */
export function validarArchivo(file: File, tipo: TipoArchivo): string | null {
  const regla = REGLAS[tipo];

  if (!regla.mimeTypes.includes(file.type)) {
    return `${regla.etiqueta} debe estar en formato ${regla.formatos}.`;
  }

  if (file.size > regla.maxBytes) {
    const maxMb = Math.round(regla.maxBytes / (1024 * 1024));
    const pesoMb = (file.size / (1024 * 1024)).toFixed(1);
    return `${regla.etiqueta} pesa ${pesoMb} MB y el máximo es ${maxMb} MB.${regla.sugerencia}`;
  }

  return null;
}

/**
 * Mide una imagen en el navegador, que ya tiene el archivo en la mano.
 *
 * Es la razón por la que no se le pide a nadie declarar si una foto es
 * apaisada o vertical: el dato se mide con exactitud y no puede quedar mal
 * cargado. De estas dimensiones se derivan después la orientación y la
 * relación de aspecto (ver getOrientacion/getAspecto en types.ts).
 *
 * Nunca lanza: una imagen que el navegador no logre decodificar se sube
 * igual y se muestra con la relación predeterminada.
 */
export async function medirImagen(file: File): Promise<Dimensiones | undefined> {
  // createImageBitmap decodifica fuera del hilo principal y no necesita el DOM.
  if (typeof createImageBitmap === "function") {
    let bitmap: ImageBitmap | undefined;
    try {
      bitmap = await createImageBitmap(file);
      return { ancho: bitmap.width, alto: bitmap.height };
    } catch {
      // Cae al método con <img>, que algunos navegadores resuelven igual.
    } finally {
      bitmap?.close();
    }
  }

  const objectUrl = URL.createObjectURL(file);

  try {
    return await new Promise<Dimensiones | undefined>((resolve) => {
      const img = new Image();
      img.addEventListener("load", () =>
        resolve({ ancho: img.naturalWidth, alto: img.naturalHeight }),
      );
      img.addEventListener("error", () => resolve(undefined));
      img.src = objectUrl;
    });
  } catch {
    return undefined;
  } finally {
    // Siempre, incluso si la promesa se resolvió sin dimensiones: el
    // objectURL retiene el archivo en memoria hasta que se lo revoca.
    URL.revokeObjectURL(objectUrl);
  }
}

async function pedirUrlFirmada(file: File, tipo: TipoArchivo) {
  const response = await fetch("/api/admin/upload", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      tipo,
      nombre: file.name,
      contentType: file.type,
      size: file.size,
    }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.error ?? "No se pudo preparar la subida.");
  }

  return data as { signedUrl: string; path: string; url: string };
}

function transferir(
  file: File,
  signedUrl: string,
  onProgress?: (porcentaje: number) => void,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open("PUT", signedUrl);
    xhr.setRequestHeader("content-type", file.type);

    xhr.upload.addEventListener("progress", (event) => {
      if (!event.lengthComputable) return;
      onProgress?.(Math.round((event.loaded / event.total) * 100));
    });

    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) resolve();
      else reject(new Error("La subida falló. Revisá tu conexión e intentá de nuevo."));
    });

    xhr.addEventListener("error", () =>
      reject(new Error("La subida falló. Revisá tu conexión e intentá de nuevo.")),
    );

    xhr.addEventListener("abort", () => reject(new Error("Subida cancelada.")));

    xhr.send(file);
  });
}

export async function subirArchivo(
  file: File,
  tipo: TipoArchivo,
  onProgress?: (porcentaje: number) => void,
): Promise<ArchivoSubido> {
  const error = validarArchivo(file, tipo);
  if (error) throw new Error(error);

  // Se mide antes de transferir, en paralelo con el pedido de la URL firmada:
  // el archivo ya está local y así no se suma latencia a la subida.
  const [dimensiones, firmada] = await Promise.all([
    esImagen(tipo) ? medirImagen(file) : Promise.resolve(undefined),
    pedirUrlFirmada(file, tipo),
  ]);

  await transferir(file, firmada.signedUrl, onProgress);

  return { url: firmada.url, path: firmada.path, ...dimensiones };
}
