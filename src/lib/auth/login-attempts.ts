import "server-only";

import { supabaseAdmin } from "@/lib/supabase/server";

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutos

const TABLE = "admin_login_attempts";

/**
 * Los intentos se cuentan en Postgres y no con el Map en memoria de
 * @/lib/rate-limit: en Vercel cada instancia serverless tiene su propio estado,
 * así que un atacante que rote entre instancias diluiría el límite. Para el
 * formulario de contacto esa limitación es tolerable; para el único acceso
 * administrativo del sitio, no.
 */

function windowStart(now: number): string {
  return new Date(now - WINDOW_MS).toISOString();
}

/**
 * Indica si la IP superó el límite de intentos fallidos dentro de la ventana.
 *
 * Ante un fallo de la base se devuelve `false` (no limitado) para no dejar al
 * administrador afuera por un problema de infraestructura.
 */
export async function isRateLimited(ip: string, now = Date.now()): Promise<boolean> {
  const { count, error } = await supabaseAdmin
    .from(TABLE)
    .select("id", { count: "exact", head: true })
    .eq("ip", ip)
    .gte("created_at", windowStart(now));

  if (error) {
    console.error("[auth] No se pudo consultar los intentos de login:", error.message);
    return false;
  }

  return (count ?? 0) >= MAX_ATTEMPTS;
}

/**
 * Registra un intento fallido y purga los que quedaron fuera de la ventana.
 */
export async function recordFailedAttempt(ip: string, now = Date.now()): Promise<void> {
  const { error } = await supabaseAdmin.from(TABLE).insert({ ip });

  if (error) {
    console.error("[auth] No se pudo registrar el intento de login:", error.message);
  }

  // Purga oportunista: evita que la tabla crezca sin control sin necesidad de
  // una tarea programada.
  const { error: purgeError } = await supabaseAdmin
    .from(TABLE)
    .delete()
    .lt("created_at", windowStart(now));

  if (purgeError) {
    console.error("[auth] No se pudieron purgar los intentos vencidos:", purgeError.message);
  }
}

/**
 * Limpia los intentos de una IP tras un login exitoso.
 */
export async function clearAttempts(ip: string): Promise<void> {
  const { error } = await supabaseAdmin.from(TABLE).delete().eq("ip", ip);

  if (error) {
    console.error("[auth] No se pudieron limpiar los intentos de login:", error.message);
  }
}

/**
 * Extrae la IP del cliente de los headers que agrega Vercel.
 */
export function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return headers.get("x-real-ip")?.trim() || "desconocida";
}

export const LOGIN_RATE_LIMIT = { MAX_ATTEMPTS, WINDOW_MINUTES: WINDOW_MS / 60000 };
