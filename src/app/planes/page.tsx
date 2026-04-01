import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Pricing } from "@/components/home/Pricing";

export const metadata: Metadata = {
  title: "Planes y Precios",
  description:
    "Conocé los planes de emergencia médica de SUM. Cobertura para individuos, familias y empresas. Protección premium las 24 hs en La Plata y alrededores.",
  alternates: { canonical: "/planes" },
  openGraph: {
    title: "Planes y Precios | SUM",
    description: "Planes de emergencia médica para individuos, familias y empresas. Atención 24 hs.",
    url: "/planes",
  },
};

export default function PlanesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="grow pt-24">
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
