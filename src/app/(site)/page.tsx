import { Navbar } from "@/components/layout/NavbarWrapper";
import { Hero } from "@/components/home/Hero";
import { PlanesSection } from "@/components/home/PlanesSection";
import { ServiciosSection } from "@/components/home/ServiciosSection";
import { NovedadesSection } from "@/components/home/NovedadesSection";
import { ContactoSection } from "@/components/home/ContactoSection";
import { PopupAviso } from "@/components/home/PopupAviso";
import { getPopupActivo } from "@/lib/popup/queries";
import { getHeroImagenes } from "@/lib/hero/queries";
import { Footer } from "@/components/layout/Footer";

export default async function Home() {
  // El aviso emergente vive solo acá: montarlo en el layout lo haría aparecer
  // en todo el sitio. Viaja embebido en la página estática, así que el
  // componente de cliente no necesita consultar nada.
  //
  // Las imágenes del carrusel viajan embebidas en la página estática, así que
  // el componente de cliente tampoco consulta nada. Si vienen vacías, el
  // carrusel usa el respaldo incluido en el proyecto.
  const [popup, heroImagenes] = await Promise.all([getPopupActivo(), getHeroImagenes()]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="grow">
        <Hero imagenes={heroImagenes} />
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
