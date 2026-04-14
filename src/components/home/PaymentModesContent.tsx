"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  Smartphone,
  Mail,
  PhoneCall,
  CheckCircle2,
  AlertCircle,
  Clock,
  Building
} from "lucide-react";
import { DEPARTMENTS, QUICK_WHATSAPP } from "@/lib/contact";

const DATA_NEEDED = [
  "Apellido y nombre del/los afiliados",
  "DNI del/los afiliado/s",
  "Tipo de Tarjeta (VISA Crédito o Electrón) + 16 dígitos + vencimiento + banco",
  "CBU (22 dígitos), Banco y Titular (si es cuenta bancaria)"
];

const CONTACTS = [
  { name: "Administración", tel: DEPARTMENTS[1].tel, email: DEPARTMENTS[1].email, hours: DEPARTMENTS[1].hours },
  { name: "Departamento Cobranzas", tel: DEPARTMENTS[2].tel, email: DEPARTMENTS[2].email, hours: DEPARTMENTS[2].hours },
  { name: "Informar Pago (WhatsApp)", tel: QUICK_WHATSAPP[0].number, hours: QUICK_WHATSAPP[0].hours },
  { name: "Pedir Factura (WhatsApp)", tel: QUICK_WHATSAPP[1].number, hours: QUICK_WHATSAPP[1].hours },
];

export function PaymentModesContent() {
  return (
    <section className="bg-white min-h-screen">
      {/* Header */}
      <div className="pt-40 pb-20 bg-linear-to-b from-primary/5 to-white border-b border-border/50">
        <div className="container px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-7xl font-black text-primary mb-6 uppercase tracking-tighter">
              Modos de <span className="text-secondary">Pago</span>
            </h1>
            <p className="text-xl text-primary/70 max-w-2xl mx-auto font-medium">
              Simplificá tu gestión adhiriéndote al sistema de débito automático y ahorrá tiempo mensualmente.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container px-8 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Payment Section */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Automatic Debit Section */}
            <div className="bg-primary rounded-5xl p-10 text-white relative overflow-hidden shadow-2xl">
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-secondary rounded-2xl flex items-center justify-center shadow-lg">
                    <CreditCard size={28} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black uppercase tracking-tight not-italic">Adhesión al Débito Automático</h2>
                    <p className="text-white/60 font-medium">Gestioná tu pago de forma cómoda y segura (VISA o CBU).</p>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-6 text-secondary">
                    <Mail size={20} />
                    <span className="text-sm font-black uppercase tracking-widest">Procedimiento por Mail</span>
                  </div>
                  <p className="text-white/80 font-medium leading-relaxed mb-6 not-italic">
                    Para adherirte, enviá un correo electrónico a <strong>computos@sumsa.com.ar</strong> con el asunto: <strong>&quot;Solicitud Adhesión Débito Automático&quot;</strong>.
                  </p>
                  
                  <div className="space-y-4">
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Datos Necesarios en el cuerpo del mail:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {DATA_NEEDED.map((data, i) => (
                        <div key={i} className="flex items-start gap-3 text-xs font-bold text-white/70">
                          <CheckCircle2 size={14} className="text-secondary shrink-0 mt-0.5" />
                          {data}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-6 bg-secondary/20 rounded-2xl border border-secondary/20">
                   <AlertCircle size={20} className="text-secondary" />
                   <p className="text-xs font-bold not-italic leading-relaxed">
                      Recordá que podés gestionar esta adhesión en cualquier momento del mes. Impactará en la próxima liquidación de tu cuota.
                   </p>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-white/5 to-transparent pointer-events-none" />
            </div>

            {/* Quick Inform Pay (WhatsApp Focus) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="p-8 bg-surface rounded-4xl border border-border group hover:border-secondary/20 transition-all">
                  <Smartphone className="text-secondary mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold text-primary mb-2">Informar un Pago</h3>
                  <p className="text-primary/60 text-sm font-medium mb-6">Si realizaste una transferencia, envianos el comprobante directamente por WhatsApp.</p>
                  <div className="flex flex-col gap-2">
                     <a href={`https://wa.me/${QUICK_WHATSAPP[0].number.replace(/[^0-9]/g, '')}`} className="text-secondary font-black text-lg">{QUICK_WHATSAPP[0].number}</a>
                     <span className="text-[10px] font-black text-primary/30 uppercase tracking-widest">{QUICK_WHATSAPP[0].hours}</span>
                  </div>
               </div>
               <div className="p-8 bg-surface rounded-4xl border border-border group hover:border-secondary/20 transition-all">
                  <Smartphone className="text-secondary mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold text-primary mb-2">Pedir Factura</h3>
                  <p className="text-primary/60 text-sm font-medium mb-6">Solicitá tu factura mensual de forma digital para tu control personal o de empresa.</p>
                  <div className="flex flex-col gap-2">
                     <a href={`https://wa.me/${QUICK_WHATSAPP[1].number.replace(/[^0-9]/g, '')}`} className="text-secondary font-black text-lg">{QUICK_WHATSAPP[1].number}</a>
                     <span className="text-[10px] font-black text-primary/30 uppercase tracking-widest">{QUICK_WHATSAPP[1].hours}</span>
                  </div>
               </div>
            </div>

          </div>

          {/* Contacts Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-surface rounded-4xl p-8 border border-border shadow-soft h-full">
              <div className="flex items-center gap-3 mb-8">
                <Building className="text-primary" />
                <h3 className="text-xl font-black text-primary uppercase not-italic">Gestión Administrativa</h3>
              </div>
              
              <div className="space-y-10">
                {CONTACTS.map((contact, i) => (
                  <div key={i} className="space-y-3 pb-8 border-b border-border last:border-0 last:pb-0">
                    <h4 className="text-xs font-black text-primary/40 uppercase tracking-widest">{contact.name}</h4>
                    <div className="flex items-center gap-3 text-lg font-bold text-primary">
                      <PhoneCall size={18} className="text-secondary" />
                      {contact.tel && <a href={`tel:${contact.tel.replace(/[^0-9]/g, '')}`} className="hover:text-secondary transition-colors not-italic">{contact.tel}</a>}
                    </div>
                    {contact.email && (
                      <div className="flex items-center gap-3 text-sm font-bold text-primary/60">
                        <Mail size={16} className="text-primary/30" />
                        <a href={`mailto:${contact.email}`} className="hover:text-secondary transition-colors underline decoration-secondary/20 underline-offset-4">{contact.email}</a>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-[10px] font-black text-primary/30 uppercase tracking-tight">
                       <Clock size={12} />
                       {contact.hours}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
