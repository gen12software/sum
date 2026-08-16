import type { NovedadImagen } from "@/lib/novedades/types";

/**
 * El aviso emergente del inicio.
 *
 * No es una colección: hay una única fila en la base, garantizada por su clave
 * primaria booleana. De ahí que no exista un `id` de dominio ni un listado.
 *
 * Las imágenes usan el mismo contrato que las de una novedad, y por eso el
 * uploader del panel y los helpers de aspecto se reutilizan tal como están.
 */
export type PopupImagen = NovedadImagen;

export type Popup = {
  activo: boolean;
  imagenes: PopupImagen[];
  /** Ruta interna que empieza con `/`, o dirección absoluta http(s). */
  enlace: string | null;
  /** Formato `YYYY-MM-DD`. Ambas opcionales e independientes entre sí. */
  vigencia_desde: string | null;
  vigencia_hasta: string | null;
  /**
   * Identifica la versión del contenido. El sitio lo usa como parte de la
   * clave con la que recuerda que un visitante ya cerró el aviso: al editarlo,
   * la clave cambia y el aviso vuelve a mostrarse aunque ya lo hubiera cerrado.
   */
  updated_at: string;
};

export const TABLE_POPUP = "popup_home";

/** La fila es única y su clave primaria solo admite este valor. */
export const POPUP_ID = true;

/**
 * Convierte `YYYY-MM-DD` a una fecha local del visitante.
 *
 * `new Date("2026-08-16")` la interpretaría como UTC y, al oeste de Greenwich,
 * caería en el día anterior. Construyéndola por partes queda en la zona horaria
 * de quien mira, que es lo que espera quien escribió esa fecha en el panel.
 */
function parsearFechaLocal(valor: string): Date | null {
  const match = valor.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!match) return null;

  const [, anio, mes, dia] = match;
  return new Date(Number(anio), Number(mes) - 1, Number(dia));
}

/**
 * Indica si el aviso está dentro de su período de vigencia.
 *
 * Se evalúa en el navegador y contra el reloj del visitante, no al generar la
 * página: las páginas públicas son estáticas y se revalidan solo al guardar
 * desde el panel, así que un filtro por fecha del lado del servidor dejaría un
 * aviso vencido colgado hasta la próxima edición.
 *
 * Las fechas cuentan como días completos: `vigencia_desde` vale desde el
 * comienzo de ese día y `vigencia_hasta` hasta su final, que es lo que espera
 * quien escribe "hasta el 30".
 */
export function estaVigente(
  popup: Pick<Popup, "vigencia_desde" | "vigencia_hasta">,
  ahora: Date = new Date(),
): boolean {
  const { vigencia_desde, vigencia_hasta } = popup;

  if (vigencia_desde) {
    const desde = parsearFechaLocal(vigencia_desde);
    // Una fecha ilegible no debe ocultar el aviso: se la ignora.
    if (desde && ahora < desde) return false;
  }

  if (vigencia_hasta) {
    const hasta = parsearFechaLocal(vigencia_hasta);
    if (hasta) {
      // Final del día indicado, inclusive.
      hasta.setDate(hasta.getDate() + 1);
      if (ahora >= hasta) return false;
    }
  }

  return true;
}

/** Un enlace externo abre en pestaña nueva; uno interno navega en la misma. */
export function esEnlaceExterno(enlace: string): boolean {
  return /^https?:\/\//i.test(enlace);
}
