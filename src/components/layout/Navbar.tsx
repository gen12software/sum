"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, PhoneCall } from "lucide-react";
import { EMERGENCY_PHONE } from "@/lib/contact";

/**
 * `destacado` marca el ítem que debe resaltarse sobre el resto. Es una marca en
 * los datos y no un caso especial por href, así el render sigue siendo genérico
 * y el énfasis puede moverse a otra sección sin tocar el componente.
 */
const NAV_LINKS: { name: string; href: string; destacado?: boolean }[] = [
  { name: "Inicio", href: "/" },
  { name: "Emergencias", href: "/emergencias" },
  { name: "Planes", href: "/planes" },
  { name: "Servicios", href: "/servicios" },
  { name: "Contacto", href: "/contacto" },
  // Va al final para quedar entre Contacto y el botón de Emergencias, que es
  // la acción crítica del sitio. El realce usa el acento de marca —no rojo—
  // para destacarse sin competir con ese botón.
  { name: "Novedades", href: "/novedades", destacado: true },
];

function NavbarInner() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary py-3 shadow-md font-heading">
      <div className="container px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/nuevoLogoBlanco.png"
              alt="SUM Logo"
              width={1054}
              height={249}
              className="h-10 w-auto object-contain hover:opacity-80 transition-opacity duration-300"
              priority
            />
          </Link>

          {/* Desktop Navigation — centrado absoluto */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;

              if (link.destacado) {
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-bold ring-1 transition-all duration-300 ${
                      isActive
                        ? "bg-accent text-white ring-accent"
                        : "bg-accent/15 text-white ring-accent/60 hover:bg-accent/30"
                    }`}
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-accent ring-2 ring-white/70"
                      aria-hidden="true"
                    />
                    {link.name}
                  </Link>
                );
              }

              return (
                <div key={link.name} className="relative group">
                  <Link
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`text-sm font-bold transition-colors duration-300 py-2 ${
                      isActive ? "text-white" : "text-white/70 hover:text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-secondary transition-all ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`} />
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={`tel:${EMERGENCY_PHONE}`}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary text-white font-bold text-sm hover:bg-secondary-dark transition-all shadow-md animate-pulse"
            >
              <PhoneCall size={16} />
              Emergencias
            </a>
          </div>

          {/* Mobile: emergency button + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <a
              href={`tel:${EMERGENCY_PHONE}`}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-secondary text-white font-bold text-xs"
              aria-label="Llamar a emergencias"
            >
              <PhoneCall size={14} />
              <span>Emergencias</span>
            </a>
            <button
              className="p-2 text-white transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menú"
            >
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-primary border-t border-white/10 mt-3 overflow-hidden transition-all duration-200 ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col px-6 py-4 gap-5">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;

            if (link.destacado) {
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-lg font-black uppercase tracking-tight ring-1 transition-colors ${
                    isActive
                      ? "bg-accent text-white ring-accent"
                      : "bg-accent/15 text-white ring-accent/60"
                  }`}
                >
                  <span
                    className="h-2 w-2 rounded-full bg-accent ring-2 ring-white/70"
                    aria-hidden="true"
                  />
                  {link.name}
                </Link>
              );
            }

            return (
              <Link
                key={link.name}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`text-lg font-black uppercase tracking-tight transition-colors ${
                  isActive ? "text-white" : "text-white/70"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export { NavbarInner as NavbarClient };
