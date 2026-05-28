import { z } from "zod";

const envSchema = z.object({
  RESEND_API_KEY: z.string().min(1, "RESEND_API_KEY is required"),
  CONTACT_EMAIL_TO: z.string().email("CONTACT_EMAIL_TO must be a valid email"),
  CONTACT_EMAIL_FROM: z.string().email("CONTACT_EMAIL_FROM must be a valid email"),
  NEXT_PUBLIC_SITE_URL: z.string().url().optional().default("https://www.sumsa.com.ar"),
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
