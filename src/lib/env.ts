import { z } from "zod";

/**
 * Este módulo es de uso exclusivo del servidor: valida secretos que no deben
 * llegar al bundle del navegador. No importarlo desde componentes de cliente.
 */
const envSchema = z.object({
  RESEND_API_KEY: z.string().min(1, "RESEND_API_KEY is required"),
  CONTACT_EMAIL_TO: z.string().email("CONTACT_EMAIL_TO must be a valid email"),
  CONTACT_EMAIL_FROM: z.string().email("CONTACT_EMAIL_FROM must be a valid email"),
  SITE_URL: z.string().url().optional().default("https://www.sumsa.com.ar"),
  META_PIXEL_ID: z.string().optional().default("1074134285367824"),
  META_DOMAIN_VERIFICATION: z
    .string()
    .optional()
    .default("4lys5ssbhelfrkhxdv2kvmi34r6ke0"),

  // ── Supabase ──
  // No hace falta la clave pública: el navegador nunca habla con Supabase. Las
  // subidas van por URL firmada que emite el servidor, y toda lectura y
  // escritura de la base ocurre del lado del servidor.
  SUPABASE_URL: z.string().url("SUPABASE_URL must be a valid URL"),
  // "Secret key" en el panel de Supabase (antes service_role). Omite RLS por
  // completo. Nunca debe exponerse al navegador.
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1, "SUPABASE_SERVICE_ROLE_KEY is required"),

  // ── Panel de administración ──
  // Las credenciales viven en la tabla admin_usuarios, no acá: así se pueden
  // cambiar sin redesplegar. El alta la hace la migración inicial.
  //
  // Clave de firma de la cookie de sesión. Sin ella, cualquiera que conozca el
  // formato de la cookie podría fabricar una sesión válida.
  ADMIN_SESSION_SECRET: z.string().min(32, "ADMIN_SESSION_SECRET must be at least 32 characters"),
});

function validateEnv() {
  const result = envSchema.safeParse(process.env);
  if (!result.success) {
    const missing = result.error.issues.map((i) => `  - ${i.path.join(".")}: ${i.message}`).join("\n");
    throw new Error(`\n[env] Invalid environment variables:\n${missing}\n`);
  }
  return result.data;
}

export const env = validateEnv();
