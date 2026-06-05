"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/contact";
import { useState, useEffect, useRef } from "react";

const HERO_SLIDES = [
  {
    src: "/images/hero/1.DOCTORA.png",
    title: "ESTAMOS CUIDANDO",
    line2: "MÁS IMPORTA",
    objectPosition: "center top",
  },
  {
    src: "/images/hero/2.ATENCIÓN.png",
    title: "CUIDAMOS PERSONAS, ACOMPAÑAMOS SIEMPRE",
    objectPosition: "center center",
  },
  {
    src: "/images/hero/3.DESPACHO.png",
    title: "TECNOLOGÍA Y COORDINACIÓN AL SERVICIO DE LA VIDA",
    objectPosition: "center center",
  },
  {
    src: "/images/hero/4.CATEDRAL.png",
    title: "PRESENCIA Y COBERTURA",
    line2: "TODO EL AÑO",
    objectPosition: "center center",
  },
  {
    src: "/images/hero/5.LA PLATA.png",
    title: "DESDE HACE 40 AÑOS, CUIDANDO LA SALUD EN NUESTRA CIUDAD",
    objectPosition: "center center",
  },
];

export function Hero() {
  const [slideIndex, setSlideIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setSlideIndex(i => (i + 1) % HERO_SLIDES.length);
    }, 5000);
  };

  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentSlide = HERO_SLIDES[slideIndex];

  return (
    <>
      {/* Carrusel full-width */}
      <section className="relative w-full h-[60svh] md:h-[calc(100svh-4rem)] mt-16 overflow-hidden">

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
              alt={currentSlide.title}
              fill
              className="object-cover"
              style={{ objectPosition: currentSlide.objectPosition }}
              priority={slideIndex === 0}
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlay gradiente */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent pointer-events-none z-10" />

        {/* Texto del slide — zona inferior izquierda */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end px-4 pb-12 md:px-16 md:pb-28 lg:px-24 max-w-[1400px] mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={slideIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-[clamp(1.5rem,3.5vw,2.8rem)] font-black text-white leading-tight tracking-tight mb-3 max-w-2xl">
                {currentSlide.title}
                {currentSlide.line2 && (
                  <>
                    <br />
                    {currentSlide.line2}
                  </>
                )}
              </h1>
              <div className="w-10 h-0.5 bg-secondary mb-3" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots de navegación — centrados abajo */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => { setSlideIndex(i); startInterval(); }}
              className={`rounded-full transition-all ${
                i === slideIndex
                  ? "w-5 h-1.5 bg-white"
                  : "w-1.5 h-1.5 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Sección de acción — debajo del carrusel */}
      <section className="bg-white px-4 py-4 md:px-16 lg:px-24 border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto flex flex-wrap items-center justify-between gap-4 sm:justify-center sm:gap-10">
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
