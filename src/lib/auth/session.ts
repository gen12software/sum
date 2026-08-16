/**
 * Sesión del panel de administración.
 *
 * Se usa Web Crypto y no el módulo `crypto` de Node porque este archivo lo
 * consume el middleware, que corre sobre el runtime Edge. Por la misma razón no
 * se importa `@/lib/env`: el middleware lee las variables directo de
 * process.env para no arrastrar la validación completa del entorno.
 */

export const SESSION_COOKIE = "sum_admin_session";

const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 días

export type SessionPayload = {
  /** Usuario autenticado */
  u: string;
  /** Timestamp de expiración, en milisegundos */
  exp: number;
};

const encoder = new TextEncoder();

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(value: string): Uint8Array<ArrayBuffer> {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(padded.padEnd(Math.ceil(padded.length / 4) * 4, "="));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("[auth] ADMIN_SESSION_SECRET no está definida");
  }
  return secret;
}

async function getKey(): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

/**
 * Emite un token firmado con HMAC-SHA256 en formato `payload.firma`.
 */
export async function createSessionToken(user: string, now = Date.now()): Promise<string> {
  const payload: SessionPayload = { u: user, exp: now + SESSION_TTL_MS };
  const encodedPayload = toBase64Url(encoder.encode(JSON.stringify(payload)));

  const signature = await crypto.subtle.sign(
    "HMAC",
    await getKey(),
    encoder.encode(encodedPayload),
  );

  return `${encodedPayload}.${toBase64Url(new Uint8Array(signature))}`;
}

/**
 * Verifica firma y expiración. Devuelve null ante cualquier problema: firma
 * inválida, token manipulado, formato incorrecto o sesión vencida.
 */
export async function verifySessionToken(
  token: string | undefined,
  now = Date.now(),
): Promise<SessionPayload | null> {
  if (!token) return null;

  const separator = token.lastIndexOf(".");
  if (separator <= 0) return null;

  const encodedPayload = token.slice(0, separator);
  const encodedSignature = token.slice(separator + 1);

  try {
    // crypto.subtle.verify compara en tiempo constante, así que no hace falta
    // una comparación manual de la firma.
    const isValid = await crypto.subtle.verify(
      "HMAC",
      await getKey(),
      fromBase64Url(encodedSignature),
      encoder.encode(encodedPayload),
    );
    if (!isValid) return null;

    const payload = JSON.parse(new TextDecoder().decode(fromBase64Url(encodedPayload)));
    if (typeof payload?.u !== "string" || typeof payload?.exp !== "number") return null;
    if (payload.exp <= now) return null;

    return payload as SessionPayload;
  } catch {
    return null;
  }
}

/**
 * Atributos de la cookie de sesión.
 *
 * `secure` va siempre en true: los navegadores tratan localhost como contexto
 * seguro, así que no rompe el desarrollo local.
 */
export const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: "lax",
  path: "/",
  maxAge: SESSION_TTL_MS / 1000,
} as const;
