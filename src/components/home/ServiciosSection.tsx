"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HeartPulse, Stethoscope, Baby, Building2, ArrowRight } from "lucide-react";

const SERVICES = [
  {
    Icon: HeartPulse,
    title: "Emergencias 24/7",
    desc: "Respuesta inmediata ante cualquier emergencia médica, los 365 días del año.",
  },
  {
    Icon: Stethoscope,
    title: "Médicos a Domicilio",
    desc: "Visitas programadas, urgencias y telemedicina cuando lo necesités.",
  },
  {
    Icon: Baby,
    title: "SUM Infantil",
    desc: "Unidades UTIM especializadas para neonatos y niños de alto riesgo.",
  },
  {
    Icon: Building2,
    title: "PyMEs y Empresas",
    desc: "Áreas protegidas, medicina laboral y capacitaciones in-company.",
  },
];

export function ServiciosSection() {
  return (
    <section className="py-36 bg-surface">
      <div className="container px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <h2 className="text-[clamp(3rem,8vw,6rem)] font-black text-primary tracking-tighter leading-none mb-5">
            Servicios
          </h2>
          <p className="text-xl text-primary/50 font-medium">
            Cobertura médica integral prehospitalaria desde 1986.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-14">
          {SERVICES.map(({ Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="p-10 bg-white rounded-[2rem] border border-border hover:shadow-premium transition-all group"
            >
              <div className="mb-6 text-secondary group-hover:scale-110 transition-transform inline-block">
                <Icon size={34} />
              </div>
              <h3 className="text-2xl font-black text-primary mb-3 tracking-tight">
                {title}
              </h3>
              <p className="text-primary/55 font-medium leading-relaxed text-sm">
                {desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <Link
            href="/servicios"
            className="inline-flex items-center gap-2 text-primary font-bold text-lg hover:text-secondary transition-colors group"
          >
            Ver todos los servicios
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
