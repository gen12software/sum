import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactContent } from "@/components/home/ContactContent";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contactate con SUM. Atención al socio, administración, cobranzas y gestión rápida por WhatsApp. Estamos en Plaza Italia 183, La Plata.",
  alternates: { canonical: "/contacto" },
  openGraph: {
    title: "Contacto | SUM",
    description: "Contactate con SUM por teléfono, email o WhatsApp. Atención Lun a Vie de 9:00 a 16:00 h.",
    url: "/contacto",
  },
};

export default function ContactoPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="grow">
        <ContactContent />
      </main>
      <Footer />
    </div>
  );
}
