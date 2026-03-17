import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ServicesContent } from "@/components/home/ServicesContent";

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
