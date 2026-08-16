"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/contact";
import { FOCO_PREDETERMINADO, type HeroImagen } from "@/lib/hero/types";
import { HERO_FALLBACK } from "@/lib/hero/fallback";
import { useState, useEffect, useRef } from "react";

/**
 * Forma común de un slide, sea que venga del panel o del respaldo.
 *
 * El título es opcional porque solo lo trae el respaldo: las imágenes que se
 * cargan desde el panel ya vienen con su texto incorporado en el archivo y no
 * llevan nada dibujado por encima.
 */
type Slide = {
  src: string;
  alt: string;
  objectPosition: string;
  titulo?: string;
  linea2?: string;
};

function aSlides(imagenes: HeroImagen[]): Slide[] {
  // Sin contenido administrado —nadie cargó nada todavía, la migración no
  // corrió, o la base no respondió— el inicio muestra el carrusel original en
  // lugar de quedar vacío.
  if (!imagenes.length) {
    return HERO_FALLBACK.map((slide) => ({
      src: slide.src,
      alt: slide.alt,
      objectPosition: slide.foco,
      titulo: slide.titulo,
      linea2: slide.linea2,
    }));
  }

  // El panel no pide una descripción: las imágenes traen su texto incorporado
  // y se cargan tal cual. El alt queda vacío, que es la forma correcta de
  // declarar una imagen decorativa —un lector de pantalla la saltea en lugar
  // de leer un nombre de archivo—, con el costo de que su contenido no llega
  // ni a quien no la ve ni a los buscadores.
  return imagenes.map((imagen) => ({
    src: imagen.url,
    alt: imagen.alt ?? "",
    objectPosition: imagen.foco || FOCO_PREDETERMINADO,
  }));
}

export function Hero({ imagenes = [] }: { imagenes?: HeroImagen[] }) {
  const slides = aSlides(imagenes);

  const [slideIndex, setSlideIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Con una sola imagen no hay a dónde avanzar: el intervalo solo provocaría
  // renders que no cambian nada.
  const rota = slides.length > 1;

  const startInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (!rota) return;
    intervalRef.current = setInterval(() => {
      setSlideIndex(i => (i + 1) % slides.length);
    }, 5000);
  };

  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rota, slides.length]);

  // El índice puede quedar fuera de rango si se quitaron imágenes desde el
  // panel entre dos renders.
  const currentSlide = slides[slideIndex] ?? slides[0];

  return (
    <>
      {/* Carrusel full-width */}
      {/* El aria-label cubre el caso en que los slides no traen título: las
          imágenes cargadas desde el panel lo llevan incorporado en el archivo,
          así que la sección se queda sin encabezado propio. */}
      <section
        aria-label="Presentación de SUM S.A."
        className="relative w-full h-[60svh] md:h-[calc(100svh-4rem)] mt-16 overflow-hidden"
      >

        {/* Imagen de fondo */}
        <AnimatePresence mode="wait">
          <motion.div
            key={slideIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              src={currentSlide.src}
              alt={currentSlide.alt}
              fill
              className="object-cover"
              style={{ objectPosition: currentSlide.objectPosition }}
              priority={slideIndex === 0}
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlay gradiente */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent pointer-events-none z-10" />

        {/* Texto del slide — zona inferior izquierda.
            Solo lo trae el respaldo: las imágenes administradas desde el panel
            ya vienen con su texto dentro del archivo, y dibujar otro encima lo
            taparía. */}
        {currentSlide.titulo && (
          <div className="absolute inset-0 z-20 flex flex-col justify-end px-4 pb-12 md:px-16 md:pb-28 lg:px-24 max-w-350 mx-auto w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={slideIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="text-[clamp(1.5rem,3.5vw,2.8rem)] font-black text-white leading-tight tracking-tight mb-3 max-w-2xl">
                  {currentSlide.titulo}
                  {currentSlide.linea2 && (
                    <>
                      <br />
                      {currentSlide.linea2}
                    </>
                  )}
                </h1>
                <div className="w-10 h-0.5 bg-secondary mb-3" />
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* Dots de navegación — centrados abajo.
            Con una sola imagen no navegan a ninguna parte. */}
        {rota && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => { setSlideIndex(i); startInterval(); }}
                className={`rounded-full transition-all ${i === slideIndex
                    ? "w-5 h-1.5 bg-white"
                    : "w-1.5 h-1.5 bg-white/40 hover:bg-white/70"
                  }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </section>

      {/* Sección de acción — debajo del carrusel */}
      <section className="bg-white px-4 py-4 md:px-16 lg:px-24 border-b border-gray-100">
        <div className="max-w-350 mx-auto flex flex-wrap items-center justify-between gap-4 sm:justify-center sm:gap-10">
          <div className="flex items-center gap-6">
            {[
              { value: "+40", label: "AÑOS" },
              { value: "24/7", label: "DISPONIBILIDAD" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-black text-primary">{stat.value}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-primary/40 mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
          <div className="w-px h-8 bg-primary/15 hidden sm:block" />
          <a
            href={WHATSAPP_URL}
            className="text-primary/50 font-semibold text-sm whitespace-nowrap hover:text-primary transition-colors hidden sm:block"
          >
            Hablá con nosotros →
          </a>
          <div className="w-px h-8 bg-primary/15 hidden sm:block" />
          <Link
            href="/planes"
            className="flex items-center gap-2 px-5 py-3 bg-primary/5 text-primary border border-primary/15 rounded-2xl font-bold text-sm whitespace-nowrap"
          >
            Ver Planes
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </>
  );
}
