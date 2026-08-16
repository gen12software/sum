import "server-only";

import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySessionToken, type SessionPayload } from "@/lib/auth/session";

/**
 * Devuelve la sesión activa, o null si no hay ninguna válida.
 */
export async function getSession(): Promise<SessionPayload | null> {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}

/**
 * Exige una sesión válida y devuelve su payload.
 *
 * Toda Server Action de escritura debe llamar a esta función antes de tocar
 * datos. El middleware no alcanza: no intercepta las invocaciones de Server
 * Actions, así que sin esta verificación quedarían expuestas.
 */
export async function requireSession(): Promise<SessionPayload> {
  const session = await getSession();

  if (!session) {
    throw new Error("No autorizado");
  }

  return session;
}
