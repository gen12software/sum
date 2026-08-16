"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { getAspectoCarrusel, type NovedadImagen } from "@/lib/novedades/types";

/**
 * Carrusel de imágenes.
 *
 * El desplazamiento se apoya en scroll-snap nativo: los gestos táctiles salen
 * gratis, el rendimiento es el del navegador y no hace falta librería alguna.
 * Los botones y el teclado operan sobre el mismo scroller.
 *
 * Las imágenes se muestran **completas** (object-contain) dentro de una caja
 * cuya relación de aspecto sale del propio conjunto. Antes la caja era fija
 * (4/3 en móvil, 16/9 en escritorio) con object-cover, y eso partía al medio
 * cualquier foto vertical.
 *
 * La caja se calcula sobre todas las imágenes y no una por una a propósito: si
 * cada diapositiva tuviera su altura, el carrusel saltaría de tamaño al
 * navegar y el scroll-snap se volvería errático.
 */

/** Que una foto muy alta no ocupe más que la ventana del visitante. */
const ALTURA_MAXIMA = "min(78vh, 640px)";
export function Carrusel({ imagenes, titulo }: { imagenes: NovedadImagen[]; titulo: string }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [actual, setActual] = useState(0);

  const irA = useCallback((index: number) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const destino = Math.max(0, Math.min(index, imagenes.length - 1));
    scroller.scrollTo({ left: scroller.clientWidth * destino, behavior: "smooth" });
  }, [imagenes.length]);

  function handleScroll() {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    setActual(Math.round(scroller.scrollLeft / scroller.clientWidth));
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      irA(actual + 1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      irA(actual - 1);
    }
  }

  const unica = imagenes.length === 1;

  // Reservar el espacio con la relación real evita el salto de maquetación
  // mientras las imágenes bajan.
  const aspecto = getAspectoCarrusel(imagenes);

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        onKeyDown={unica ? undefined : handleKeyDown}
        tabIndex={unica ? -1 : 0}
        role={unica ? undefined : "group"}
        aria-label={unica ? undefined : `Imágenes de ${titulo}`}
        style={{ aspectRatio: aspecto, maxHeight: ALTURA_MAXIMA }}
        className="flex w-full snap-x snap-mandatory overflow-x-auto rounded-2xl bg-surface outline-none [scrollbar-width:none] focus-visible:ring-2 focus-visible:ring-accent [&::-webkit-scrollbar]:hidden"
      >
        {imagenes.map((imagen, index) => (
          <div key={imagen.path} className="relative h-full w-full shrink-0 snap-center">
            <Image
              src={imagen.url}
              alt={imagen.alt || `${titulo} — imagen ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              // La primera imagen suele estar sobre la línea de flotación.
              priority={index === 0}
              loading={index === 0 ? undefined : "lazy"}
              // Contenida, no recortada: una foto vertical se ve entera y las
              // bandas laterales las absorbe el fondo de superficie.
              className="object-contain"
            />
          </div>
        ))}
      </div>

      {!unica && (
        <>
          <button
            type="button"
            onClick={() => irA(actual - 1)}
            disabled={actual === 0}
            aria-label="Imagen anterior"
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/85 p-2 text-primary shadow-md backdrop-blur transition-opacity hover:bg-white disabled:pointer-events-none disabled:opacity-0"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            type="button"
            onClick={() => irA(actual + 1)}
            disabled={actual === imagenes.length - 1}
            aria-label="Imagen siguiente"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/85 p-2 text-primary shadow-md backdrop-blur transition-opacity hover:bg-white disabled:pointer-events-none disabled:opacity-0"
          >
            <ChevronRight size={20} />
          </button>

          <div className="mt-3 flex justify-center gap-1.5" aria-hidden="true">
            {imagenes.map((imagen, index) => (
              <button
                key={imagen.path}
                type="button"
                tabIndex={-1}
                onClick={() => irA(index)}
                className={`h-1.5 rounded-full transition-all ${
                  index === actual ? "w-5 bg-primary" : "w-1.5 bg-primary/20 hover:bg-primary/40"
                }`}
              />
            ))}
          </div>

          <p className="sr-only" role="status">
            Imagen {actual + 1} de {imagenes.length}
          </p>
        </>
      )}
    </div>
  );
}
