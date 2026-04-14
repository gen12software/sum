"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Instagram, Facebook, ExternalLink } from "lucide-react";
import { EMERGENCY_PHONE, EMERGENCY_PHONE_DISPLAY, DEPARTMENTS, WHATSAPP_MAIN } from "@/lib/contact";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#004d8a] text-white overflow-hidden relative border-t border-white/10">

      {/* Main footer */}
      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">

          {/* Brand */}
          <div className="md:col-span-3">
            <Link href="/" className="flex items-center mb-5">
              <Image
                src="/images/nuevoLogoBlanco.png"
                alt="SUM Logo"
                width={1054}
                height={249}
                className="h-12 w-auto object-contain hover:opacity-80 transition-opacity"
              />
            </Link>
            <div className="flex gap-3 mt-2">
              <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/90 text-xs font-bold cursor-default">
                <Instagram size={14} /> Seguinos
              </span>
              <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/90 text-xs font-bold cursor-default">
                <Facebook size={14} /> Seguinos
              </span>
            </div>
          </div>

          {/* Nav */}
          <div className="md:col-span-2 md:col-start-5">
            <h4 className="text-xs font-black uppercase tracking-widest text-white/80 mb-5">Secciones</h4>
            <ul className="space-y-3">
              {[
                { name: "Inicio", href: "/" },
                { name: "Servicios", href: "/servicios" },
                { name: "Planes", href: "/planes" },
                { name: "Emergencias", href: "/emergencias" },
                { name: "Contacto", href: "/contacto" },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-white/90 hover:text-white transition-colors font-medium">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-white/80 mb-5">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-white/70 shrink-0 mt-0.5" />
                <span className="text-white/90 text-sm font-medium">Plaza Italia 183, La Plata<br />Provincia de Buenos Aires</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="text-white/70 shrink-0" />
                <a href={`tel:${DEPARTMENTS[1].tel?.replace(/[^0-9]/g, '')}`} className="text-white/90 text-sm font-medium hover:text-white transition-colors">{DEPARTMENTS[1].tel}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="text-white/70 shrink-0" />
                <a href="mailto:infosum@sumsa.com.ar" className="text-white/90 text-sm font-medium hover:text-white transition-colors">infosum@sumsa.com.ar</a>
              </li>
            </ul>
          </div>

          {/* Emergencias + certs */}
          <div className="md:col-span-3 md:col-start-10 space-y-5">
            <div className="flex flex-col gap-4">
              <a href="https://auth.afip.gob.ar/contribuyente_/login.xhtml?action=SYSTEM&system=denuncias" target="_blank" rel="noopener noreferrer">
                <Image
                  src="/images/data-fiscal-nuevo.png"
                  alt="Data Fiscal"
                  width={100}
                  height={100}
                  className="h-24 w-auto object-contain rounded-lg hover:opacity-80 transition-opacity"
                />
              </a>
              <Image
                src="/images/iram-iqnet-nuevo.png"
                alt="Certificación IRAM-IQNET ISO 9001:2015"
                width={240}
                height={80}
                className="h-20 w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Legal strip */}
      <div className="border-t border-white/8 relative z-10">
        <div className="container mx-auto px-6 py-8 space-y-5">

          {/* Empresa + Superintendencia */}
          <div className="flex flex-wrap gap-x-10 gap-y-3 text-xs text-white/80 font-medium">
            <span><strong className="text-white/90">SUM S.A.</strong> — CUIT: 30-61140404-9</span>
            <span className="text-white/40 hidden md:inline">|</span>
            <span>
              <strong className="text-white/90">Superintendencia de Servicios de Salud</strong>
              {" · "}RNEMP N° 1-1469-7
              {" · "}Tel. 0800 222 SALUD (72583)
              {" · "}
              <a href="https://www.sssalud.gob.ar" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors inline-flex items-center gap-0.5">
                www.sssalud.gob.ar <ExternalLink size={9} />
              </a>
            </span>
          </div>

          {/* Links legales */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
            <a href="/terminos" className="text-white/80 hover:text-white transition-colors">Términos y condiciones</a>
            <span className="text-white/15">·</span>
            <Link href="/contacto" className="text-white/80 hover:text-white transition-colors">Reclamos</Link>
            <span className="text-white/15">·</span>
            <a
              href={`https://wa.me/${WHATSAPP_MAIN}?text=Solicitud%20de%20baja%20%2F%20desafiliaci%C3%B3n%20del%20servicio`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white transition-colors"
            >
              Baja / Desafiliación del servicio
            </a>
            <span className="text-white/15">·</span>
            <a href="/datos-personales" className="text-white/80 hover:text-white transition-colors">Dirección Nacional de Datos Personales</a>
            <span className="text-white/15">·</span>
            <a href="/datos-personales#resolucion" className="text-white/80 hover:text-white transition-colors">Resolución Dir. Nacional de Defensa del Consumidor</a>
            <a
              href={`https://wa.me/${WHATSAPP_MAIN}?text=Ejercicio%20del%20bot%C3%B3n%20de%20arrepentimiento`}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-red-500/30 text-red-400/80 hover:bg-red-500/10 hover:text-red-400 transition-colors font-bold text-[10px] uppercase tracking-widest"
            >
              Botón de arrepentimiento
            </a>
          </div>

          {/* Copyright */}
          <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest text-center pt-2 border-t border-white/5">
            © {currentYear} SUM S.A. | Todos los derechos reservados.
          </p>
        </div>
      </div>

      {/* Background decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-white/3 to-transparent pointer-events-none" />
    </footer>
  );
}
