import "server-only";

import { supabaseAdmin } from "@/lib/supabase/server";

/**
 * Verificación de credenciales del panel.
 *
 * El hasheo y la comparación ocurren dentro de Postgres, con pgcrypto: la
 * contraseña nunca se hashea ni se compara del lado de la aplicación, y el hash
 * almacenado nunca sale de la base.
 *
 * Ambas funciones son SECURITY DEFINER y tienen revocado el permiso de
 * ejecución para anon y authenticated, así que solo se pueden invocar con la
 * service_role key desde el servidor.
 */

export const PASSWORD_MIN_LENGTH = 8;

/**
 * Devuelve el usuario autenticado, o null si las credenciales no son válidas.
 *
 * La función de base derivada ejecuta un crypt() contra un hash señuelo cuando
 * el usuario no existe, para que el tiempo de respuesta no revele qué nombres
 * de usuario son válidos.
 */
export async function verifyCredentials(
  usuario: string,
  password: string,
): Promise<{ id: string; usuario: string } | null> {
  const { data, error } = await supabaseAdmin.rpc("verificar_credenciales", {
    p_usuario: usuario,
    p_password: password,
  });

  if (error) {
    console.error("[auth] No se pudo verificar las credenciales:", error.message);
    return null;
  }

  if (!data) return null;

  return { id: data as string, usuario };
}

/**
 * Cambia la contraseña exigiendo la actual.
 *
 * Devuelve false tanto si la contraseña actual no coincide como si la nueva no
 * cumple el mínimo: la validación de longitud está también en la base para que
 * no dependa exclusivamente de la aplicación.
 */
export async function changePassword(
  usuario: string,
  currentPassword: string,
  newPassword: string,
): Promise<boolean> {
  const { data, error } = await supabaseAdmin.rpc("cambiar_password", {
    p_usuario: usuario,
    p_actual: currentPassword,
    p_nueva: newPassword,
  });

  if (error) {
    console.error("[auth] No se pudo cambiar la contraseña:", error.message);
    return false;
  }

  return data === true;
}
