import "server-only";

import { BUCKET_IMAGENES, BUCKET_VIDEOS, supabaseAdmin } from "@/lib/supabase/server";

/**
 * Borrado de archivos en Storage.
 *
 * Ninguna de estas funciones lanza: si el archivo no se puede borrar, la
 * operación de base de datos igual debe completarse. El costo de un archivo
 * huérfano es almacenamiento; el de bloquear al administrador, que no pueda
 * trabajar. Los fallos quedan registrados para poder limpiarlos después.
 */

async function remove(bucket: string, paths: string[]): Promise<void> {
  const limpios = paths.filter(Boolean);
  if (!limpios.length) return;

  const { error } = await supabaseAdmin.storage.from(bucket).remove(limpios);

  if (error) {
    console.error(
      `[storage] Quedaron archivos huérfanos en ${bucket}: ${limpios.join(", ")} — ${error.message}`,
    );
  }
}

export async function eliminarImagenes(paths: string[]): Promise<void> {
  await remove(BUCKET_IMAGENES, paths);
}

export async function eliminarVideo(path: string | null | undefined): Promise<void> {
  if (!path) return;
  await remove(BUCKET_VIDEOS, [path]);
}

/**
 * Borra los archivos que dejaron de estar referenciados tras una edición.
 */
export async function eliminarHuerfanos(
  pathsAnteriores: string[],
  pathsActuales: string[],
): Promise<void> {
  const vigentes = new Set(pathsActuales);
  await eliminarImagenes(pathsAnteriores.filter((path) => !vigentes.has(path)));
}
