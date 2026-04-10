"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Stethoscope, 
  Truck, 
  Baby, 
  Activity, 
  PhoneCall, 
  Mail, 
  ChevronRight,
  Briefcase,
  Users,
  GraduationCap
} from "lucide-react";

const POSITIONS = [
  {
    title: "Médicos",
    icon: <Stethoscope className="text-secondary" />,
    requirements: [
      "Experiencia mínima: dos años en Emergencias.",
      "Terapia Intensiva.",
      "Cardiología.",
      "Clínica Médica.",
      "Medicina General y/o Pediatría."
    ],
    contact: { tel: "(0221) 489-4699", email: "rrhh@sumsa.com.ar" }
  },
  {
    title: "Enfermeros",
    icon: <Activity className="text-secondary" />,
    requirements: [
      "Experiencia en UTI / UC / UTIM.",
      "Con Título y Experiencia.",
      "Licencia de Conducir: Categoría D.3"
    ],
    contact: { tel: "(0221) 489-4699", email: "rrhh@sumsa.com.ar" }
  },
  {
    title: "Médicos de UTIM",
    subtitle: "Unidad de Terapia Intensiva Móvil",
    icon: <Truck className="text-secondary" />,
    requirements: [
      "Excelentes condiciones de trabajo.",
      "Guardias de 12 y 24 hs.",
      "Para zona de La Plata."
    ],
    contact: { tel: "(0221) 489-4699", email: "info@sumsa.com.ar" }
  },
  {
    title: "Psicólogos",
    icon: <Users className="text-secondary" />,
    requirements: [
      "Para cubrir tareas administrativas.",
      "En La Plata.",
      "Jornada de 6 horas."
    ],
    contact: { email: "info@sumsa.com.ar" }
  },
  {
    title: "Médicos de Temporada",
    subtitle: "Temporada 2025",
    icon: <Briefcase className="text-secondary" />,
    requirements: [
      "Para realizar tareas de revisación médica de ingreso a natatorio.",
      "Enviar CV actualizado."
    ],
    contact: { email: "info@sumsa.com.ar" }
  },
  {
    title: "Médicos Regionales",
    subtitle: "Zonas Específicas",
    icon: <GraduationCap className="text-secondary" />,
    requirements: [
      "Para zona de Brandsen, Guernica y San Vicente.",
    ],
    contact: { email: "rrhh@sumsa.com.ar" }
  }
];

export function WorkWithUsContent() {
  return (
    <section className="bg-white min-h-screen">
      {/* Hero Header */}
      <div className="pt-40 pb-20 bg-linear-to-b from-primary/5 to-white border-b border-border/50">
        <div className="container px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-7xl font-black text-primary mb-6 uppercase tracking-tighter">
              Unite a <span className="text-secondary">Nuestro Equipo</span>
            </h1>
            <p className="text-xl text-primary/70 max-w-2xl mx-auto font-medium">
              Estamos en la búsqueda constante de profesionales apasionados por la salud y comprometidos con la excelencia.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container px-8 py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {POSITIONS.map((pos, i) => (
            <motion.div
              key={pos.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-surface rounded-4xl p-8 border border-border group hover:border-secondary/20 hover:shadow-premium transition-all flex flex-col"
            >
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-border mb-6 group-hover:scale-110 transition-transform">
                {pos.icon}
              </div>
              
              <h3 className="text-2xl font-black text-primary uppercase tracking-tight mb-1">{pos.title}</h3>
              {pos.subtitle && <p className="text-xs font-black text-secondary uppercase tracking-widest mb-4">{pos.subtitle}</p>}
              
              <ul className="space-y-3 mb-8 grow">
                {pos.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm font-medium text-primary/60 leading-tight not-italic">
                    <ChevronRight size={14} className="text-secondary shrink-0 mt-0.5" />
                    {req}
                  </li>
                ))}
              </ul>

              <div className="pt-6 border-t border-border/50 space-y-3">
                <div className="text-[10px] font-black text-primary/40 uppercase tracking-widest">Postulate Aquí</div>
                {pos.contact.tel && (
                  <div className="flex items-center gap-2 text-primary/70 font-bold text-xs hover:text-secondary transition-colors cursor-pointer">
                    <PhoneCall size={14} />
                    {pos.contact.tel}
                  </div>
                )}
                {pos.contact.email && (
                  <a href={`mailto:${pos.contact.email}`} className="flex items-center gap-2 text-primary/70 font-bold text-xs hover:text-secondary transition-colors">
                    <Mail size={14} />
                    {pos.contact.email}
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* CV Submission Banner */}
        <div className="mt-20 p-12 bg-primary rounded-5xl text-white relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="relative z-10 max-w-xl">
            <h3 className="text-3xl font-black not-italic uppercase mb-4">¿No encontrás tu vacante?</h3>
            <p className="text-white/70 font-medium">Enviá tu CV de forma espontánea y lo tendremos en cuenta para futuras búsquedas en todas nuestras áreas: técnica, administrativa y de servicios.</p>
          </div>
          <a href="mailto:rrhh@sumsa.com.ar" className="relative z-10 bg-white text-primary px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-xl active:scale-95">
            Enviar CV Espontáneo
          </a>
          <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 -skew-x-12 translate-x-1/2" />
        </div>
      </div>
    </section>
  );
}
