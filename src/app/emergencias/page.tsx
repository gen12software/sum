import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EmergenciesContent } from "@/components/home/EmergenciesContent";

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
