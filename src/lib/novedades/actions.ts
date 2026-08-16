"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireSession } from "@/lib/auth/guard";
import { supabaseAdmin } from "@/lib/supabase/server";
import { getNovedadAdmin, slugExiste } from "@/lib/novedades/queries";
import { buildUniqueSlug } from "@/lib/novedades/slug";
import { novedadFormSchema, reordenarSchema } from "@/lib/novedades/schema";
import { eliminarHuerfanos, eliminarImagenes, eliminarVideo } from "@/lib/novedades/storage";
import { TABLE_NOVEDADES } from "@/lib/novedades/types";

export type ActionState = { error?: string; success?: string };

const ERROR_GENERICO = "No se pudo guardar. Revisá la conexión e intentá de nuevo.";

/**
 * Rutas públicas que dependen de las novedades. Toda modificación las revalida,
 * así el sitio refleja el cambio sin necesidad de redesplegar.
 *
 * El sitemap entra en la lista porque también lista las novedades publicadas, y
 * si no se revalida queda con el contenido del último build.
 */
function revalidar() {
  revalidatePath("/");
  revalidatePath("/novedades");
  // Invalida todas las páginas de detalle de una sola vez.
  revalidatePath("/novedades/[slug]", "page");
  revalidatePath("/sitemap.xml");
}

/** Lee el payload del formulario, que el cliente envía serializado en JSON. */
function parseForm(formData: FormData) {
  const raw = formData.get("payload");
  if (typeof raw !== "string") return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export async function guardarNovedadAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireSession();

  const id = formData.get("id");
  const payload = parseForm(formData);

  if (!payload) return { error: "No se pudieron leer los datos del formulario." };

  const parsed = novedadFormSchema.safeParse(payload);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const data = parsed.data;
  const esEdicion = typeof id === "string" && id.length > 0;

  // Las imágenes se renumeran según la posición en que llegaron, que es la que
  // el administrador definió arrastrándolas.
  const imagenes = data.imagenes.map((imagen, index) => ({ ...imagen, orden: index }));

  const registro = {
    titulo: data.titulo,
    descripcion: data.descripcion,
    imagenes,
    video_url: data.video_url,
    video_path: data.video_path,
    video_orientacion: data.video_orientacion,
    destacada: data.destacada,
    publicada: data.publicada,
    mostrar_en_inicio: data.mostrar_en_inicio,
  };

  if (esEdicion) {
    const anterior = await getNovedadAdmin(id);
    if (!anterior) return { error: "La novedad ya no existe." };

    const { error } = await supabaseAdmin
      .from(TABLE_NOVEDADES)
      // El slug no se toca al editar: cambiarlo rompería los enlaces ya
      // compartidos.
      .update(registro)
      .eq("id", id);

    if (error) {
      console.error("[novedades] Error al actualizar:", error.message);
      return { error: ERROR_GENERICO };
    }

    await eliminarHuerfanos(
      anterior.imagenes.map((imagen) => imagen.path),
      imagenes.map((imagen) => imagen.path),
    );

    if (anterior.video_path && anterior.video_path !== data.video_path) {
      await eliminarVideo(anterior.video_path);
    }
  } else {
    const slug = await buildUniqueSlug(data.titulo, slugExiste);

    // Las novedades nuevas van al inicio del listado sin alterar el orden
    // relativo de las existentes.
    const { data: primera } = await supabaseAdmin
      .from(TABLE_NOVEDADES)
      .select("orden")
      .order("orden", { ascending: true })
      .limit(1)
      .maybeSingle();

    const orden = (primera?.orden ?? 0) - 1;

    const { error } = await supabaseAdmin
      .from(TABLE_NOVEDADES)
      .insert({ ...registro, slug, orden });

    if (error) {
      console.error("[novedades] Error al crear:", error.message);
      return { error: ERROR_GENERICO };
    }
  }

  revalidar();
  redirect("/admin/novedades");
}

export async function eliminarNovedadAction(id: string): Promise<void> {
  await requireSession();

  const novedad = await getNovedadAdmin(id);
  if (!novedad) return;

  const { error } = await supabaseAdmin.from(TABLE_NOVEDADES).delete().eq("id", id);

  if (error) {
    console.error("[novedades] Error al eliminar:", error.message);
    throw new Error("No se pudo eliminar la novedad.");
  }

  // El registro ya no está: los archivos se borran después para que un fallo de
  // Storage no impida la eliminación.
  await eliminarImagenes(novedad.imagenes.map((imagen) => imagen.path));
  await eliminarVideo(novedad.video_path);

  revalidar();
}

async function alternar(id: string, campo: "publicada" | "destacada", valor: boolean) {
  await requireSession();

  const { error } = await supabaseAdmin
    .from(TABLE_NOVEDADES)
    .update({ [campo]: valor })
    .eq("id", id);

  if (error) {
    console.error(`[novedades] Error al cambiar ${campo}:`, error.message);
    throw new Error("No se pudo guardar el cambio.");
  }

  revalidar();
}

export async function togglePublicadaAction(id: string, valor: boolean): Promise<void> {
  await alternar(id, "publicada", valor);
}

export async function toggleDestacadaAction(id: string, valor: boolean): Promise<void> {
  await alternar(id, "destacada", valor);
}

/**
 * Reasigna las posiciones de todas las novedades en una sola operación, según
 * el orden en que llegan los identificadores.
 */
export async function reordenarNovedadesAction(ids: string[]): Promise<void> {
  await requireSession();

  const parsed = reordenarSchema.safeParse(ids);
  if (!parsed.success) throw new Error("Orden inválido.");

  const { error } = await supabaseAdmin.rpc("reordenar_novedades", { ids: parsed.data });

  if (error) {
    console.error("[novedades] Error al reordenar:", error.message);
    throw new Error("No se pudo guardar el nuevo orden.");
  }

  revalidar();
}
