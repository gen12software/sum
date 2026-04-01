import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PaymentModesContent } from "@/components/home/PaymentModesContent";

export const metadata: Metadata = {
  title: "Modos de Pago",
  description:
    "Conocé todas las formas de pago disponibles en SUM: débito automático, tarjeta, transferencia bancaria y más. Mantenete al día con tu cobertura.",
  alternates: { canonical: "/contacto/pagos" },
  openGraph: {
    title: "Modos de Pago | SUM",
    description: "Débito automático, tarjeta, transferencia y más. Todas las formas de pago de SUM.",
    url: "/contacto/pagos",
  },
};

export default function ModosDePagoPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="grow">
        <PaymentModesContent />
      </main>
      <Footer />
    </div>
  );
}
