import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EmergenciesContent } from "@/components/home/EmergenciesContent";

export const metadata: Metadata = {
  title: "Emergencias",
  description:
    "Servicio de emergencias médicas 24 hs de SUM. Ambulancias equipadas y médicos especializados listos para atenderte. Llamá al (0221) 421-1226 / 421-2234.",
  alternates: { canonical: "/emergencias" },
  openGraph: {
    title: "Emergencias | SUM",
    description: "Emergencias médicas 24 hs. Ambulancias equipadas. Llamá al (0221) 421-1226 / 421-2234.",
    url: "/emergencias",
  },
};

export default function EmergenciasPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="grow">
        <EmergenciesContent />
      </main>
      <Footer />
    </div>
  );
}
