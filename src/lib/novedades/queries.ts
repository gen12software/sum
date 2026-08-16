import "server-only";

import { supabaseAdmin } from "@/lib/supabase/server";
import { TABLE_NOVEDADES, type Novedad } from "@/lib/novedades/types";

const CAMPOS = "*";

/** Destacadas primero, y dentro de cada grupo el orden manual del panel. */
function ordenar<T extends { order: (column: string, options?: { ascending?: boolean }) => T }>(
  query: T,
): T {
  return query.order("destacada", { ascending: false }).order("orden", { ascending: true });
}

// ── Consultas públicas ───────────────────────────────────────
// No llevan cache propio: son las *páginas* las que se generan estáticas, y el
// panel las revalida por ruta al guardar (ver revalidar() en actions.ts). Así
// el tráfico normal se sirve desde el CDN sin consultar la base, que era el
// objetivo, y además el free tier de Supabase se mantiene holgado.
//
// Se descartó unstable_cache: quedó como API legacy en Next 16 y sus tags no
// los invalida updateTag, con lo que el sitio nunca reflejaba los cambios.

export async function getNovedadesPublicadas(): Promise<Novedad[]> {
  const { data, error } = await ordenar(
    supabaseAdmin.from(TABLE_NOVEDADES).select(CAMPOS).eq("publicada", true),
  );

  if (error) {
    console.error("[novedades] No se pudo listar las publicadas:", error.message);
    return [];
  }

  return (data ?? []) as Novedad[];
}

export async function getNovedadPorSlug(slug: string): Promise<Novedad | null> {
  const { data, error } = await supabaseAdmin
    .from(TABLE_NOVEDADES)
    .select(CAMPOS)
    .eq("slug", slug)
    .eq("publicada", true)
    .maybeSingle();

  if (error) {
    console.error("[novedades] No se pudo obtener la novedad:", error.message);
    return null;
  }

  return (data as Novedad | null) ?? null;
}

/**
 * Novedades del home. Se eligen desde el panel una por una: antes eran las
 * tres primeras publicadas, sin que nadie lo decidiera.
 *
 * Sin tope de cantidad: la grilla es de tres columnas, así que marcar más
 * produce otra fila. Si alguna vez hace falta un límite, va acá y no en el
 * modelo.
 */
export async function getNovedadesDelInicio(): Promise<Novedad[]> {
  const { data, error } = await ordenar(
    supabaseAdmin
      .from(TABLE_NOVEDADES)
      .select(CAMPOS)
      .eq("publicada", true)
      .eq("mostrar_en_inicio", true),
  );

  if (error) {
    console.error("[novedades] No se pudo obtener las del inicio:", error.message);
    return [];
  }

  return (data ?? []) as Novedad[];
}

// ── Consultas del panel ──────────────────────────────────────
// Sin cache: quien edita tiene que ver el estado real.

export async function getNovedadesAdmin(): Promise<Novedad[]> {
  const { data, error } = await ordenar(
    supabaseAdmin.from(TABLE_NOVEDADES).select(CAMPOS),
  );

  if (error) {
    console.error("[novedades] No se pudo listar para el panel:", error.message);
    return [];
  }

  return (data ?? []) as Novedad[];
}

export async function getNovedadAdmin(id: string): Promise<Novedad | null> {
  const { data, error } = await supabaseAdmin
    .from(TABLE_NOVEDADES)
    .select(CAMPOS)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("[novedades] No se pudo obtener para el panel:", error.message);
    return null;
  }

  return (data as Novedad | null) ?? null;
}

export async function slugExiste(slug: string): Promise<boolean> {
  const { count, error } = await supabaseAdmin
    .from(TABLE_NOVEDADES)
    .select("id", { count: "exact", head: true })
    .eq("slug", slug);

  // Ante un fallo se asume que existe: es preferible generar un slug con sufijo
  // innecesario que arriesgar una violación del constraint de unicidad.
  if (error) return true;

  return (count ?? 0) > 0;
}
