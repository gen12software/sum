import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ServicesContent } from "@/components/home/ServicesContent";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Conocé todos los servicios médicos de SUM: emergencias, consultas, traslados, guardia virtual y más. Cobertura completa para afiliados en La Plata.",
  alternates: { canonical: "/servicios" },
  openGraph: {
    title: "Servicios | SUM",
    description: "Emergencias, consultas, traslados y guardia virtual. Cobertura completa para afiliados.",
    url: "/servicios",
  },
};

export default function ServiciosPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="grow">
        <ServicesContent />
      </main>
      <Footer />
    </div>
  );
}
