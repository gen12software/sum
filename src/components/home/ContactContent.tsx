"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  ChevronRight,
  Send,
  Building,
  UserCheck,
  CreditCard,
  SearchCheck,
  Smartphone
} from "lucide-react";
import { DEPARTMENTS as DEPT_DATA, QUICK_WHATSAPP as QUICK_WA } from "@/lib/contact";
import { submitContactForm } from "@/app/actions";

const DEPARTMENTS = [
  { ...DEPT_DATA[0], icon: <UserCheck size={20} className="text-secondary" /> },
  { ...DEPT_DATA[1], icon: <Building size={20} className="text-secondary" /> },
  { ...DEPT_DATA[2], icon: <CreditCard size={20} className="text-secondary" /> },
  { ...DEPT_DATA[3], icon: <SearchCheck size={20} className="text-secondary" /> },
];

const QUICK_WHATSAPP = [...QUICK_WA];

export function ContactContent() {
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleContactSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("loading");
    const result = await submitContactForm(new FormData(e.currentTarget));
    setFormStatus(result.success ? "success" : "idle");
    if (result.success) setTimeout(() => setFormStatus("idle"), 3000);
  };

  return (
    <section className="bg-white min-h-screen">
      {/* Header Section */}
      <div className="pt-32 pb-16 bg-linear-to-b from-primary/5 to-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-7xl font-black text-primary mb-6 uppercase tracking-tighter">
              Estamos <span className="text-secondary">Conectados</span>
            </h1>
            <p className="text-xl text-primary/70 max-w-2xl mx-auto font-medium">
              Elegí el canal que prefieras para realizar tus trámites o consultas. Nuestro equipo está para ayudarte.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Info Column */}
          <div className="lg:col-span-12 xl:col-span-8 space-y-12">
            
            {/* Departments Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {DEPARTMENTS.map((dept, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 bg-surface rounded-4xl border border-border group hover:border-secondary/20 hover:shadow-premium transition-all"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-border group-hover:scale-110 transition-transform">
                      {dept.icon}
                    </div>
                    <h3 className="text-lg font-black text-primary uppercase tracking-tight leading-tight">{dept.name}</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-primary/60 font-bold text-sm">
                      <PhoneCall size={16} className="text-primary/30" />
                      <a href={`tel:${dept.tel}`} className="hover:text-secondary transition-colors">{dept.tel}</a>
                    </div>
                    {dept.whatsapp && (
                      <div className="flex items-center gap-3 text-primary/60 font-bold text-sm">
                        <Smartphone size={16} className="text-primary/30" />
                        <a href={`https://wa.me/${dept.whatsapp.replace(/[^0-9]/g, '')}`} className="hover:text-secondary transition-colors">{dept.whatsapp}</a>
                      </div>
                    )}
                    {dept.email && (
                      <div className="flex items-center gap-3 text-primary/60 font-bold text-sm">
                        <Mail size={16} className="text-primary/30" />
                        <a href={`mailto:${dept.email}`} className="hover:text-secondary transition-colors">{dept.email}</a>
                      </div>
                    )}
                    <div className="flex items-center gap-3 text-[10px] font-black uppercase text-primary/30 tracking-widest pt-2">
                      <Clock size={12} />
                      {dept.hours}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Actions (WhatsApp Focus) */}
            <div className="bg-primary rounded-5xl p-10 text-white relative overflow-hidden shadow-2xl">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center">
                    <Smartphone size={20} className="animate-bounce" />
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tight italic">Gestión Rápida por WhatsApp</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                  {QUICK_WHATSAPP.map((q, i) => (
                    <a 
                      key={i}
                      href={`https://wa.me/${q.number.replace(/[^0-9]/g, '')}`}
                      className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group"
                    >
                      <p className="text-xs font-black text-secondary uppercase tracking-widest mb-1">{q.title}</p>
                      <p className="text-lg font-bold mb-2 group-hover:translate-x-1 transition-transform">{q.number}</p>
                      <p className="text-[10px] text-white/40 font-bold uppercase">{q.hours}</p>
                    </a>
                  ))}
                </div>
              </div>
              <div className="absolute top-0 right-0 w-64 h-full bg-linear-to-l from-white/5 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Form and Map Column */}
          <div className="lg:col-span-12 xl:col-span-4 space-y-8">
            {/* Contact Form */}
            <div className="bg-surface rounded-4xl p-10 border border-border shadow-soft">
              <h3 className="text-2xl font-black text-primary uppercase mb-8 italic">Envianos un <span className="text-secondary">mensaje</span></h3>
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-1">Nombre y Apellido</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Escribí tu nombre..."
                    required
                    className="w-full bg-white border border-border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all font-medium text-primary text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-1">Correo Electrónico</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="email@ejemplo.com"
                    required
                    className="w-full bg-white border border-border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all font-medium text-primary text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-1">Mensaje</label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="¿En qué podemos ayudarte?"
                    required
                    className="w-full bg-white border border-border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all font-medium text-primary text-sm resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={formStatus === "loading"}
                  className="w-full bg-primary text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-primary-dark hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  <Send size={18} />
                  {formStatus === "loading" ? "Enviando..." : formStatus === "success" ? "¡Mensaje enviado!" : "Enviar Mensaje"}
                </button>
              </form>
            </div>

            {/* Sede Central / Map Visual */}
            <div className="bg-white rounded-4xl border border-border overflow-hidden group">
              <div className="h-64 bg-slate-200 relative">
                {/* Simplified Map UI Placeholder */}
                <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=-34.9126,-57.9482&zoom=16&size=600x400&markers=color:red%7C-34.9126,-57.9482&key=')] bg-cover bg-center">
                   <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors" />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                   <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                      <MapPin className="text-white" size={24} />
                   </div>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 text-secondary mb-2">
                   <Building size={16} />
                   <span className="text-[10px] font-black uppercase tracking-widest">Sede Central</span>
                </div>
                <h4 className="text-xl font-black text-primary mb-2">Plaza Italia 183</h4>
                <p className="text-sm font-medium text-primary/60 mb-6">B1900 La Plata, Provincia de Buenos Aires</p>
                <a 
                  href="https://www.google.com/maps/dir//Pl.+Italia+183,+B1900+La+Plata,+Provincia+de+Buenos+Aires" 
                  target="_blank"
                  className="flex items-center gap-2 text-secondary font-black text-sm hover:translate-x-1 transition-transform"
                >
                  Cómo llegar <ChevronRight size={16} />
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Institutional Legal Banner */}
      <div className="py-12 bg-surface border-y border-border">
        <div className="container mx-auto px-4">
           <div className="flex flex-col md:flex-row justify-between items-center gap-8 opacity-40 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
              <p className="text-[10px] font-black text-primary uppercase tracking-widest text-center md:text-left">
                SUM S.A. CUIT: 30-61140404-9 | Superintendencia de Servicios de Salud:<br/>RNEMP Nº 1-1469-7 | Tel. 0800 222 SALUD (72583)
              </p>
              <div className="flex gap-8">
                <span className="font-black italic text-primary text-sm">siem</span>
                <span className="font-black italic text-primary text-sm">IRAM</span>
                <span className="font-black italic text-primary text-sm">IQNET</span>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}
