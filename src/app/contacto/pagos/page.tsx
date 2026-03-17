import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PaymentModesContent } from "@/components/home/PaymentModesContent";

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
