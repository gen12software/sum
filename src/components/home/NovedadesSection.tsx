import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getNovedadesDelInicio } from "@/lib/novedades/queries";
import { NovedadCard } from "@/components/novedades/NovedadCard";

export async function NovedadesSection() {
  // Las elige una por una quien administra el sitio, marcando "Mostrar en el
  // inicio". Antes eran las tres últimas publicadas, sin curaduría posible.
  const novedades = await getNovedadesDelInicio();

  // Sin novedades marcadas, la sección no aparece: mejor eso que un bloque
  // vacío en el home.
  if (!novedades.length) return null;

  return (
    <section className="py-16">
      <div className="container px-8">
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-secondary">
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            Al día
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
          </span>
          <h2 className="mt-4 text-[clamp(2.25rem,5vw,3.5rem)] font-black leading-[1.05] tracking-tight text-primary">
            Novedades
          </h2>
          <p className="mt-4 text-lg font-medium text-primary/50">
            Lo último que pasa en SUM.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {novedades.map((novedad) => (
            <NovedadCard key={novedad.id} novedad={novedad} />
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/novedades"
            className="inline-flex items-center gap-2 text-primary font-bold text-lg hover:text-secondary transition-colors group"
          >
            Ver todas las novedades
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
