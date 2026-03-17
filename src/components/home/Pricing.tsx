"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, Info, Phone, BadgePercent, MapPin, ExternalLink } from "lucide-react";
import Link from "next/link";
import { EMERGENCY_PHONE, EMERGENCY_PHONE_DISPLAY, WHATSAPP_URL } from "@/lib/contact";

const PLANS = [
  {
    id: "basico",
    name: "Plan Básico",
    description: "Cobertura fundamental para emergencias y urgencias.",
    features: [
      { name: "Emergencias Médicas (Código Rojo)", included: true },
      { name: "Urgencias Médicas (Código Amarillo)", included: true },
      { name: "Visita Programada (Código Verde)", included: true, detail: "Con Copago" },
      { name: "Urgencias Odontológicas", included: false },
      { name: "Gabinete de Enfermería", included: false },
      { name: "Red SIEM Nacional", included: false },
    ],
    highlight: false,
    cta: "Consultar",
  },
  {
    id: "integral",
    name: "Plan Integral",
    description: "La mejor relación costo-beneficio para tu tranquilidad.",
    features: [
      { name: "Emergencias Médicas (Código Rojo)", included: true },
      { name: "Urgencias Médicas (Código Amarillo)", included: true },
      { name: "Visita Programada (Código Verde)", included: true, detail: "Sin Copago" },
      { name: "Urgencias Odontológicas", included: true },
      { name: "Gabinete de Enfermería", included: true },
      { name: "Red SIEM Nacional", included: true },
    ],
    highlight: true,
    cta: "Más Elegido",
  },
  {
    id: "premium",
    name: "Plan Premium",
    description: "Cobertura total con servicios exclusivos a domicilio.",
    features: [
      { name: "Todo lo incluido en Plan Integral", included: true },
      { name: "Electrocardiograma Programado", included: true },
      { name: "Enfermería Programada a Domicilio", included: true },
      { name: "Traslados de Baja Complejidad", included: true },
      { name: "Hogar Protegido (Multifamiliar)", included: true },
      { name: "Atención Prioritaria", included: true },
    ],
    highlight: false,
    cta: "Solicitar",
  },
];

export function Pricing() {
  return (
    <section id="planes" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-bold mb-4"
          >
            <BadgePercent size={16} />
            15% OFF PARA SOCIOS CLUB LOS TILOS
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black text-primary mb-6">Planes a tu Medida</h2>
          <p className="text-xl text-primary/70 max-w-2xl mx-auto font-medium">
            Encontrá la cobertura que mejor se adapta a tus necesidades y las de tu familia. 
            Todos nuestros planes incluyen acceso a nuestra red de profesionales de élite.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {PLANS.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-8 rounded-[2.5rem] border ${
                plan.highlight 
                ? "border-primary bg-primary text-white shadow-2xl scale-105 z-10" 
                : "border-border bg-surface text-primary"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-secondary text-white px-6 py-1 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
                  Recomendado
                </div>
              )}
              
              <h3 className="text-2xl font-black mb-2">{plan.name}</h3>
              <p className={`text-sm mb-8 ${plan.highlight ? "text-white/70" : "text-primary/60"} font-medium`}>
                {plan.description}
              </p>

              <div className="space-y-4 mb-10">
                {plan.features.map((feature, fIndex) => (
                  <div key={fIndex} className="flex items-start gap-3">
                    <div className={`mt-1 p-0.5 rounded-full ${
                      feature.included 
                      ? (plan.highlight ? "bg-white text-primary" : "bg-primary text-white") 
                      : (plan.highlight ? "bg-white/10 text-white/30" : "bg-primary/5 text-primary/20")
                    }`}>
                      <Check size={14} />
                    </div>
                    <div>
                      <span className={`text-sm font-bold ${!feature.included && "opacity-40"}`}>
                        {feature.name}
                      </span>
                      {feature.detail && (
                        <div className={`text-[10px] font-bold uppercase tracking-wider ${
                          plan.highlight ? "text-white/60" : "text-primary/40"
                        }`}>
                          {feature.detail}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href={WHATSAPP_URL}
                className={`w-full py-4 rounded-2xl font-black text-center transition-all flex items-center justify-center gap-2 ${
                  plan.highlight 
                  ? "bg-white text-primary hover:bg-surface" 
                  : "bg-primary text-white hover:bg-primary-dark"
                }`}
              >
                {plan.cta}
                <ExternalLink size={18} />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* SIEM & Regional Coverage */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 bg-surface rounded-4xl border border-border flex flex-col md:flex-row gap-6 items-center"
          >
            <div className="w-20 h-20 shrink-0 bg-white rounded-2xl shadow-sm p-4 flex items-center justify-center">
              <span className="text-2xl font-black italic text-secondary group-hover:scale-110 transition-transform">siem</span>
            </div>
            <div>
              <h4 className="text-xl font-bold text-primary mb-2">Cobertura Internacional (SIEM)</h4>
              <p className="text-sm text-primary/60 leading-relaxed font-medium">
                Contás con la red más grande de América Latina con más de 180 empresas en 17 países. 
                Tu seguridad te acompaña a donde vayas.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 bg-primary text-white rounded-4xl shadow-premium flex flex-col md:flex-row gap-6 items-center"
          >
            <div className="w-16 h-16 shrink-0 bg-white/10 rounded-2xl flex items-center justify-center">
              <Phone className="animate-pulse" />
            </div>
            <div>
              <h4 className="text-xl font-bold mb-2">Asesoramiento Comercial</h4>
              <p className="text-sm text-white/70 leading-relaxed font-medium mb-4">
                Lunes a Viernes de 9 a 17 horas para consultas sobre afiliaciones.
              </p>
              <div className="flex gap-4">
                <a href={`tel:${EMERGENCY_PHONE}`} className="text-sm font-black underline underline-offset-4 hover:text-accent transition-colors">{EMERGENCY_PHONE_DISPLAY}</a>
                <a href={WHATSAPP_URL} className="text-sm font-black underline underline-offset-4 hover:text-accent transition-colors">WhatsApp</a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
