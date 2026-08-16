"use client";

import { motion } from "framer-motion";
import { Video, Clock, ExternalLink, Stethoscope } from "lucide-react";

const PORTAL_URL = "https://sum.itconsultsa.com/login";

const PUNTOS = [
  {
    Icon: Stethoscope,
    title: "Consulta con un médico",
    desc: "Atención de patologías leves (Código Verde) sin salir de casa.",
  },
  {
    Icon: Clock,
    title: "Sin esperas",
    desc: "Respuesta inmediata, sin turno previo ni traslados.",
  },
];

/**
 * Telemedicina en el inicio: el servicio estaba sólo dentro del detalle de
 * /servicios y el cliente pidió darle presencia en la página principal.
 */
export function TelemedicinaSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-4xl bg-primary px-8 py-12 md:px-14 md:py-16 text-white shadow-premium"
        >
          {/* Fondo decorativo */}
          <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/5" />
          <div className="pointer-events-none absolute -bottom-16 -left-10 h-64 w-64 rounded-full bg-secondary/10" />

          <div className="relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold">
                <Video size={14} className="text-secondary" />
                TELEMEDICINA
              </div>
              <h2 className="mb-4 text-[clamp(2.25rem,6vw,3.75rem)] font-black leading-none tracking-tighter">
                Un médico,
                <br />
                sin salir de casa
              </h2>
              <p className="mb-8 max-w-md font-medium leading-relaxed text-white/70">
                Consultas médicas telefónicas inmediatas para patologías leves. Incluido en
                todos los planes.
              </p>
              <a
                href={PORTAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-secondary px-8 py-4 text-base font-black text-white shadow-lg transition-all hover:bg-secondary-dark active:scale-95 sm:w-auto"
              >
                Acceder al servicio
                <ExternalLink size={18} />
              </a>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {PUNTOS.map(({ Icon, title, desc }) => (
                <div
                  key={title}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6"
                >
                  <Icon size={26} className="mb-4 text-secondary" />
                  <h3 className="mb-1.5 text-lg font-black tracking-tight">{title}</h3>
                  <p className="text-sm font-medium leading-relaxed text-white/60">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
