import { Navbar } from "@/components/layout/NavbarWrapper";
import { Hero } from "@/components/home/Hero";
import { PlanesSection } from "@/components/home/PlanesSection";
import { ServiciosSection } from "@/components/home/ServiciosSection";
import { NovedadesSection } from "@/components/home/NovedadesSection";
import { ContactoSection } from "@/components/home/ContactoSection";
import { PopupAviso } from "@/components/home/PopupAviso";
import { getPopupActivo } from "@/lib/popup/queries";
import { Footer } from "@/components/layout/Footer";

export default async function Home() {
  // El aviso emergente vive solo acá: montarlo en el layout lo haría aparecer
  // en todo el sitio. Viaja embebido en la página estática, así que el
  // componente de cliente no necesita consultar nada.
  const popup = await getPopupActivo();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="grow">
        <Hero />
        <PlanesSection />
        <ServiciosSection />
        <NovedadesSection />
        <ContactoSection />
      </main>
      <Footer />
      {popup && <PopupAviso popup={popup} />}
    </div>
  );
}
