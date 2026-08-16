import "server-only";

import { createClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";

/**
 * Cliente con la service_role key: omite RLS y tiene permisos totales sobre la
 * base y el Storage.
 *
 * El import de "server-only" hace que el build falle si este módulo se importa
 * desde un componente de cliente, que es exactamente la protección que
 * necesitamos: filtrar esta clave al navegador expondría la base entera.
 *
 * Toda escritura que pase por acá debe validar antes la sesión de administrador
 * (ver requireSession en @/lib/auth/session).
 */
export const supabaseAdmin = createClient(
  env.SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      // No usamos Supabase Auth: las credenciales del panel viven en variables
      // de entorno. Sin esto, el cliente intentaría persistir sesiones.
      persistSession: false,
      autoRefreshToken: false,
    },
  },
);

export const BUCKET_IMAGENES = "novedades-imagenes";
export const BUCKET_VIDEOS = "novedades-videos";

/**
 * Bucket propio para el pop-up del inicio, separado del de novedades: así
 * borrar el contenido de un dominio nunca puede alcanzar al otro, y el uso de
 * almacenamiento queda legible por separado.
 */
export const BUCKET_POPUP_IMAGENES = "popup-imagenes";

/** Bucket del carrusel del inicio, separado por el mismo criterio. */
export const BUCKET_HERO_IMAGENES = "hero-imagenes";
