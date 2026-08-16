"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

import { changePassword, PASSWORD_MIN_LENGTH, verifyCredentials } from "@/lib/auth/credentials";
import { requireSession } from "@/lib/auth/guard";
import {
  clearAttempts,
  getClientIp,
  isRateLimited,
  LOGIN_RATE_LIMIT,
  recordFailedAttempt,
} from "@/lib/auth/login-attempts";
import {
  createSessionToken,
  SESSION_COOKIE,
  SESSION_COOKIE_OPTIONS,
} from "@/lib/auth/session";

export type FormState = { error?: string; success?: string };

const loginSchema = z.object({
  usuario: z.string().min(1),
  password: z.string().min(1),
});

/**
 * Mensaje único para cualquier fallo de credenciales: distinguir entre usuario
 * inexistente y contraseña incorrecta le confirmaría a un atacante qué nombres
 * de usuario son válidos.
 */
const CREDENCIALES_INVALIDAS = "Usuario o contraseña incorrectos.";

export async function loginAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = loginSchema.safeParse({
    usuario: formData.get("usuario"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: "Completá usuario y contraseña." };
  }

  const ip = getClientIp(await headers());

  if (await isRateLimited(ip)) {
    return {
      error: `Demasiados intentos fallidos. Esperá ${LOGIN_RATE_LIMIT.WINDOW_MINUTES} minutos antes de volver a intentar.`,
    };
  }

  const usuario = await verifyCredentials(parsed.data.usuario, parsed.data.password);

  if (!usuario) {
    await recordFailedAttempt(ip);
    return { error: CREDENCIALES_INVALIDAS };
  }

  await clearAttempts(ip);

  const store = await cookies();
  store.set(SESSION_COOKIE, await createSessionToken(usuario.usuario), SESSION_COOKIE_OPTIONS);

  // redirect() lanza una excepción de control de flujo: debe quedar fuera de
  // cualquier try/catch para que Next la procese.
  redirect("/admin/novedades");
}

export async function logoutAction(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  redirect("/admin/login");
}

const changePasswordSchema = z
  .object({
    actual: z.string().min(1, "Ingresá tu contraseña actual."),
    nueva: z
      .string()
      .min(PASSWORD_MIN_LENGTH, `La contraseña nueva debe tener al menos ${PASSWORD_MIN_LENGTH} caracteres.`),
    repetir: z.string(),
  })
  .refine((data) => data.nueva === data.repetir, {
    message: "Las contraseñas nuevas no coinciden.",
    path: ["repetir"],
  });

export async function changePasswordAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const session = await requireSession();

  const parsed = changePasswordSchema.safeParse({
    actual: formData.get("actual"),
    nueva: formData.get("nueva"),
    repetir: formData.get("repetir"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const changed = await changePassword(session.u, parsed.data.actual, parsed.data.nueva);

  if (!changed) {
    return { error: "La contraseña actual no es correcta." };
  }

  // La cookie está firmada sobre el usuario, no sobre la contraseña, así que la
  // sesión en curso sigue siendo válida.
  return { success: "Contraseña actualizada." };
}
