/** Marcas diacríticas que la normalización NFD deja separadas de su letra base. */
const DIACRITICOS = /[̀-ͯ]/g;

/**
 * Deriva el slug de una novedad a partir de su título.
 *
 * El slug es inmutable una vez creada la novedad: editar el título no lo
 * cambia, para no romper los enlaces que ya se compartieron.
 */
export function slugify(titulo: string): string {
  return titulo
    .normalize("NFD")
    .replace(DIACRITICOS, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

/**
 * Devuelve un slug libre, agregando un sufijo numérico ante colisiones.
 *
 * `existe` consulta la base. El bucle tiene tope para no quedar colgado si la
 * consulta fallara siempre.
 */
export async function buildUniqueSlug(
  titulo: string,
  existe: (slug: string) => Promise<boolean>,
): Promise<string> {
  const base = slugify(titulo) || "novedad";

  if (!(await existe(base))) return base;

  for (let suffix = 2; suffix <= 100; suffix++) {
    const candidate = `${base}-${suffix}`;
    if (!(await existe(candidate))) return candidate;
  }

  // Último recurso: sufijo temporal, que en la práctica no colisiona.
  return `${base}-${Date.now()}`;
}
