import Link from "next/link";
import { Home, PhoneCall } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EMERGENCY_PHONE, EMERGENCY_PHONE_DISPLAY } from "@/lib/contact";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="grow flex items-center justify-center px-4 py-32">
        <div className="text-center max-w-lg">
          <div className="mb-4 leading-none select-none">
            <span className="text-[10rem] font-black text-primary/10">404</span>
          </div>
          <h1 className="text-4xl font-black text-primary uppercase tracking-tighter mb-4">
            Página no <span className="text-secondary">encontrada</span>
          </h1>
          <p className="text-primary/60 font-medium mb-10 leading-relaxed">
            La página que buscás no existe o fue movida. Si necesitás asistencia médica urgente, llamá directamente a emergencias.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-2xl font-bold hover:bg-primary-dark transition-all shadow-lg"
            >
              <Home size={20} />
              Volver al Inicio
            </Link>
            <a
              href={`tel:${EMERGENCY_PHONE}`}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-secondary text-white rounded-2xl font-bold hover:bg-secondary-dark transition-all shadow-lg"
            >
              <PhoneCall size={20} />
              {EMERGENCY_PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
