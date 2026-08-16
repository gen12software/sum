"use server";

import { revalidatePath } from "next/cache";

import { requireSession } from "@/lib/auth/guard";
import { supabaseAdmin } from "@/lib/supabase/server";
import { getPopupAdmin } from "@/lib/popup/queries";
import { popupFormSchema } from "@/lib/popup/schema";
import { eliminarHuerfanosPopup } from "@/lib/popup/storage";
import { POPUP_ID, TABLE_POPUP } from "@/lib/popup/types";

export type PopupActionState = { error?: string; success?: string };

const ERROR_GENERICO = "No se pudo guardar. Revisá la conexión e intentá de nuevo.";

export async function guardarPopupAction(
  _prev: PopupActionState,
  formData: FormData,
): Promise<PopupActionState> {
  await requireSession();

  const raw = formData.get("payload");
  if (typeof raw !== "string") {
    return { error: "No se pudieron leer los datos del formulario." };
  }

  let payload: unknown;
  try {
    payload = JSON.parse(raw);
  } catch {
    return { error: "No se pudieron leer los datos del formulario." };
  }

  const parsed = popupFormSchema.safeParse(payload);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const data = parsed.data;

  // Se renumeran según la posición en que llegaron, que es la que el
  // administrador definió arrastrándolas.
  const imagenes = data.imagenes.map((imagen, index) => ({ ...imagen, orden: index }));

  const anterior = await getPopupAdmin();

  // La fila es única y la migración la deja creada. El upsert cubre el caso de
  // que alguien la haya borrado a mano desde el SQL Editor.
  const { error } = await supabaseAdmin.from(TABLE_POPUP).upsert({
    id: POPUP_ID,
    activo: data.activo,
    imagenes,
    enlace: data.enlace,
    vigencia_desde: data.vigencia_desde,
    vigencia_hasta: data.vigencia_hasta,
  });

  if (error) {
    console.error("[popup] Error al guardar:", error.message);
    return { error: ERROR_GENERICO };
  }

  if (anterior) {
    await eliminarHuerfanosPopup(
      anterior.imagenes.map((imagen) => imagen.path),
      imagenes.map((imagen) => imagen.path),
    );
  }

  // El pop-up solo afecta al inicio: no hace falta tocar /novedades ni el
  // sitemap.
  revalidatePath("/");

  return { success: "Los cambios se guardaron y ya se ven en el sitio." };
}
