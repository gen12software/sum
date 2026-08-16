import "server-only";

import { BUCKET_POPUP_IMAGENES, supabaseAdmin } from "@/lib/supabase/server";

/**
 * Borrado de las imágenes del pop-up en Storage.
 *
 * Con el mismo criterio que en las novedades: nunca lanza. Si un archivo no se
 * puede borrar, el guardado igual debe completarse. El costo de un archivo
 * huérfano es almacenamiento; el de bloquear al administrador, que no pueda
 * trabajar. Los fallos quedan registrados para poder limpiarlos después.
 */
async function eliminar(paths: string[]): Promise<void> {
  const limpios = paths.filter(Boolean);
  if (!limpios.length) return;

  const { error } = await supabaseAdmin.storage.from(BUCKET_POPUP_IMAGENES).remove(limpios);

  if (error) {
    console.error(
      `[storage] Quedaron archivos huérfanos en ${BUCKET_POPUP_IMAGENES}: ${limpios.join(", ")} — ${error.message}`,
    );
  }
}

/** Borra los archivos que dejaron de estar referenciados tras una edición. */
export async function eliminarHuerfanosPopup(
  pathsAnteriores: string[],
  pathsActuales: string[],
): Promise<void> {
  const vigentes = new Set(pathsActuales);
  await eliminar(pathsAnteriores.filter((path) => !vigentes.has(path)));
}
