"use server";

import { Resend } from "resend";
import { headers } from "next/headers";

export type ActionResult = { success: boolean; message: string };

const NAME_MAX = 100;
const EMAIL_MAX = 200;
const MESSAGE_MAX = 5000;

// Best-effort in-memory rate limiter. Note: in serverless this resets on cold
// starts and is per-instance, so it only mitigates casual abuse. For stronger
// guarantees, back this with Upstash Redis or a similar shared store.
const rateLimit = new Map<string, { count: number; firstRequest: number }>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(key);

  if (!entry || now - entry.firstRequest > RATE_LIMIT_WINDOW_MS) {
    rateLimit.set(key, { count: 1, firstRequest: now });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) return false;

  entry.count++;
  return true;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function getClientIp(): Promise<string> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return h.get("x-real-ip") ?? "unknown";
}

export async function submitContactForm(formData: FormData): Promise<ActionResult> {
  try {
    const name = (formData.get("name") as string)?.trim();
    const email = (formData.get("email") as string)?.trim();
    const message = (formData.get("message") as string)?.trim();
    // Honeypot: bots fill this hidden field, humans don't
    const honeypot = (formData.get("website") as string)?.trim();

    // Reject silently if honeypot is filled (bot)
    if (honeypot) {
      return { success: true, message: "¡Mensaje enviado! Te respondemos a la brevedad." };
    }

    if (!name || !email || !message) {
      return { success: false, message: "Completá todos los campos." };
    }

    if (name.length > NAME_MAX || email.length > EMAIL_MAX || message.length > MESSAGE_MAX) {
      return { success: false, message: "Alguno de los campos excede el largo máximo permitido." };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, message: "El correo electrónico no es válido." };
    }

    if (message.length < 10) {
      return { success: false, message: "El mensaje es demasiado corto." };
    }

    const ip = await getClientIp();
    if (!checkRateLimit(ip)) {
      return { success: false, message: "Demasiados intentos. Esperá unos minutos e intentá nuevamente." };
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message);

    const resendApiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_EMAIL_TO;
    const fromEmail = process.env.CONTACT_EMAIL_FROM;

    if (!resendApiKey || !toEmail || !fromEmail) {
      console.error("[ContactForm] Missing environment variables: RESEND_API_KEY, CONTACT_EMAIL_TO, CONTACT_EMAIL_FROM");
      return { success: false, message: "Error de configuración del servidor. Contactanos directamente por teléfono." };
    }

    const resend = new Resend(resendApiKey);

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `Consulta web de ${safeName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a1a2e; border-bottom: 2px solid #e63946; padding-bottom: 8px;">
            Nueva consulta desde sumsa.com.ar
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr>
              <td style="padding: 8px; font-weight: bold; width: 120px; color: #555;">Nombre</td>
              <td style="padding: 8px;">${safeName}</td>
            </tr>
            <tr style="background: #f9f9f9;">
              <td style="padding: 8px; font-weight: bold; color: #555;">Email</td>
              <td style="padding: 8px;"><a href="mailto:${safeEmail}">${safeEmail}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #555; vertical-align: top;">Mensaje</td>
              <td style="padding: 8px; white-space: pre-wrap;">${safeMessage}</td>
            </tr>
          </table>
          <p style="margin-top: 24px; font-size: 12px; color: #999;">
            Enviado desde el formulario de contacto de sumsa.com.ar
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("[ContactForm] Resend error:", error);
      return { success: false, message: "No pudimos enviar el mensaje. Intentá nuevamente o contactanos por teléfono." };
    }

    return { success: true, message: "¡Mensaje enviado! Te respondemos a la brevedad." };
  } catch (err) {
    console.error("[ContactForm] Unexpected error:", err);
    return { success: false, message: "Ocurrió un error al enviar el mensaje. Intentá nuevamente." };
  }
}
