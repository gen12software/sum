"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/contact";

const PLANS = [
  {
    name: "Básico",
    description: "Emergencias y urgencias esenciales.",
    highlight: "Código Rojo + Código Amarillo",
    featured: false,
  },
  {
    name: "Integral",
    description: "La mejor relación costo-beneficio.",
    highlight: "Sin copago · Odontología · Red SIEM",
    featured: true,
  },
  {
    name: "Premium",
    description: "Cobertura total a domicilio.",
    highlight: "Enfermería · ECG · Traslados",
    featured: false,
  },
];

export function PlanesSection() {
  return (
    <section className="py-36 bg-white">
      <div className="container px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <h2 className="text-[clamp(3rem,8vw,6rem)] font-black text-primary tracking-tighter leading-none mb-5">
            Planes
          </h2>
          <p className="text-xl text-primary/50 font-medium">
            Cobertura médica de emergencia para toda tu familia.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative p-10 rounded-[2rem] flex flex-col gap-5 transition-all ${
                plan.featured
                  ? "bg-primary text-white shadow-2xl md:scale-[1.04] z-10"
                  : "bg-surface border border-border hover:shadow-premium"
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary text-white text-[10px] font-black uppercase tracking-widest px-5 py-1.5 rounded-full shadow-lg">
                  Más Elegido
                </span>
              )}

              <h3
                className={`text-3xl font-black tracking-tight ${
                  plan.featured ? "text-white" : "text-primary"
                }`}
              >
                {plan.name}
              </h3>

              <p
                className={`text-sm font-medium leading-relaxed ${
                  plan.featured ? "text-white/60" : "text-primary/50"
                }`}
              >
                {plan.description}
              </p>

              <div
                className={`mt-auto pt-5 border-t flex items-start gap-3 ${
                  plan.featured ? "border-white/10" : "border-border"
                }`}
              >
                <Check
                  size={16}
                  className={`shrink-0 mt-0.5 ${plan.featured ? "text-accent" : "text-secondary"}`}
                />
                <span
                  className={`text-sm font-bold ${
                    plan.featured ? "text-white/80" : "text-primary"
                  }`}
                >
                  {plan.highlight}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link
            href="/planes"
            className="flex items-center gap-2 text-primary font-bold text-lg hover:text-secondary transition-colors group"
          >
            Ver todos los planes
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
          <a
            href={WHATSAPP_URL}
            className="flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-2xl font-bold hover:bg-primary-dark transition-all shadow-sm"
          >
            Consultar por WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
