"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { PhoneCall, ArrowRight } from "lucide-react";
import { EMERGENCY_PHONE, EMERGENCY_PHONE_DISPLAY, WHATSAPP_URL } from "@/lib/contact";

// Apple-style: blur-to-sharp + fade-up, staggered
const appleReveal = (delay: number, blur = 16) => ({
  initial: { opacity: 0, y: 20, filter: `blur(${blur}px)` },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 1.1, delay, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
});

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#00112b]">

      {/* Background: base gradient + animated blobs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        aria-hidden
        className="absolute inset-0"
      >
        {/* Static radial base */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(0,80,160,0.35),transparent)]" />

        {/* Animated blobs */}
        <div className="hero-blob hero-blob-1" />
        <div className="hero-blob hero-blob-2" />
        <div className="hero-blob hero-blob-3" />
        <div className="hero-blob hero-blob-4" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto">

        {/* Main title — bigger blur, more drama */}
        <motion.h1
          {...appleReveal(0.45, 28)}
          className="text-[clamp(5rem,18vw,12rem)] font-black text-white leading-[0.85] tracking-tighter mb-8 select-none"
        >
          SUM
        </motion.h1>

        {/* Tagline — word by word */}
        <div className="text-[clamp(1.3rem,3vw,2.5rem)] font-medium text-white/60 mb-16 leading-snug">
          <motion.span
            {...appleReveal(0.75, 12)}
            className="block"
          >
            Siempre listos.
          </motion.span>
          <motion.span
            {...appleReveal(0.95, 12)}
            className="block"
          >
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
          className="mt-20 flex items-center gap-12 text-center"
        >
          {[
            { value: "+30", label: "Años" },
            { value: "24/7", label: "Disponibilidad" },
            { value: "15 min", label: "Respuesta" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl font-black text-white">{stat.value}</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-white/30 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
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
