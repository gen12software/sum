"use server";

import { revalidatePath } from "next/cache";

import { requireSession } from "@/lib/auth/guard";
import { supabaseAdmin } from "@/lib/supabase/server";
import { getHeroAdmin } from "@/lib/hero/queries";
import { heroFormSchema } from "@/lib/hero/schema";
import { eliminarHuerfanosHero } from "@/lib/hero/storage";
import { HERO_ID, TABLE_HERO } from "@/lib/hero/types";

export type HeroActionState = { error?: string; success?: string };

const ERROR_GENERICO = "No se pudo guardar. Revisá la conexión e intentá de nuevo.";

export async function guardarHeroAction(
  _prev: HeroActionState,
  formData: FormData,
): Promise<HeroActionState> {
  await requireSession();

  const raw = formData.get("payload");
  if (typeof raw !== "string") {
    return { error: "No se pudieron leer los datos del formulario." };
  }

  let payload: unknown;
  try {
    payload = JSON.parse(raw);
  } catch {
    return { error: "No se pudieron leer los datos del formulario." };
  }

  const parsed = heroFormSchema.safeParse(payload);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  // Se renumeran según la posición en que llegaron, que es la que el
  // administrador definió arrastrándolas.
  const imagenes = parsed.data.imagenes.map((imagen, index) => ({ ...imagen, orden: index }));

  const anterior = await getHeroAdmin();

  // La fila es única y la migración la deja creada. El upsert cubre el caso de
  // que alguien la haya borrado a mano desde el SQL Editor.
  const { error } = await supabaseAdmin.from(TABLE_HERO).upsert({
    id: HERO_ID,
    imagenes,
  });

  if (error) {
    console.error("[hero] Error al guardar:", error.message);
    return { error: ERROR_GENERICO };
  }

  if (anterior) {
    await eliminarHuerfanosHero(
      anterior.imagenes.map((imagen) => imagen.path),
      imagenes.map((imagen) => imagen.path),
    );
  }

  // El carrusel solo vive en el inicio.
  revalidatePath("/");

  // Guardar sin imágenes es válido y devuelve el sitio al carrusel original,
  // así que conviene decirlo en lugar de dar por sentado que se entendió.
  return {
    success: imagenes.length
      ? "Los cambios se guardaron y ya se ven en el sitio."
      : "El carrusel quedó vacío: el inicio vuelve a mostrar las imágenes originales.",
  };
}
