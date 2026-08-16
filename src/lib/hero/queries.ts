import "server-only";

import { supabaseAdmin } from "@/lib/supabase/server";
import { TABLE_HERO, getImagenesOrdenadas, type Hero, type HeroImagen } from "@/lib/hero/types";

const CAMPOS = "imagenes, updated_at";

/**
 * La fila es única: `maybeSingle()` sin filtros alcanza. Si la migración no
 * corrió o la fila no está, devuelve null y quien llama decide qué hacer.
 */
async function leer(): Promise<Hero | null> {
  const { data, error } = await supabaseAdmin.from(TABLE_HERO).select(CAMPOS).maybeSingle();

  if (error) {
    console.error("[hero] No se pudo leer la configuración:", error.message);
    return null;
  }

  return (data as Hero | null) ?? null;
}

/** Configuración completa para el panel. */
export async function getHeroAdmin(): Promise<Hero | null> {
  return leer();
}

/**
 * Las imágenes para el sitio público, ya ordenadas.
 *
 * Devuelve un array vacío cuando no hay nada cargado, cuando la migración no
 * corrió o cuando la base no responde. Los tres casos significan lo mismo para
 * quien renderiza: no hay contenido administrado, así que el carrusel usa el
 * respaldo incluido en el proyecto (ver @/lib/hero/fallback) y el inicio nunca
 * queda vacío.
 *
 * El fallo ya quedó registrado en `leer()`. Importa que así sea: un respaldo
 * que funciona bien puede tapar una caída de la base durante días si nadie ve
 * el error en ninguna parte.
 */
export async function getHeroImagenes(): Promise<HeroImagen[]> {
  const hero = await leer();

  if (!hero?.imagenes.length) return [];

  return getImagenesOrdenadas(hero);
}
