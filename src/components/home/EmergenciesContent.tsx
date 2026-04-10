"use client";

import React from "react";
import { motion } from "framer-motion";
import { Phone, Clock, Shield, CheckCircle2, AlertTriangle, Info, Truck } from "lucide-react";
import Image from "next/image";

const CALL_STEPS = [
  "Indicar el número de teléfono desde el cual se está llamando.",
  "Decir: 'Estamos en una emergencia'.",
  "Indicar DNI o convenio al que pertenece el paciente.",
  "Brindar nombre del paciente y de la persona que llama.",
  "Indicar correctamente su dirección.",
  "No apresurarse en cortar la comunicación.",
  "Indique qué le ocurre a la persona a asistir.",
  "Atienda las instrucciones del Radioperador.",
  "Permanezca con el paciente hasta que el médico llegue."
];

const CODES = [
  {
    type: "ROJO",
    color: "bg-red-600",
    icon: <AlertTriangle className="text-red-600" />,
    title: "Emergencias Médicas 24H",
    desc: "Situaciones con riesgo inminente de vida. Máxima prioridad.",
    tel: "(0221) 421-1226 / 421-2234"
  },
  {
    type: "AMARILLO",
    color: "bg-yellow-500",
    icon: <Info className="text-yellow-500" />,
    title: "Urgencias Médicas 24H",
    desc: "Menor prioridad que la emergencia. Situaciones sin riesgo inminente.",
    tel: "(0221) 421-1226 / 421-2234"
  },
  {
    type: "VERDE",
    color: "bg-green-500",
    icon: <CheckCircle2 className="text-green-500" />,
    title: "Visitas Médicas 24H",
    desc: "Atención domiciliaria de patologías menores.",
    tel: "(0221) 483-9781"
  }
];

export function EmergenciesContent() {
  return (
    <div className="bg-white">
      {/* Banner / Hero Emergencias */}
      <section className="pt-32 pb-16 bg-linear-to-b from-primary/5 to-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto bg-primary rounded-4xl p-6 md:p-10 text-white relative overflow-hidden shadow-2xl"
          >
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-3/5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold mb-6">
                  <Phone size={14} className="text-secondary" />
                  TELÉFONO EXCLUSIVO
                </div>
                <h1 className="text-3xl md:text-5xl font-black mb-4">Central de Emergencias</h1>
                <p className="text-white/70 font-medium mb-8">
                  Para afiliados, atención inmediata las 24 horas, los 365 días del año.
                </p>
                <a 
                  href="tel:02214211226"
                  className="inline-flex items-center gap-4 bg-secondary hover:bg-secondary-dark text-white px-8 py-4 rounded-2xl text-2xl font-black transition-all transform hover:scale-105 active:scale-95 shadow-lg"
                >
                  (0221) 421-1226 / 421-2234
                </a>
              </div>
              <div className="w-full md:w-2/5 flex justify-center">
                <div className="relative">
                  <div className="w-32 h-32 bg-white/10 rounded-full animate-pulse absolute -top-4 -right-4" />
                  <div className="w-48 h-48 bg-white/5 rounded-full animate-pulse absolute -bottom-8 -left-8" />
                  <Shield size={160} className="text-white/10 relative z-10" />
                </div>
              </div>
            </div>
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-white/5 to-transparent skew-x-12" />
          </motion.div>
        </div>
      </section>

      {/* Procedimiento */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl font-black text-primary mb-8 flex items-center gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Clock className="text-primary" size={24} />
                </div>
                Cómo proceder ante una Emergencia
              </h2>
              <ul className="space-y-4">
                {CALL_STEPS.map((step, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-surface border border-transparent hover:border-border hover:bg-white transition-all group"
                  >
                    <span className="w-8 h-8 shrink-0 bg-primary text-white rounded-lg flex items-center justify-center font-black text-sm group-hover:bg-secondary transition-colors">
                      {i + 1}
                    </span>
                    <p className="text-primary/70 font-medium pt-1">{step}</p>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="space-y-8">
              <h2 className="text-3xl font-black text-primary mb-8">Códigos de atención</h2>
              {CODES.map((code, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-4xl bg-surface border border-border hover:shadow-premium transition-all"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`px-4 py-1 rounded-full ${code.color} text-white text-xs font-black`}>
                      CÓDIGO {code.type}
                    </div>
                    {code.icon}
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">{code.title}</h3>
                  <p className="text-primary/60 font-medium mb-6">{code.desc}</p>
                  <div className="pt-6 border-t border-border flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-black text-primary/40 uppercase tracking-widest mb-1">Teléfonos alternativos</p>
                      <p className="text-primary font-bold">{code.tel}</p>
                    </div>
                    <a href={`tel:${code.tel.split(' / ')[0].replace(/[^0-9]/g, '')}`} className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-md hover:scale-110 transition-transform active:scale-95">
                      <Phone size={20} className="text-secondary" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ambulancias */}
      <section className="py-24 bg-surface border-y border-border">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-black text-primary mb-4">Nuestra Flota</h2>
          <p className="text-primary/60 max-w-2xl mx-auto font-medium mb-16">
            Contamos con unidades de traslado de Baja Complejidad y Ambulancias UTIM de Alta Complejidad.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/5 rounded-4xl transform -rotate-2 group-hover:rotate-0 transition-transform" />
              <div className="relative bg-white p-8 rounded-4xl border border-border shadow-sm">
                <Truck size={64} className="text-primary mb-6 mx-auto" />
                <h4 className="text-xl font-bold text-primary mb-2">Baja Complejidad</h4>
                <p className="text-primary/60 text-sm font-medium">Unidades equipadas para traslados que no requieren soporte vital avanzado.</p>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-secondary/5 rounded-4xl transform rotate-2 group-hover:rotate-0 transition-transform" />
              <div className="relative bg-white p-8 rounded-4xl border border-border shadow-sm">
                <div className="flex justify-center gap-4 mb-6">
                 <Truck size={64} className="text-secondary" />
                 <div className="w-px h-16 bg-border" />
                 <div className="text-left py-2">
                    <p className="text-[10px] font-black text-secondary">ALTA COMPLEJIDAD</p>
                    <p className="text-xl font-black text-primary not-italic">UTIM</p>
                 </div>
                </div>
                <h4 className="text-xl font-bold text-primary mb-2">Cuidado Intensivo</h4>
                <p className="text-primary/60 text-sm font-medium">Equipamiento médico avanzado y medicación para situaciones críticas.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
