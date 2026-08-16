import "server-only";

import { supabaseAdmin } from "@/lib/supabase/server";
import { TABLE_POPUP, type Popup } from "@/lib/popup/types";

const CAMPOS = "activo, imagenes, enlace, vigencia_desde, vigencia_hasta, updated_at";

/**
 * La fila es única: `maybeSingle()` sin filtros alcanza. Si la migración no
 * corrió o la fila no está, devuelve null y quien llama decide qué hacer.
 */
async function leer(): Promise<Popup | null> {
  const { data, error } = await supabaseAdmin.from(TABLE_POPUP).select(CAMPOS).maybeSingle();

  if (error) {
    console.error("[popup] No se pudo leer la configuración:", error.message);
    return null;
  }

  return (data as Popup | null) ?? null;
}

/** Configuración completa para el panel, sin importar su estado. */
export async function getPopupAdmin(): Promise<Popup | null> {
  return leer();
}

/**
 * El aviso para el sitio público, o null si no hay nada que mostrar.
 *
 * La vigencia NO se filtra acá a propósito: se evalúa en el navegador contra
 * el reloj del visitante (ver estaVigente en types.ts). El home es una página
 * estática que solo se regenera al guardar desde el panel, así que un filtro
 * por fecha del lado del servidor dejaría un aviso vencido colgado hasta la
 * próxima edición, y uno programado sin aparecer jamás.
 */
export async function getPopupActivo(): Promise<Popup | null> {
  const popup = await leer();

  if (!popup?.activo || !popup.imagenes.length) return null;

  return popup;
}
