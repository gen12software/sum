"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";
import { EMERGENCY_PHONE, EMERGENCY_PHONE_DISPLAY, DEPARTMENTS } from "@/lib/contact";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#000d1f] text-white pt-24 pb-12 overflow-hidden relative border-t border-white/5">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand & Mission */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center mb-6">
              <Image
                src="/images/logo_blanco.png"
                alt="SUM Logo"
                width={404}
                height={101}
                className="h-12 w-auto object-contain hover:opacity-80 transition-opacity"
              />
            </Link>
            <p className="text-white/60 font-medium leading-relaxed mb-6">
              Servicio Integral de Medicina Prehospitalaria. Cuidando tu vida con excelencia y compromiso desde 1986.
            </p>
            <div className="flex gap-4">
              <span className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center opacity-40 cursor-default" title="Próximamente">
                <Instagram size={20} />
              </span>
              <span className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center opacity-40 cursor-default" title="Próximamente">
                <Facebook size={20} />
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Institucional</h4>
            <ul className="space-y-4">
              {[
                { name: "Servicios", href: "/servicios" },
                { name: "Planes", href: "/planes" },
                { name: "Emergencias", href: "/emergencias" },
                { name: "Contacto", href: "/contacto" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-white/60 hover:text-white transition-colors font-medium text-sm flex items-center gap-2 group"
                  >
                    <div className="w-1 h-1 bg-secondary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-secondary shrink-0 mt-0.5" />
                <span className="text-white/60 text-sm font-medium">Plaza Italia 183. LA PLATA<br/>Provincia de Buenos Aires</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-secondary shrink-0" />
                <a href={`tel:${DEPARTMENTS[1].tel.replace(/[^0-9]/g, '')}`} className="text-white/60 text-sm font-medium hover:text-white transition-colors">{DEPARTMENTS[1].tel}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-secondary shrink-0" />
                <a href="mailto:infosum@sumsa.com.ar" className="text-white/60 text-sm font-medium hover:text-white transition-colors">infosum@sumsa.com.ar</a>
              </li>
            </ul>
          </div>

          {/* Emergency & Certificates */}
          <div className="space-y-8">
            <div className="p-6 bg-white/10 rounded-2xl border border-white/10">
              <h4 className="text-xs font-black uppercase tracking-widest text-secondary mb-2">EMERGENCIAS 24H</h4>
              <a href={`tel:${EMERGENCY_PHONE}`} className="text-xl font-bold hover:text-secondary transition-colors">{EMERGENCY_PHONE_DISPLAY}</a>
            </div>
            <div className="flex gap-4 items-center">
              <div className="bg-white p-2 rounded-lg w-12 h-12 flex items-center justify-center">
                <span className="text-primary font-black text-[10px] not-italic leading-tight">IRAM</span>
              </div>
              <div className="bg-white p-2 rounded-lg w-12 h-12 flex items-center justify-center">
                <span className="text-primary font-black text-[10px] not-italic leading-tight">IQNET</span>
              </div>
              <div className="bg-white p-2 rounded-lg h-12 flex items-center px-2">
                <span className="text-primary font-black text-[8px] uppercase leading-tight">Data<br/>Fiscal</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/10">
          <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest text-center">
            © {currentYear} SUM S.A. | Todos los derechos reservados.
          </p>
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-white/5 to-transparent pointer-events-none" />
    </footer>
  );
}
