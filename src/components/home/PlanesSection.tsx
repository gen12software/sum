"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/contact";

const PLANS = [
  {
    name: "Básico",
    description: "Emergencias y urgencias esenciales.",
    featured: false,
  },
  {
    name: "Integral",
    description: "La mejor relación costo-beneficio.",
    featured: true,
  },
  {
    name: "Premium",
    description: "Cobertura total a domicilio.",
    featured: false,
  },
];

export function PlanesSection() {
  return (
    <section className="py-10 md:py-16 bg-white">
      <div className="container px-4 md:px-8">
        <div className="text-center mb-10 md:mb-20">
          <h2 className="text-[clamp(3rem,8vw,6rem)] font-black text-primary tracking-tighter leading-none mb-5">
            Planes
          </h2>
          <p className="text-xl text-primary/50 font-medium">
            Cobertura médica de emergencia para toda tu familia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10 md:mb-14">
          {PLANS.map((plan, i) => (
            <div
              key={plan.name}
              className={`relative p-7 md:p-10 rounded-4xl flex flex-col gap-5 ${plan.featured
                  ? "bg-primary text-white shadow-2xl md:scale-[1.04] z-10"
                  : "bg-surface border border-border"
                }`}
            >
              {plan.featured && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary text-white text-[10px] font-black uppercase tracking-widest px-5 py-1.5 rounded-full shadow-lg">
                  Más Elegido
                </span>
              )}

              <h3
                className={`text-3xl font-black tracking-tight ${plan.featured ? "text-white" : "text-primary"
                  }`}
              >
                {plan.name}
              </h3>

              <p
                className={`text-sm font-medium leading-relaxed ${plan.featured ? "text-white/60" : "text-primary/50"
                  }`}
              >
                {plan.description}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
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
            className="flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-2xl font-bold shadow-sm w-full sm:w-auto justify-center"
          >
            Consultar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
