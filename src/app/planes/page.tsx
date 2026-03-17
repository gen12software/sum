import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Pricing } from "@/components/home/Pricing";

export default function PlanesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="grow pt-24">
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
