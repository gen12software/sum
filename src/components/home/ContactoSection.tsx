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
    <section className="py-36 bg-primary text-white overflow-hidden relative">
      {/* Subtle bg accent */}
      <div
        aria-hidden
        className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/[0.04] to-transparent pointer-events-none"
      />

      <div className="container px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <h2 className="text-[clamp(3rem,8vw,6rem)] font-black tracking-tighter leading-none mb-5">
            Contacto
          </h2>
          <p className="text-xl text-white/45 font-medium">
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
            className="p-10 bg-secondary rounded-[2rem] flex flex-col items-center text-center gap-5 hover:bg-secondary-dark transition-all group cursor-pointer"
          >
            <PhoneCall
              size={32}
              className="group-hover:scale-110 transition-transform"
            />
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
            className="p-10 bg-white/8 rounded-[2rem] border border-white/10 flex flex-col items-center text-center gap-5 hover:bg-white/14 transition-all group cursor-pointer"
          >
            <MessageCircle
              size={32}
              className="group-hover:scale-110 transition-transform"
            />
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.25em] mb-2 text-white/50">
                WhatsApp
              </div>
              <div className="text-xl font-black">{WHATSAPP_MAIN_DISPLAY}</div>
              <div className="text-xs text-white/40 mt-2">Lun a Vie de 9 a 17 h.</div>
            </div>
          </motion.a>

          {/* Sede */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-10 bg-white/8 rounded-[2rem] border border-white/10 flex flex-col items-center text-center gap-5"
          >
            <MapPin size={32} />
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.25em] mb-2 text-white/50">
                Sede Central
              </div>
              <div className="text-xl font-black">Plaza Italia 183</div>
              <div className="text-xs text-white/40 mt-2">La Plata, Buenos Aires</div>
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
            className="inline-flex items-center gap-2 text-white/50 hover:text-white font-bold text-base transition-colors group"
          >
            Ver más opciones de contacto
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
