import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Navbar } from "@/components/layout/NavbarWrapper";
import { Footer } from "@/components/layout/Footer";
import { Carrusel } from "@/components/novedades/Carrusel";
import { VideoPlayer } from "@/components/novedades/VideoPlayer";
import { getNovedadPorSlug, getNovedadesPublicadas } from "@/lib/novedades/queries";
import { getExtracto, getImagenesOrdenadas, getPortada } from "@/lib/novedades/types";

type Props = { params: Promise<{ slug: string }> };

/** Prerenderiza las novedades existentes; las nuevas se generan on demand. */
export async function generateStaticParams() {
  const novedades = await getNovedadesPublicadas();
  return novedades.map((novedad) => ({ slug: novedad.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const novedad = await getNovedadPorSlug(slug);

  // El componente responde con notFound(), pero Next devuelve 200 igual cuando
  // la respuesta ya empezó a transmitirse (le pasa lo mismo a servicios/[slug]).
  // El noindex evita que Google tome esa página de error como contenido válido.
  if (!novedad) {
    return { title: "Novedad no encontrada", robots: { index: false, follow: false } };
  }

  const descripcion = getExtracto(novedad.descripcion, 200);
  const portada = getPortada(novedad);

  return {
    title: novedad.titulo,
    description: descripcion,
    alternates: { canonical: `/novedades/${novedad.slug}` },
    openGraph: {
      type: "article",
      title: novedad.titulo,
      description: descripcion,
      url: `/novedades/${novedad.slug}`,
      // Sin imágenes propias se hereda la del sitio, definida en el layout raíz,
      // para que el enlace compartido nunca quede sin previsualización.
      ...(portada
        ? { images: [{ url: portada.url, alt: portada.alt || novedad.titulo }] }
        : {}),
    },
  };
}

export default async function NovedadPage({ params }: Props) {
  const { slug } = await params;
  const novedad = await getNovedadPorSlug(slug);

  if (!novedad) notFound();

  const imagenes = getImagenesOrdenadas(novedad);
  const portada = getPortada(novedad);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="grow">
        <article className="py-16 bg-surface">
          <div className="container max-w-3xl px-8">
            <Link
              href="/novedades"
              className="mb-8 inline-flex items-center gap-1.5 text-sm font-bold text-primary/50 transition-colors hover:text-primary"
            >
              <ArrowLeft size={16} />
              Volver a novedades
            </Link>

            <h1 className="mb-7 text-[clamp(1.875rem,5vw,3rem)] font-black leading-[1.1] tracking-tight text-primary">
              {novedad.titulo}
            </h1>

            {imagenes.length > 0 && (
              // El carrusel dimensiona su caja según las imágenes y las muestra
              // completas, así que no lleva relación de aspecto impuesta desde acá.
              <div className="mb-9">
                <Carrusel imagenes={imagenes} titulo={novedad.titulo} />
              </div>
            )}

            {/* whitespace-pre-line preserva los saltos de línea del panel. El
                contenido se interpola como texto, así que cualquier HTML que
                hayan escrito se muestra literal en lugar de ejecutarse. */}
            <div className="whitespace-pre-line text-lg font-medium leading-relaxed text-primary/70">
              {novedad.descripcion}
            </div>

            {novedad.video_url && novedad.video_orientacion && (
              <div className="mt-10">
                <VideoPlayer
                  src={novedad.video_url}
                  orientacion={novedad.video_orientacion}
                  poster={portada?.url}
                  titulo={novedad.titulo}
                />
              </div>
            )}
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
