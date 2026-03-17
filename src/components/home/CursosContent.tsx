"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
    HeartPulse, 
    Activity, 
    ShieldCheck, 
    CheckCircle2, 
    Mail, 
    PhoneCall, 
    Instagram, 
    Facebook,
    Sparkles,
    ChevronRight,
    SearchCheck
} from "lucide-react";

const COURSES = [
  {
    title: "Reanimación Cardio Pulmonar (RCP)",
    desc: "Técnicas vitales para adultos, niños y lactantes.",
    icon: <HeartPulse className="text-secondary" />
  },
  {
    title: "Alivio de Asfixia",
    desc: "Maniobras de desobstrucción de vía aérea.",
    icon: <Activity className="text-secondary" />
  },
  {
    title: "Manejo de DEA",
    desc: "Uso correcto del desfibrilador automático externo.",
    icon: <ShieldCheck className="text-secondary" />
  },
  {
    title: "Primeros Auxilios Básicos",
    desc: "Asistencia inicial ante diversos cuadros clínicos.",
    icon: <SearchCheck className="text-secondary" />
  }
];

export function CursosContent() {
  return (
    <section className="bg-white min-h-screen">
      {/* Hero Header */}
      <div className="pt-40 pb-20 bg-linear-to-b from-primary/5 to-white border-b border-border/50 overflow-hidden relative">
        <div className="container px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 border border-secondary/20 rounded-full text-[10px] font-black text-secondary mb-6 uppercase tracking-[0.2em]">
               <Sparkles size={12} />
               Convenio Marco SUM + Cruz Roja
            </div>
            <h1 className="text-4xl md:text-8xl font-black text-primary mb-6 uppercase tracking-tighter leading-none">
              Cursos & <br/><span className="text-secondary">Capacitación</span>
            </h1>
            <p className="text-xl text-primary/70 max-w-2xl mx-auto font-medium">
              Formación profesional para personal no sanitario enfocada en salvar vidas.
            </p>
          </motion.div>
        </div>
        
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-white/10 to-transparent pointer-events-none" />
      </div>

      <div className="container px-8 pb-32 pt-12">
        
        {/* Discount Banner */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="bg-primary rounded-5xl p-10 text-white relative overflow-hidden shadow-2xl mb-20 flex flex-col md:flex-row items-center justify-between gap-8 border-4 border-secondary/20"
        >
           <div className="relative z-10 flex items-center gap-6">
              <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center -rotate-6 shadow-2xl border-4 border-white/20 shrink-0">
                 <div className="text-center">
                    <span className="block text-4xl font-black text-primary leading-none">30%</span>
                    <span className="block text-[10px] font-black text-secondary tracking-tighter uppercase">Descuento</span>
                 </div>
              </div>
              <div>
                 <h3 className="text-3xl font-black italic uppercase leading-none mb-2">Beneficio Exclusivo</h3>
                 <p className="text-white/60 font-medium">Bonificación especial en cursos para Afiliados y Empleados de SUM S.A.</p>
              </div>
           </div>
           <div className="relative z-10 flex gap-4">
              <div className="w-32 py-4 bg-white/10 rounded-2xl border border-white/20 flex items-center justify-center">
                 <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Socio SUM</span>
              </div>
           </div>
           <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 -skew-x-12 translate-x-1/2" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
           
           {/* Left: Courses Grid */}
           <div className="lg:col-span-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {COURSES.map((course, i) => (
                  <motion.div
                    key={course.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-8 bg-surface rounded-4xl border border-border group hover:border-secondary/20 hover:shadow-premium transition-all"
                  >
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-border mb-6 group-hover:scale-110 transition-transform">
                      {course.icon}
                    </div>
                    <h3 className="text-xl font-black text-primary uppercase mb-2 leading-tight">{course.title}</h3>
                    <p className="text-sm font-medium text-primary/60 mb-6">{course.desc}</p>
                    
                    <div className="flex flex-col gap-2 pt-4 border-t border-border/50">
                       <div className="flex items-center gap-2 text-[10px] font-black text-primary/30 uppercase tracking-widest leading-none">
                          <CheckCircle2 size={12} className="text-secondary" /> Curso Arancelado
                       </div>
                       <div className="flex items-center gap-2 text-[10px] font-black text-primary/30 uppercase tracking-widest leading-none">
                          <CheckCircle2 size={12} className="text-secondary" /> Personal No Sanitario
                       </div>
                    </div>
                  </motion.div>
                ))}
              </div>
           </div>

           {/* Right: Sidebar Info */}
           <div className="lg:col-span-4 space-y-8">
              <div className="p-10 bg-surface rounded-4xl border border-border shadow-soft">
                 <div className="flex items-center gap-3 mb-8">
                   <div className="bg-white p-3 rounded-2xl shadow-sm border border-border">
                      {/* Logo Cruz Roja Mockup */}
                      <div className="w-8 h-8 flex items-center justify-center text-secondary">
                         <div className="w-2 h-8 bg-secondary rounded-full absolute" />
                         <div className="w-8 h-2 bg-secondary rounded-full absolute" />
                      </div>
                   </div>
                   <div>
                      <h4 className="font-black text-primary uppercase text-sm leading-tight">Cruz Roja Argentina</h4>
                      <p className="text-[10px] font-black text-secondary tracking-widest uppercase">Filial La Plata</p>
                   </div>
                 </div>

                 <div className="space-y-8">
                    <div>
                       <p className="text-[10px] font-black text-primary/30 uppercase tracking-widest mb-4">Informes e Inscripciones</p>
                       <div className="space-y-4">
                          <div className="flex items-center gap-3 text-primary font-bold">
                             <PhoneCall size={18} className="text-secondary" />
                             <a href="tel:2213544444" className="hover:text-secondary transition-colors">(221) 354-4444</a>
                          </div>
                          <div className="flex items-center gap-3 text-primary font-bold">
                             <Mail size={18} className="text-secondary" />
                             <a href="mailto:la-plata@cruzroja.org.ar" className="hover:text-secondary transition-colors text-sm truncate shrink">la-plata@cruzroja.org.ar</a>
                          </div>
                       </div>
                    </div>

                    <div className="pt-8 border-t border-border/50">
                       <p className="text-[10px] font-black text-primary/30 uppercase tracking-widest mb-4">Seguilos en redes</p>
                       <div className="flex gap-4">
                          <a href="#" className="w-10 h-10 bg-white border border-border rounded-xl flex items-center justify-center hover:text-secondary transition-colors">
                             <Instagram size={18} />
                          </a>
                          <a href="#" className="w-10 h-10 bg-white border border-border rounded-xl flex items-center justify-center hover:text-secondary transition-colors">
                             <Facebook size={18} />
                          </a>
                       </div>
                    </div>
                 </div>
              </div>

              {/* In Company CTA */}
              <div className="p-8 bg-white rounded-4xl border border-dashed border-primary/20 hover:border-secondary transition-colors group cursor-pointer">
                 <h4 className="font-black text-primary mb-2 flex items-center justify-between">
                    Capacitación In Company
                    <ChevronRight size={18} className="text-secondary group-hover:translate-x-1 transition-transform" />
                 </h4>
                 <p className="text-xs text-primary/60 font-medium italic">Consulte por planes de formación para empresas y áreas protegidas.</p>
              </div>
           </div>

        </div>
      </div>
    </section>
  );
}
