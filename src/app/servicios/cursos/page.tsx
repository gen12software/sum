import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CursosContent } from "@/components/home/CursosContent";

export default function CursosPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="grow">
        <CursosContent />
      </main>
      <Footer />
    </div>
  );
}
