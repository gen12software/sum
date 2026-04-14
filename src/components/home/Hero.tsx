"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { PhoneCall, ArrowRight, Zap, HeartPulse, ShieldCheck } from "lucide-react";
import { EMERGENCY_PHONE, EMERGENCY_PHONE_DISPLAY, WHATSAPP_URL } from "@/lib/contact";
import { useState, useEffect } from "react";

// Apple-style: blur-to-sharp + fade-up, staggered
const appleReveal = (delay: number, blur = 16) => ({
  initial: { opacity: 0, y: 20, filter: `blur(${blur}px)` },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 1.1, delay, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
});

// Imágenes de fondo — agregar archivos en public/images/hero/
const BG_IMAGES = [
  "/images/hero/slide-1.png",
  "/images/hero/slide-2.png",
  "/images/hero/slide-3.png",
];

const INFO_SLIDES = [
  { icon: Zap,         title: "Comercialización de DEA",  desc: "Venta e instalación de desfibriladores automáticos externos." },
  { icon: HeartPulse,  title: "Cursos de RCP",             desc: "Capacitación en reanimación para empresas e instituciones." },
  { icon: ShieldCheck, title: "Emergencias 24H",           desc: "Cobertura médica inmediata los 365 días del año." },
];

export function Hero() {
  const [bgIndex, setBgIndex] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>(BG_IMAGES.map(() => false));

  // Auto-rotación fondo cada 5s
  useEffect(() => {
    const t = setInterval(() => setBgIndex(i => (i + 1) % BG_IMAGES.length), 5000);
    return () => clearInterval(t);
  }, []);

  // Auto-rotación info slides cada 4s
  useEffect(() => {
    const t = setInterval(() => setSlideIndex(i => (i + 1) % INFO_SLIDES.length), 4000);
    return () => clearInterval(t);
  }, []);

  const handleImageLoad = (idx: number) => {
    setImagesLoaded(prev => { const n = [...prev]; n[idx] = true; return n; });
  };

  const anyImageLoaded = imagesLoaded.some(Boolean);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#00112b]">

      {/* Background: imágenes carrusel */}
      <AnimatePresence>
        {BG_IMAGES.map((src, i) =>
          i === bgIndex ? (
            <motion.div
              key={src}
              initial={{ opacity: 0 }}
              animate={{ opacity: anyImageLoaded ? 1 : 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0"
              aria-hidden
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover"
                onLoad={() => handleImageLoad(i)}
              />
              {/* Overlay para mantener legibilidad */}
              <div className="absolute inset-0 bg-[#00112b]/70" />
            </motion.div>
          ) : null
        )}
      </AnimatePresence>

      {/* Background: gradiente + blobs (siempre visible, fallback) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        aria-hidden
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(0,80,160,0.35),transparent)]" />
        <div className="hero-blob hero-blob-1" />
        <div className="hero-blob hero-blob-2" />
        <div className="hero-blob hero-blob-3" />
        <div className="hero-blob hero-blob-4" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto w-full">

        {/* Main title */}
        <motion.h1
          {...appleReveal(0.45, 28)}
          className="text-[clamp(3rem,10vw,7rem)] font-black text-white leading-[0.85] tracking-tighter mb-4 select-none"
        >
          SUM
        </motion.h1>

        {/* Tagline */}
        <div className="text-[clamp(1rem,2vw,1.6rem)] font-medium text-white/60 mb-8 leading-snug">
          <motion.span {...appleReveal(0.75, 12)} className="block">
            Siempre listos.
          </motion.span>
          <motion.span {...appleReveal(0.95, 12)} className="block">
            Siempre cerca.
          </motion.span>
        </div>

        {/* CTAs */}
        <motion.div
          {...appleReveal(1.2, 8)}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href={`tel:${EMERGENCY_PHONE}`}
            className="flex items-center gap-3 px-8 py-4 bg-secondary text-white rounded-2xl font-bold text-lg hover:bg-secondary-dark transition-all shadow-lg hover:-translate-y-0.5"
          >
            <PhoneCall size={20} />
            {EMERGENCY_PHONE_DISPLAY}
          </a>

          <Link
            href="/planes"
            className="flex items-center gap-2 px-8 py-4 bg-white/10 text-white border border-white/15 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all"
          >
            Ver Planes
            <ArrowRight size={18} />
          </Link>

          <a
            href={WHATSAPP_URL}
            className="flex items-center gap-2 px-8 py-4 text-white/50 font-bold text-base hover:text-white transition-colors"
          >
            Hablá con nosotros
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          {...appleReveal(1.45, 6)}
          className="mt-8 flex items-center gap-10 text-center"
        >
          {[
            { value: "+30", label: "Años" },
            { value: "24/7", label: "Disponibilidad" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl font-black text-white">{stat.value}</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-white/30 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Info slides strip */}
        <motion.div
          {...appleReveal(1.65, 6)}
          className="mt-6 w-full max-w-sm"
        >
          <div className="relative overflow-hidden rounded-2xl h-24">
            <AnimatePresence mode="wait">
              {INFO_SLIDES.map((slide, i) =>
                i === slideIndex ? (
                  <motion.div
                    key={slide.title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                    className="flex items-start gap-4 p-5 bg-white/10 border border-white/20 rounded-2xl text-left"
                  >
                    <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                      <slide.icon size={16} className="text-white/80" />
                    </div>
                    <div>
                      <div className="text-sm font-black text-white mb-0.5">{slide.title}</div>
                      <div className="text-xs text-white/50 font-medium leading-relaxed">{slide.desc}</div>
                    </div>
                  </motion.div>
                ) : null
              )}
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-3">
            {INFO_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlideIndex(i)}
                className={`rounded-full transition-all ${i === slideIndex ? "w-4 h-1.5 bg-white/70" : "w-1.5 h-1.5 bg-white/25 hover:bg-white/40"}`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <div className="w-px h-14 bg-white/10 relative overflow-hidden rounded-full">
          <div
            className="absolute inset-x-0 h-1/2 bg-linear-to-b from-transparent via-white/50 to-transparent"
            style={{ animation: "scroll-line 1.8s linear infinite" }}
          />
        </div>
        <span className="text-white/20 text-[9px] font-bold uppercase tracking-[0.3em]">
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
