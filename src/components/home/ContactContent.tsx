"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  PhoneCall,
  Mail,
  Clock,
  ChevronRight,
  Send,
  Building,
  UserCheck,
  CreditCard,
  SearchCheck,
  Smartphone,
  CheckCircle2,
  Stethoscope,
  Truck,
  Users,
  Baby,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { DEPARTMENTS as DEPT_DATA, QUICK_WHATSAPP as QUICK_WA, EMERGENCY_PHONE, EMERGENCY_PHONE_DISPLAY, WHATSAPP_URL, WHATSAPP_MAIN_DISPLAY } from "@/lib/contact";
import { submitContactForm } from "@/app/actions";

const DEPARTMENTS = [
  { ...DEPT_DATA[0], icon: <UserCheck size={18} className="text-secondary" /> },
  { ...DEPT_DATA[1], icon: <Building size={18} className="text-secondary" /> },
  { ...DEPT_DATA[2], icon: <CreditCard size={18} className="text-secondary" /> },
  { ...DEPT_DATA[3], icon: <SearchCheck size={18} className="text-secondary" /> },
];

export function ContactContent() {
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const formRef = React.useRef<HTMLFormElement>(null);

  const handleContactSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = (data.get("name") as string)?.trim();
    const email = (data.get("email") as string)?.trim();
    const message = (data.get("message") as string)?.trim();

    const errors: { name?: string; email?: string; message?: string } = {};
    if (!name) errors.name = "Por favor ingresá tu nombre.";
    if (!email) errors.email = "Por favor ingresá tu correo electrónico.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "El correo ingresado no es válido.";
    if (!message) errors.message = "Por favor escribí tu mensaje.";

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});
    setFormStatus("loading");
    setErrorMsg("");
    const result = await submitContactForm(data);
    if (result.success) {
      setFormStatus("success");
      formRef.current?.reset();
      setTimeout(() => setFormStatus("idle"), 4000);
    } else {
      setFormStatus("error");
      setErrorMsg(result.message);
      setTimeout(() => setFormStatus("idle"), 5000);
    }
  };

  return (
    <section className="bg-white min-h-screen">

      {/* Header */}
      <div className="pt-32 pb-16 bg-linear-to-b from-primary/5 to-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-7xl font-black text-primary mb-4 uppercase tracking-tighter">
              Contacto
            </h1>
            <p className="text-lg text-primary/50 max-w-xl mx-auto font-medium">
              Escribinos, llamanos o pasá por nuestra sede.
            </p>
          </motion.div>
        </div>
      </div>

      {/* FORM + QUICK CONTACTS */}
      <div className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Form — protagonista */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-surface rounded-4xl p-10 border border-border"
          >
            <h2 className="text-2xl font-black text-primary mb-8">
              Envianos un <span className="text-secondary">mensaje</span>
            </h2>
            <form ref={formRef} onSubmit={handleContactSubmit} className="space-y-5">
              <div aria-hidden="true" style={{ display: "none" }}>
                <input type="text" name="website" tabIndex={-1} autoComplete="off" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-1">Nombre y Apellido</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Escribí tu nombre..."
                    className={`w-full bg-white border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all font-medium text-primary text-sm ${fieldErrors.name ? "border-red-400" : "border-border"}`}
                  />
                  {fieldErrors.name && <p className="text-xs font-bold text-red-500 ml-1">{fieldErrors.name}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-1">Correo Electrónico</label>
                  <input
                    type="text"
                    name="email"
                    placeholder="email@ejemplo.com"
                    className={`w-full bg-white border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all font-medium text-primary text-sm ${fieldErrors.email ? "border-red-400" : "border-border"}`}
                  />
                  {fieldErrors.email && <p className="text-xs font-bold text-red-500 ml-1">{fieldErrors.email}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-1">Mensaje</label>
                <textarea
                  name="message"
                  rows={6}
                  placeholder="¿En qué podemos ayudarte?"
                  className={`w-full bg-white border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all font-medium text-primary text-sm resize-none ${fieldErrors.message ? "border-red-400" : "border-border"}`}
                />
                {fieldErrors.message && <p className="text-xs font-bold text-red-500 ml-1">{fieldErrors.message}</p>}
              </div>
              {formStatus === "error" && (
                <p className="text-sm font-bold text-red-500 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                  {errorMsg}
                </p>
              )}
              <button
                type="submit"
                disabled={formStatus === "loading" || formStatus === "success"}
                className="w-full bg-primary text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-primary-dark hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg flex items-center justify-center gap-3 disabled:opacity-50"
              >
                <Send size={18} />
                {formStatus === "loading" ? "Enviando..." : formStatus === "success" ? "¡Mensaje enviado!" : "Enviar Mensaje"}
              </button>
            </form>
          </motion.div>

          {/* Quick contacts — lateral */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <motion.a
              href={`tel:${EMERGENCY_PHONE}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="flex items-center gap-5 p-6 bg-secondary text-white rounded-3xl hover:bg-secondary-dark transition-all group"
            >
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <PhoneCall size={22} />
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-white/70 mb-1">Emergencias 24H</div>
                <div className="text-xl font-black">{EMERGENCY_PHONE_DISPLAY}</div>
              </div>
            </motion.a>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 }}
              className="rounded-3xl border border-border overflow-hidden group"
            >
              <div className="h-48 relative overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3271.8171082227714!2d-57.9568105245087!3d-34.911038973793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a2e6363b7c64ad%3A0x96d7fc4126598c47!2sPl.%20Italia%20183%2C%20B1900%20La%20Plata%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1776185242547!5m2!1ses!2sar"
                  className="w-full h-full border-0"
                  title="Ubicación SUM - Plaza Italia 183, La Plata"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                {/* Overlay para bloquear navegación */}
                <div className="absolute inset-0" />
              </div>
              <div className="p-5 bg-surface flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-secondary shrink-0" />
                  <div>
                    <div className="font-black text-primary text-sm">Plaza Italia 183</div>
                    <div className="text-xs text-primary/50">La Plata, Buenos Aires</div>
                  </div>
                </div>
                <a
                  href="https://www.google.com/maps/dir//Pl.+Italia+183,+B1900+La+Plata,+Provincia+de+Buenos+Aires"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-secondary font-black text-xs hover:translate-x-0.5 transition-transform"
                >
                  Cómo llegar <ChevronRight size={14} />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Departamentos */}
      <div className="container mx-auto px-4 pb-20">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-black text-primary uppercase tracking-tight mb-8"
        >
          Áreas de Atención
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {DEPARTMENTS.map((dept, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="p-6 bg-surface rounded-3xl border border-border hover:border-secondary/20 hover:shadow-premium transition-all group"
            >
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-border mb-4 group-hover:scale-110 transition-transform">
                {dept.icon}
              </div>
              <h3 className="text-sm font-black text-primary uppercase tracking-tight leading-tight mb-3">{dept.name}</h3>
              <div className="space-y-2">
                {dept.tel && (
                  <a href={`tel:${dept.tel}`} className="flex items-center gap-2 text-xs font-bold text-primary/60 hover:text-secondary transition-colors">
                    <PhoneCall size={12} className="text-primary/30" />{dept.tel}
                  </a>
                )}
                {dept.whatsapp && (
                  <a href={`https://wa.me/${dept.whatsapp.replace(/[^0-9]/g, '')}`} className="flex items-center gap-2 text-xs font-bold text-primary/60 hover:text-secondary transition-colors">
                    <Smartphone size={12} className="text-primary/30" />{dept.whatsapp}
                  </a>
                )}
                {dept.email && (
                  <a href={`mailto:${dept.email}`} className="flex items-center gap-2 text-xs font-bold text-primary/60 hover:text-secondary transition-colors">
                    <Mail size={12} className="text-primary/30" />{dept.email}
                  </a>
                )}
                <div className="flex items-center gap-2 text-[10px] font-black uppercase text-primary/30 tracking-wide pt-1">
                  <Clock size={10} />{dept.hours}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Modos de Pago */}
      <div className="bg-surface border-y border-border py-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
            <div className="flex items-center gap-3 mb-1">
              <CreditCard size={18} className="text-secondary" />
              <h2 className="text-2xl font-black text-primary uppercase tracking-tight">Modos de Pago</h2>
            </div>
            <p className="text-primary/50 font-medium text-sm">Adhesión al débito automático y gestión de pagos.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-primary rounded-4xl p-8 text-white"
            >
              <div className="flex items-center gap-3 mb-5">
                <Mail size={16} className="text-secondary" />
                <h3 className="font-black uppercase tracking-tight text-sm">Adhesión Débito Automático</h3>
              </div>
              <p className="text-white/70 text-sm font-medium mb-4 leading-relaxed">
                Enviá un mail a <strong className="text-white">computos@sumsa.com.ar</strong> con el asunto &quot;Solicitud Adhesión Débito Automático&quot; incluyendo:
              </p>
              <ul className="space-y-2">
                {["Nombre/s del/los afiliados y DNI", "Tipo de tarjeta (VISA Crédito o Electrón) + 16 dígitos + vencimiento + banco", "CBU (22 dígitos), banco y titular (si es cuenta bancaria)"].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-white/70 font-medium">
                    <CheckCircle2 size={12} className="text-secondary shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { title: "Informar un Pago", number: "+54 9 221 411-1800", hours: "9:00 a 16:00 h." },
                { title: "Pedir Factura", number: "+54 9 221 671-0641", hours: "9:00 a 16:00 h." },
                { title: "Consultar Deuda", number: "+54 9 221 593-0000", hours: "9:00 a 16:00 h." },
              ].map((q) => (
                <a
                  key={q.title}
                  href={`https://wa.me/${q.number.replace(/[^0-9]/g, "")}`}
                  className="p-5 bg-white border border-border rounded-2xl hover:border-secondary/30 hover:shadow-premium transition-all group"
                >
                  <Smartphone size={14} className="text-secondary mb-2 group-hover:scale-110 transition-transform" />
                  <p className="text-[10px] font-black text-primary uppercase tracking-wider mb-1">{q.title}</p>
                  <p className="text-sm font-bold text-primary/70">{q.number}</p>
                  <p className="text-[10px] text-primary/30 font-bold uppercase mt-1">{q.hours}</p>
                </a>
              ))}
              <a
                href="mailto:computos@sumsa.com.ar"
                className="p-5 bg-white border border-border rounded-2xl hover:border-secondary/30 hover:shadow-premium transition-all group"
              >
                <Mail size={14} className="text-secondary mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-[10px] font-black text-primary uppercase tracking-wider mb-1">Solicitud de Baja</p>
                <p className="text-sm font-bold text-primary/70">computos@sumsa.com.ar</p>
                <p className="text-[10px] text-primary/30 font-bold uppercase mt-1">9:00 a 16:00 h.</p>
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Trabajá en SUM */}
      <div className="container mx-auto px-4 py-20">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <Users size={18} className="text-secondary" />
            <h2 className="text-2xl font-black text-primary uppercase tracking-tight">Trabajá en SUM</h2>
          </div>
          <p className="text-primary/50 font-medium text-sm">Buscamos profesionales comprometidos con la salud y la excelencia.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {[
            { Icon: Stethoscope, title: "Médicos", desc: "Emergencias, UTI, Cardiología, Clínica, Pediatría.", email: "rrhh@sumsa.com.ar" },
            { Icon: Baby, title: "Médicos de UTIM", desc: "Guardias de 12 y 24 hs. Zona La Plata.", email: "rrhh@sumsa.com.ar" },
            { Icon: Truck, title: "Enfermeros", desc: "Con experiencia en UTI/UC/UTIM y carnet D.3.", email: "rrhh@sumsa.com.ar" },
            { Icon: Users, title: "Psicólogos", desc: "Tareas administrativas. Jornada de 6 hs.", email: "rrhh@sumsa.com.ar" },
            { Icon: Users, title: "Médicos Regionales", desc: "Zonas: Brandsen, Guernica y San Vicente.", email: "rrhh@sumsa.com.ar" },
            { Icon: Users, title: "Médicos de Temporada", desc: "Revisación médica de ingreso a natatorio.", email: "rrhh@sumsa.com.ar" },
          ].map(({ Icon, title, desc, email, tel }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="p-6 bg-surface rounded-2xl border border-border hover:border-secondary/20 hover:shadow-premium transition-all group"
            >
              <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-sm border border-border mb-3 group-hover:scale-110 transition-transform">
                <Icon size={16} className="text-secondary" />
              </div>
              <h3 className="font-black text-primary mb-1 text-sm uppercase tracking-tight">{title}</h3>
              <p className="text-xs text-primary/50 font-medium leading-relaxed mb-3">{desc}</p>
              <div className="space-y-1.5 pt-3 border-t border-border">
                {tel && (
                  <a href={`tel:${tel.replace(/[^0-9]/g, "")}`} className="flex items-center gap-2 text-xs font-bold text-primary/60 hover:text-secondary transition-colors">
                    <PhoneCall size={11} />{tel}
                  </a>
                )}
                <a href={`mailto:${email}`} className="flex items-center gap-2 text-xs font-bold text-primary/60 hover:text-secondary transition-colors">
                  <Mail size={11} />{email}
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 bg-primary rounded-4xl text-white flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <h3 className="text-xl font-black uppercase mb-1">¿No encontrás tu vacante?</h3>
            <p className="text-white/60 text-sm font-medium">Enviá tu CV de forma espontánea a todas las áreas.</p>
          </div>
          <a
            href="mailto:rrhh@sumsa.com.ar"
            className="shrink-0 bg-white text-primary px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-lg"
          >
            Enviar CV
          </a>
        </motion.div>
      </div>


    </section>
  );
}
