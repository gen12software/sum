import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/home/Hero";
import { PlanesSection } from "@/components/home/PlanesSection";
import { ServiciosSection } from "@/components/home/ServiciosSection";
import { ContactoSection } from "@/components/home/ContactoSection";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="grow">
        <Hero />
        <PlanesSection />
        <ServiciosSection />
        <ContactoSection />
      </main>
      <Footer />
    </div>
  );
}
