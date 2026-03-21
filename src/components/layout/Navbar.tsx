"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, PhoneCall, ChevronDown } from "lucide-react";
import { EMERGENCY_PHONE } from "@/lib/contact";

const NAV_LINKS = [
  { name: "Inicio", href: "/" },
  { name: "Empresa", href: "/#empresa" },
  { name: "Emergencias", href: "/emergencias" },
  { name: "Planes", href: "/planes" },
  { 
    name: "Servicios", 
    href: "/servicios",
    submenu: [
      { name: "Todos los Servicios", href: "/servicios" },
      { name: "Cursos y Capacitación", href: "/servicios/cursos" },
    ]
  },
  { 
    name: "Contacto", 
    href: "/contacto",
    submenu: [
      { name: "Contacto General", href: "/contacto" },
      { name: "Trabajá en SUM", href: "/contacto/trabaja" },
      { name: "Modos de Pago", href: "/contacto/pagos" },
    ]
  },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-3 glass shadow-premium" : "py-6 bg-transparent"
      }`}
    >
      <div className="container px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center shadow-lg transform transition-transform hover:scale-110">
              <span className="text-white font-black text-xl italic leading-none">S</span>
            </div>
            <span className="text-2xl font-black tracking-tighter text-primary">
              SUM
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <div key={link.name} className="relative group">
                <Link
                  href={link.href}
                  className="text-sm font-bold text-primary hover:text-secondary transition-colors flex items-center gap-1 py-2"
                >
                  {link.name}
                  {link.submenu && <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />}
                </Link>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all group-hover:w-full" />
                
                {link.submenu && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-premium border border-border py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top scale-95 group-hover:scale-100">
                    {link.submenu.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        className="block px-4 py-2 text-sm font-bold text-primary hover:bg-surface hover:text-secondary transition-colors"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
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
            className="md:hidden p-2 text-primary"
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
            className="md:hidden glass border-t border-border mt-3 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              {NAV_LINKS.map((link) => (
                <div key={link.name} className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <Link
                      href={link.href}
                      className="text-lg font-black text-primary uppercase tracking-tight"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </div>
                  {link.submenu && (
                    <div className="flex flex-col gap-3 pl-4 border-l-2 border-secondary/20">
                      {link.submenu.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className="text-sm font-bold text-primary/60 hover:text-secondary transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="h-px bg-border" />
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
