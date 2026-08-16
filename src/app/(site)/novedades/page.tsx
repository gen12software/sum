import type { Metadata } from "next";
import { Newspaper } from "lucide-react";

import { Navbar } from "@/components/layout/NavbarWrapper";
import { Footer } from "@/components/layout/Footer";
import { NovedadCard } from "@/components/novedades/NovedadCard";
import { getNovedadesPublicadas } from "@/lib/novedades/queries";

export const metadata: Metadata = {
  title: "Novedades",
  description:
    "Novedades y noticias de SUM: nuevos servicios, cobertura, campañas y todo lo que pasa en la empresa.",
  alternates: { canonical: "/novedades" },
  openGraph: {
    title: "Novedades | SUM",
    description: "Novedades y noticias de SUM.",
    url: "/novedades",
  },
};

export default async function NovedadesPage() {
  const novedades = await getNovedadesPublicadas();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="grow">
        <section className="py-16 bg-surface">
          <div className="container px-8">
            {/* El encabezado se apoya en el rótulo y la regla de acento, no en
                un tamaño desmedido: antes el título ocupaba la pantalla entera
                en el celular y empujaba las novedades fuera de la vista. */}
            <div className="mb-12 max-w-2xl">
              <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-secondary">
                <span className="h-px w-8 bg-accent" aria-hidden="true" />
                Al día
              </span>
              <h1 className="mt-4 text-[clamp(2.25rem,5vw,3.5rem)] font-black leading-[1.05] tracking-tight text-primary">
                Novedades
              </h1>
              <p className="mt-4 text-lg font-medium leading-relaxed text-primary/50">
                Todo lo que pasa en SUM, de primera mano.
              </p>
            </div>

            {novedades.length > 0 ? (
              // Todas las tarjetas iguales: destacar la primera hacía que el
              // listado se viera distinto según cuántas novedades hubiera.
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {novedades.map((novedad, index) => (
                  <NovedadCard key={novedad.id} novedad={novedad} priority={index < 3} />
                ))}
              </div>
            ) : (
              <div className="mx-auto max-w-md rounded-4xl border border-border bg-white px-8 py-16 text-center">
                <Newspaper size={34} className="mx-auto mb-4 text-primary/20" />
                <h2 className="text-xl font-black tracking-tight text-primary">
                  Todavía no hay novedades
                </h2>
                <p className="mt-2 text-sm font-medium leading-relaxed text-primary/50">
                  Estamos preparando las primeras. Volvé en unos días para enterarte de todo.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
