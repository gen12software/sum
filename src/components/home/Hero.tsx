"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Activity, Clock } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[95vh] flex items-center pt-32 pb-24 overflow-hidden bg-white">
      {/* Background Pattern/Image */}
      <div className="absolute inset-0 z-0 opacity-10">
        <Image
          src="/hero-bg.png"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-r from-white via-white/80 to-transparent" />
      </div>

      {/* Abstract Shapes */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-1/4 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-2xl opacity-50" />

      <div className="container px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-6 tracking-wide border border-primary/20">
              <ShieldCheck size={14} />
              TU SEGURIDAD ES NUESTRA PRIORIDAD
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-primary mb-6 leading-[1.1]">
              Cuidado de <span className="text-secondary">Emergencia</span> de Próxima Generación
            </h1>
            
            <p className="text-lg md:text-xl text-primary mb-10 max-w-xl leading-relaxed font-medium">
              En SUM combinamos tecnología avanzada y calidez humana para brindarte el mejor servicio de salud prehospitalaria desde 1986.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/planes"
                className="group flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-2xl font-bold text-lg hover:bg-primary-dark transition-all shadow-premium hover:-translate-y-1"
              >
                Ver Planes
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contacto"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary border-2 border-primary/10 rounded-2xl font-bold text-lg hover:bg-surface transition-all shadow-sm hover:border-primary/30"
              >
                Contactanos
              </Link>
            </div>

            {/* Stats/Badges */}
            <div className="mt-12 grid grid-cols-3 gap-6 pt-12 border-t border-border/50">
              <div>
                <div className="flex items-center gap-2 text-primary font-bold mb-1">
                  <Clock size={18} />
                  15 min
                </div>
                <div className="text-[10px] text-primary/60 font-bold uppercase tracking-wider">Respuesta Promedio</div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-primary font-bold mb-1">
                  <Activity size={18} />
                  24/7
                </div>
                <div className="text-[10px] text-primary/60 font-bold uppercase tracking-wider">Disponibilidad</div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-primary font-bold mb-1">
                  <ShieldCheck size={18} />
                  +30 años
                </div>
                <div className="text-[10px] text-primary/60 font-bold uppercase tracking-wider">Experiencia</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block relative"
          >
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src="/hero-bg.png"
                alt="SUM Medical Service"
                width={800}
                height={600}
                className="object-cover aspect-4/3"
              />
              <div className="absolute inset-0 bg-linear-to-t from-primary/40 to-transparent" />
            </div>
            
            {/* Background elements for depth */}
            <div className="absolute -z-10 -top-6 -right-6 w-full h-full border-2 border-primary/10 rounded-[2.5rem]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
