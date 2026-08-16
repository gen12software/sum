import type { Metadata } from "next";
import { Navbar } from "@/components/layout/NavbarWrapper";
import { Footer } from "@/components/layout/Footer";
import { EmergenciesContent } from "@/components/home/EmergenciesContent";
import { EMERGENCY_PHONES_DISPLAY } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Emergencias",
  description:
    `Servicio de emergencias médicas 24 hs de SUM. Ambulancias equipadas y médicos especializados listos para atenderte. Llamá al ${EMERGENCY_PHONES_DISPLAY}.`,
  alternates: { canonical: "/emergencias" },
  openGraph: {
    title: "Emergencias | SUM",
    description: `Emergencias médicas 24 hs. Ambulancias equipadas. Llamá al ${EMERGENCY_PHONES_DISPLAY}.`,
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
