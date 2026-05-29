"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { PhoneCall, MessageCircle, MapPin, ArrowRight } from "lucide-react";
import {
  EMERGENCY_PHONE,
  EMERGENCY_PHONE_DISPLAY,
  WHATSAPP_URL,
  WHATSAPP_MAIN_DISPLAY,
} from "@/lib/contact";

export function ContactoSection() {
  return (
    <section className="py-16 bg-surface overflow-hidden relative">
      <div className="container px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <h2 className="text-[clamp(3rem,8vw,6rem)] font-black tracking-tighter leading-none mb-5 text-primary">
            Contacto
          </h2>
          <p className="text-xl text-primary/50 font-medium">
            Estamos disponibles para todo lo que necesités.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {/* Emergencias */}
          <motion.a
            href={`tel:${EMERGENCY_PHONE}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-10 bg-secondary text-white rounded-4xl flex flex-col items-center text-center gap-5 hover:bg-secondary-dark transition-all group cursor-pointer"
          >
            <PhoneCall size={32} className="group-hover:scale-110 transition-transform" />
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.25em] mb-2 text-white/70">
                Emergencias 24H
              </div>
              <div className="text-2xl font-black">{EMERGENCY_PHONE_DISPLAY}</div>
            </div>
          </motion.a>

          {/* WhatsApp */}
          <motion.a
            href={WHATSAPP_URL}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="p-10 bg-white rounded-4xl border border-border flex flex-col items-center text-center gap-5 hover:shadow-premium transition-all group cursor-pointer"
          >
            <MessageCircle size={32} className="text-secondary group-hover:scale-110 transition-transform" />
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.25em] mb-2 text-primary/40">
                WhatsApp
              </div>
              <div className="text-xl font-black text-primary">{WHATSAPP_MAIN_DISPLAY}</div>
              <div className="text-xs text-primary/40 mt-2">Lun a Vie de 9:00 a 16:00 h.</div>
            </div>
          </motion.a>

          {/* Sede */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-10 bg-white rounded-4xl border border-border flex flex-col items-center text-center gap-5"
          >
            <MapPin size={32} className="text-secondary" />
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.25em] mb-2 text-primary/40">
                Sede Central
              </div>
              <div className="text-xl font-black text-primary">Plaza Italia 183</div>
              <div className="text-xs text-primary/40 mt-2">La Plata, Buenos Aires</div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
          className="text-center"
        >
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 text-primary/50 hover:text-primary font-bold text-base transition-colors group"
          >
            Ver más opciones de contacto
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
