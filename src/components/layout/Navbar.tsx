"use client";

import { useState, useEffect } from "react";
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

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Only the homepage has a dark hero — all other pages have light backgrounds
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Transparent over dark hero (home, not scrolled) → white text
  // Everything else → dark text
  const isDark = isHome && !isScrolled;

  const linkColor = isDark
    ? "text-white/80 hover:text-white"
    : "text-primary hover:text-secondary";

  const mobileToggleColor = isDark ? "text-white" : "text-primary";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isDark ? "py-6 bg-transparent" : "py-3 glass shadow-premium"
      }`}
    >
      <div className="container px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src={isDark ? "/images/logo_blanco.png" : "/images/logo_celeste.png"}
              alt="SUM Logo"
              width={404}
              height={101}
              className="h-12 w-auto object-contain transition-all duration-300 hover:opacity-80"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
              <div key={link.name} className="relative group">
                <Link
                  href={link.href}
                  className={`text-sm font-bold transition-colors duration-300 py-2 ${
                    isActive
                      ? isDark ? "text-white" : "text-secondary"
                      : linkColor
                  }`}
                >
                  {link.name}
                </Link>
                <span className={`absolute bottom-0 left-0 h-0.5 bg-secondary transition-all ${
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              </div>
            )})}
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
            className={`md:hidden p-2 transition-colors duration-300 ${mobileToggleColor}`}
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
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-lg font-black uppercase tracking-tight transition-colors ${
                    pathname === link.href ? "text-secondary" : "text-primary hover:text-secondary"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
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
