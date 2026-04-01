import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WorkWithUsContent } from "@/components/home/WorkWithUsContent";

export const metadata: Metadata = {
  title: "Trabajá en SUM",
  description:
    "Sumate al equipo de SUM. Buscamos profesionales médicos, paramédicos y personal administrativo comprometidos con la salud en La Plata.",
  alternates: { canonical: "/contacto/trabaja" },
  openGraph: {
    title: "Trabajá en SUM",
    description: "Sumate al equipo de SUM. Oportunidades para profesionales de la salud en La Plata.",
    url: "/contacto/trabaja",
  },
};

export default function TrabajaEnSumPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="grow">
        <WorkWithUsContent />
      </main>
      <Footer />
    </div>
  );
}
