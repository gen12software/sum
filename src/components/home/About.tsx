"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Sparkles, History, Award, Users } from "lucide-react";
import Image from "next/image";

const STATS = [
  { label: "Años de Trayectoria", value: "+30", icon: <History className="text-secondary" /> },
  { label: "Atenciones Médicas", value: "+1M", icon: <Award className="text-accent" /> },
  { label: "Profesionales", value: "150+", icon: <Users className="text-primary" /> },
];

export function About() {
  return (
    <section id="empresa" className="py-32 bg-white overflow-hidden relative">
      {/* Background accents */}
      <div className="absolute top-1/4 -right-1/4 w-1/2 h-1/2 bg-secondary/5 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl opacity-30" />
      
      <div className="container px-8 relative z-10">
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-6 tracking-wide">
              <Sparkles size={14} />
              NUESTRA HISTORIA
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-primary mb-8 leading-tight">
              Desde 1986 brindando un <span className="text-secondary">Servicio a la Vida</span>
            </h2>
            <div className="space-y-6 text-primary/70 font-medium leading-relaxed">
              <p>
                A principios de los &apos;80, los sistemas de urgencias médicas eran solo sueños. SUM SA nació en 1986 en La Plata, fruto de la visión de emprendedores que transformaron la cobertura médica de la ciudad.
              </p>
              <p>
                Hoy, con más de tres décadas de evolución, pasamos de las iniciales ambulancias Volkswagen a una moderna flota de Unidades de Terapia Intensiva Móvil, incorporando tecnología de seguimiento satelital y un equipo de 150 platenses que cuidan a nuestros socios las 24 horas.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-8 mt-12 transition-all">
              {STATS.map((stat, i) => (
                <div key={i} className="text-center md:text-left">
                  <div className="flex justify-center md:justify-start mb-2">{stat.icon}</div>
                  <div className="text-2xl font-black text-primary">{stat.value}</div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-primary/40">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-4xl overflow-hidden shadow-2xl border-4 border-white rotate-2 hover:rotate-0 transition-transform duration-500">
              <Image 
                src="/hero-bg.png" 
                alt="Ambulancia SUM" 
                width={800} 
                height={600} 
                className="object-cover aspect-video"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-premium border border-border max-w-[200px] -rotate-3">
              <p className="text-xs font-bold text-primary italic">
                &quot;Mantenemos el mismo espíritu fundacional de cuidar a nuestra gente.&quot;
              </p>
            </div>
          </motion.div>
        </div>

        {/* Quality Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-primary rounded-4xl p-8 md:p-16 text-white relative overflow-hidden shadow-2xl"
        >
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold mb-6 tracking-wide">
                <Shield size={14} className="text-accent" />
                CALIDAD CERTIFICADA
              </div>
              <h3 className="text-3xl font-black mb-6">Política de la Calidad ISO 9001:2015</h3>
              <p className="text-white/70 font-medium leading-relaxed mb-8">
                Nuestro Sistema de Gestión de Calidad, avalado por IRAM e IQNET, garantiza la excelencia en la prestación de servicios asistenciales pre-hospitalarios de emergencia y urgencia.
              </p>
              <ul className="space-y-4">
                {[
                  "Satisfacción total de nuestros afiliados.",
                  "Mejora continua de todos los procesos.",
                  "Evolución tecnológica aplicada al servicio.",
                  "Compromiso y participación activa de todo el personal."
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8">
              <div className="bg-white p-6 rounded-2xl shadow-xl w-40 h-40 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-primary rounded-full mb-3 flex items-center justify-center">
                   <span className="text-white font-black italic">IRAM</span>
                </div>
                <span className="text-[10px] font-black text-primary">NORMA ISO 9001</span>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-xl w-40 h-40 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 border-2 border-primary rounded-full mb-3 flex items-center justify-center">
                   <span className="text-primary font-black">IQNET</span>
                </div>
                <span className="text-[10px] font-black text-primary">CERTIFIED QUALITY</span>
              </div>
            </div>
          </div>
          
          {/* Abstract pattern bg */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 -skew-x-12 translate-x-1/4" />
        </motion.div>
      </div>
    </section>
  );
}
