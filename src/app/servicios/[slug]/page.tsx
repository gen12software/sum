import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/layout/NavbarWrapper";
import { Footer } from "@/components/layout/Footer";

const SERVICE_FLYERS: Record<string, { title: string; intro: string }> = {
  "acompanamiento-terapeutico": {
    title: "Acompañamiento Terapéutico",
    intro:
      "Acompañamiento domiciliario personalizado con diferentes niveles de asistencia según el estado de salud y requerimientos de cada persona.",
  },
  "enfermero-en-casa": {
    title: "Enfermero en Casa",
    intro:
      "La atención integral que necesita. Un sólo profesional para acompañar, cuidar y brindar atención de enfermería.",
  },
  "cuidador-en-domicilio": {
    title: "Cuidador en Domicilio",
    intro: "Acompañamiento, cuidado y tranquilidad para cada día.",
  },
};

export function generateStaticParams() {
  return Object.keys(SERVICE_FLYERS).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const flyer = SERVICE_FLYERS[slug];
  if (!flyer) return { title: "Servicio | SUM" };
  return {
    title: `${flyer.title} | SUM`,
    description: flyer.intro,
    alternates: { canonical: `/servicios/${slug}` },
    openGraph: {
      title: `${flyer.title} | SUM`,
      description: flyer.intro,
      url: `/servicios/${slug}`,
    },
  };
}

export default async function ServicioFlyerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const flyer = SERVICE_FLYERS[slug];

  if (!flyer) notFound();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="grow">
        <section className="bg-white min-h-screen">
          <div className="pt-24 pb-6 bg-linear-to-b from-primary/5 to-white border-b border-border/50">
            <div className="container px-4 md:px-8">
              <Link
                href="/servicios"
                className="inline-flex items-center gap-2 text-xs font-black text-primary/60 hover:text-secondary transition-colors mb-4 uppercase tracking-widest"
              >
                <ArrowLeft size={14} />
                Volver a Servicios
              </Link>
              <p className="text-[10px] font-black text-secondary uppercase tracking-widest mb-2">
                Cuidados Domiciliarios
              </p>
              <h1 className="text-3xl md:text-5xl font-black text-primary mb-4 uppercase tracking-tighter leading-[0.9]">
                {flyer.title}
              </h1>
              <p className="text-base text-primary/70 font-medium leading-relaxed max-w-2xl">
                {flyer.intro}
              </p>
            </div>
          </div>

          <div className="container px-4 md:px-8 py-12 md:py-16">
            <div className="max-w-2xl bg-surface rounded-3xl border border-dashed border-primary/20 p-8 md:p-12">
              <p className="text-[10px] font-black text-secondary uppercase tracking-widest mb-2">
                Información detallada
              </p>
              <h2 className="text-2xl font-black text-primary mb-3">
                Contenido próximamente
              </h2>
              <p className="text-primary/60 text-sm font-medium leading-relaxed">
                Estamos preparando la descripción completa de este servicio. Muy
                pronto vas a encontrar acá todos los detalles del flyer.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
