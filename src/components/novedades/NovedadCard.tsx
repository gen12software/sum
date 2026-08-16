import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Images, Newspaper, Play, Star } from "lucide-react";

import { getExtracto, getPortada, type Novedad } from "@/lib/novedades/types";

/**
 * Tarjeta del listado.
 *
 * Acá la portada sí se recorta (object-cover): en una grilla hacen falta
 * alturas homogéneas y la portada funciona como miniatura, no como la imagen
 * en sí. El detalle es el que muestra las imágenes completas.
 *
 * Todas las tarjetas son iguales. Se probó dar a la primera un tratamiento
 * más prominente, pero eso hacía que el listado se viera distinto según
 * cuántas novedades hubiera publicadas.
 */
export function NovedadCard({ novedad, priority }: { novedad: Novedad; priority?: boolean }) {
  const portada = getPortada(novedad);
  const cantidadImagenes = novedad.imagenes.length;

  return (
    <Link
      href={`/novedades/${novedad.slug}`}
      className={`group relative flex h-full flex-col overflow-hidden rounded-4xl border bg-white transition-all hover:shadow-premium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
        novedad.destacada
          ? // El realce dorado vive en el contenedor, no encima de la portada.
            "border-gold/60 shadow-[0_0_0_3px_var(--color-gold-soft)]"
          : "border-border"
      }`}
    >
      <div className="relative aspect-4/3 shrink-0 overflow-hidden bg-surface">
        {portada ? (
          <Image
            src={portada.url}
            alt={portada.alt || novedad.titulo}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
            priority={priority}
            loading={priority ? undefined : "lazy"}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          // Sin imágenes, un fondo de marca antes que un hueco vacío.
          <div className="flex h-full min-h-48 items-center justify-center bg-linear-to-br from-primary to-secondary">
            <Newspaper size={32} className="text-white/30" />
          </div>
        )}

        {/* Recuento de multimedia. Se apoya en el degradado inferior para no
            depender del contraste con la imagen. */}
        {(cantidadImagenes > 1 || novedad.video_url) && (
          <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-linear-to-t from-black/55 to-transparent px-3 pb-2.5 pt-8">
            {cantidadImagenes > 1 && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-white">
                <Images size={12} />
                {cantidadImagenes}
                <span className="sr-only"> imágenes</span>
              </span>
            )}
            {novedad.video_url && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-white">
                <Play size={12} className="fill-current" />
                Video
              </span>
            )}
          </div>
        )}
      </div>

      <div className="flex grow flex-col p-6">
        {novedad.destacada && (
          <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-gold-soft px-3 py-1 text-[10px] font-black uppercase tracking-widest text-gold-dark ring-1 ring-gold/40">
            <Star size={10} className="fill-current" />
            Destacada
          </span>
        )}

        <h3 className="text-xl font-black leading-tight tracking-tight text-primary">
          {novedad.titulo}
        </h3>

        <p className="mt-2 grow text-sm font-medium leading-relaxed text-primary/55">
          {getExtracto(novedad.descripcion)}
        </p>

        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-secondary">
          Leer más
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
