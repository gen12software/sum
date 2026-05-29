"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, PhoneCall } from "lucide-react";
import { EMERGENCY_PHONE } from "@/lib/contact";

const NAV_LINKS = [
  { name: "Inicio", href: "/" },
  { name: "Emergencias", href: "/emergencias" },
  { name: "Planes", href: "/planes" },
  { name: "Servicios", href: "/servicios" },
  { name: "Contacto", href: "/contacto" },
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
              return (
                <div key={link.name} className="relative group">
                  <Link
                    href={link.href}
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
              className="flex items-center justify-center w-11 h-11 rounded-full bg-secondary text-white hover:bg-secondary-dark transition-all shadow-md animate-pulse"
            >
              <PhoneCall size={20} />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-white transition-colors duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-primary border-t border-white/10 mt-3 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-lg font-black uppercase tracking-tight transition-colors ${
                    pathname === link.href ? "text-white" : "text-white/70 hover:text-white"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-white/10" />
              <a
                href={`tel:${EMERGENCY_PHONE}`}
                className="flex items-center justify-center gap-2 w-full py-4 rounded-xl border-2 border-secondary text-secondary font-bold"
              >
                <PhoneCall size={20} />
                Llamar a Emergencias
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export { NavbarInner as NavbarClient };
