import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Home, Pencil, Star } from "lucide-react";

import { getNovedadAdmin } from "@/lib/novedades/queries";
import { getImagenesOrdenadas, getPortada } from "@/lib/novedades/types";
import { Carrusel } from "@/components/novedades/Carrusel";
import { VideoPlayer } from "@/components/novedades/VideoPlayer";
import { Button } from "@/components/admin/ui";

/**
 * Vista de lectura de una novedad dentro del panel.
 *
 * Existe porque hasta ahora la única forma de mirar una novedad era abrir su
 * formulario de edición, con el riesgo de guardar sin querer. Acá no hay
 * ningún control que modifique nada: solo el acceso explícito a editar.
 *
 * Reutiliza Carrusel y VideoPlayer, los mismos componentes del sitio público,
 * para que lo que se ve sea lo que se va a publicar.
 *
 * La sesión la exige el layout (panel), igual que el resto del panel.
 */

function Estado({
  activo,
  children,
}: {
  activo: boolean;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
        activo ? "bg-emerald-50 text-emerald-700" : "bg-primary/5 text-primary/45"
      }`}
    >
      {children}
    </span>
  );
}

export default async function VerNovedadPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const novedad = await getNovedadAdmin(id);

  if (!novedad) notFound();

  const imagenes = getImagenesOrdenadas(novedad);
  const portada = getPortada(novedad);

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/admin/novedades"
        className="mb-4 inline-flex items-center gap-1.5 text-xs font-bold text-primary/50 transition-colors hover:text-primary"
      >
        <ArrowLeft size={14} />
        Volver al listado
      </Link>

      <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="mb-1 text-xs font-black uppercase tracking-widest text-primary/40">
            Vista previa
          </p>
          <h1 className="text-3xl font-black leading-tight tracking-tight text-primary">
            {novedad.titulo}
          </h1>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Link href={`/admin/novedades/${novedad.id}`}>
            <Button type="button">
              <Pencil size={15} />
              Editar
            </Button>
          </Link>

          {novedad.publicada && (
            <Link href={`/novedades/${novedad.slug}`} target="_blank" rel="noopener noreferrer">
              <Button type="button" variant="secondary">
                <ExternalLink size={15} />
                Ver en el sitio
              </Button>
            </Link>
          )}
        </div>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-2">
        <Estado activo={novedad.publicada}>
          {novedad.publicada ? "Activada" : "Desactivada"}
        </Estado>
        <Estado activo={novedad.destacada}>
          <Star size={12} className={novedad.destacada ? "fill-current" : ""} />
          {novedad.destacada ? "Destacada" : "Sin destacar"}
        </Estado>
        <Estado activo={novedad.mostrar_en_inicio}>
          <Home size={12} />
          {novedad.mostrar_en_inicio ? "En el inicio" : "Fuera del inicio"}
        </Estado>
      </div>

      <article className="rounded-2xl border border-border bg-white p-6 sm:p-8">
        {imagenes.length > 0 && (
          <div className="mb-7">
            <Carrusel imagenes={imagenes} titulo={novedad.titulo} />
          </div>
        )}

        {/* whitespace-pre-line preserva los saltos de línea cargados desde el
            formulario, igual que en la página pública. */}
        <div className="whitespace-pre-line text-base font-medium leading-relaxed text-primary/70">
          {novedad.descripcion}
        </div>

        {novedad.video_url && novedad.video_orientacion && (
          <div className="mt-8">
            <VideoPlayer
              src={novedad.video_url}
              orientacion={novedad.video_orientacion}
              poster={portada?.url}
              titulo={novedad.titulo}
            />
          </div>
        )}
      </article>

      <p className="mt-4 text-xs font-medium text-primary/40">
        Dirección pública:{" "}
        <code className="rounded bg-primary/5 px-1.5 py-0.5">/novedades/{novedad.slug}</code>
      </p>
    </div>
  );
}
