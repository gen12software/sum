"use client";

import React, { useState } from "react";
import Image from "next/image";
import { DISPATCH_LABEL } from "@/lib/contact";
import { EmergencyPhones } from "@/components/contact/EmergencyCall";
import { motion, AnimatePresence } from "framer-motion";
import {
  Stethoscope,
  Baby,
  Activity,
  PhoneCall,
  Building2,
  HeartPulse,
  Clock,
  AlertCircle,
  MapPin,
  ClipboardList,
  Truck,
  MessageCircle,
  ExternalLink,
  Sparkles,
  Users,
  HeartHandshake,
  FileText
} from "lucide-react";

interface ServiceDetail {
  name: string;
  desc: string;
  /** El servicio se solicita a la cabina de despacho (líneas de emergencia). */
  dispatch?: boolean;
  phone?: string;
  hours?: string;
  requirements?: string[];
  extra?: string;
  whatsapp?: string;
  whatsappDisplay?: string;
  link?: string;
  linkDisplay?: string;
  flyerImage?: string;
  flyerLabel?: string;
}

interface Category {
  id: string;
  title: string;
  icon: React.ReactNode;
  highlight?: "pediatric" | "siem" | "prevention";
  services: ServiceDetail[];
}

const SERVICES_CATEGORIES: Category[] = [
  {
    id: "medicos",
    title: "Servicios Médicos",
    icon: <Stethoscope size={20} />,
    services: [
      {
        name: "Emergencias y Urgencias",
        desc: "Cobertura las 24 h. los 365 días del año con unidades de alta tecnología y médicos especializados.",
        extra: "Unidades móviles equipadas con la más alta tecnología."
      },
      {
        name: "Traslados Programados",
        desc: "Categorizados en Baja Complejidad (sin médico) o Alta Complejidad (UTIM - Unidad de Terapia Intensiva Móvil).",
        dispatch: true,
        extra: "Se abona una tarifa preferencial según el tipo de traslado."
      },
      {
        name: "Visita Médica Domiciliaria",
        desc: "Atención de patologías que no constituyen emergencia con cita previa.",
        dispatch: true,
        extra: "Requiere copago (excepto en Plan Premium)."
      },
      {
        name: "Telemedicina",
        desc: "Consultas médicas telefónicas inmediatas para patologías leves (Código Verde).",
        link: "https://sum.itconsultsa.com/login",
        linkDisplay: "Acceder al servicio",
      },
    ]
  },
  {
    id: "especialidades",
    title: "Especialidades y Guardia",
    icon: <Activity size={20} />,
    services: [
      {
        name: "Urgencias Odontológicas",
        desc: "Servicio de Guardia en la Sociedad Odontológica (Av. 13 Nº680). Requiere autorización previa de SUM.",
        hours: "Lun a Vie de 9:00 a 16:00 h.",
        dispatch: true
      },
      {
        name: "Kinesiología Domiciliaria",
        desc: "Rehabilitación personalizada post-quirúrgica, funcional y deportiva en la comodidad de tu hogar.",
        whatsapp: "5492216749056",
        whatsappDisplay: "+54 9 2216 74-9056"
      },
    ]
  },
  {
    id: "infantil",
    title: "SUM Infantil",
    icon: <Baby size={20} />,
    highlight: "pediatric",
    services: [
      {
        name: "Traslado Neonatal y Pediátrico",
        desc: "Servicio programado. Unidades UTIM altamente capacitadas para el traslado de bebés y niños de alto riesgo.",
        extra: "Médicos neonatólogos y enfermeros especializados en pediatría."
      },
      {
        name: "Kinesiología Infantil a Domicilio",
        desc: "Tratamientos personalizados para acompañar el desarrollo y la recuperación de los más pequeños, sin salir de casa.",
        whatsapp: "5492216749056",
        whatsappDisplay: "221 674-9056"
      }
    ]
  },
  {
    id: "enfermeria",
    title: "Enfermería y Estudios",
    icon: <ClipboardList size={20} />,
    services: [
      {
        name: "Enfermería Programada",
        desc: "Inyecciones, presión, nebulizaciones y curaciones. Requiere orden médica.",
        hours: "8:00 a 18:00 h.",
        dispatch: true,
        requirements: ["Orden médica sin excepción", "Carencia de 30 días para socios nuevos"]
      },
      {
        name: "ECG a domicilio",
        desc: "Electrocardiogramas realizados por profesionales en tu domicilio.",
        hours: "8:00 a 16:00 h.",
        dispatch: true,
        requirements: ["Orden médica especificando domicilio", "Sin informe médico (puede solicitarlo en Plaza Italia 183)"]
      },
      {
        name: "Gabinete Sede Central",
        desc: "Servicio de enfermería en nuestra sede de Plaza Italia 183.",
        hours: "Lun-Vie 9:00 a 16:00 h.",
        requirements: ["Orden médica sin excepción"]
      },
      {
        name: "Ecografía a Domicilio",
        desc: "Cómodo y accesible · Atención integral · Tecnología avanzada.",
        whatsapp: "5492216749056",
        whatsappDisplay: "221 674-9056"
      },
    ]
  },
  {
    id: "cuidados-domiciliarios",
    title: "Cuidados Domiciliarios",
    icon: <HeartHandshake size={20} />,
    services: [
      {
        name: "Acompañamiento Terapéutico",
        desc: "Ofrecemos acompañamiento domiciliario personalizado con diferentes niveles de asistencia según el estado de salud y requerimientos de cada persona.",
        extra: "Módulo mínimo 6 horas",
        phone: "221 6710641",
        flyerImage: "/images/FLYER_ACOMPAÑAMIENTO TERAPEUTICO.png",
      },
      {
        name: "Enfermero en Casa",
        desc: "La atención integral que necesita. Un sólo profesional para acompañar, cuidar y brindar atención de enfermería.",
        extra: "Módulo mínimo 6 horas",
        phone: "221 6710641",
        flyerImage: "/images/flyer_ENFERMERO EN CASA.png",
      },
      {
        name: "Cuidador en Domicilio",
        desc: "Acompañamiento, cuidado y tranquilidad para cada día.",
        extra: "Módulo mínimo 6 horas",
        phone: "221 6710641",
        flyerImage: "/images/flyer_CUIDADOR EN CASA.png",
      },
    ]
  },
  {
    id: "empresas",
    title: "PyMEs y Empresas",
    icon: <Building2 size={20} />,
    services: [
      {
        name: "Área Protegida",
        desc: "Cobertura de emergencia inmediata para todas las personas dentro de tu establecimiento, permanentes u ocasionales.",
        whatsapp: "5492216754608",
        whatsappDisplay: "+54 9 221 675-4608",
        extra: "Solicite promotor para asesoramiento comercial."
      },
      {
        name: "Medicina Laboral",
        desc: "Control de ausentismo y exámenes preocupacionales exhaustivos.",
        whatsapp: "5492216754608",
        whatsappDisplay: "+54 9 221 675-4608",
        extra: "Consúltenos por planes a medida para su empresa."
      },
      {
        name: "Capacitaciones In Company",
        desc: "Cursos de RCP y Primeros Auxilios certificados por Cruz Roja Argentina.",
        phone: "483-9797"
      },
      {
        name: "DEA – Desfibrilador Externo Automático",
        desc: "Provisión, instalación y mantenimiento de DEA en su establecimiento. Incluye capacitación al personal para su correcto uso ante una emergencia cardíaca.",
        phone: "483-9797",
        extra: "Consulte disponibilidad y planes de cobertura para su empresa."
      },
    ]
  },
  {
    id: "bienestar",
    title: "Bienestar",
    icon: <Sparkles size={20} />,
    services: [
      {
        name: "Drenaje Linfático",
        desc: "Pensamos en tu bienestar físico y emocional.",
        requirements: [
          "Estimula el sistema linfático",
          "Favorece la eliminación de líquidos y toxinas",
          "Mejora la circulación"
        ],
        whatsapp: "5492216749056",
        whatsappDisplay: "221 674-9056"
      },
    ]
  }
];

function FlyerButton({
  image,
  label,
  alt,
}: {
  image: string;
  label: string;
  alt: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-xs font-black rounded-xl hover:bg-primary/90 transition-colors"
      >
        <FileText size={14} />
        {label}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6 cursor-zoom-out"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-h-full"
              style={{ maxWidth: "min(90vw, 500px)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={image}
                alt={alt}
                width={400}
                height={560}
                className="w-full h-auto rounded-2xl shadow-2xl"
                style={{ maxHeight: "90vh", objectFit: "contain" }}
              />
              <button
                onClick={() => setOpen(false)}
                className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white rounded-full w-9 h-9 flex items-center justify-center font-black text-sm transition-colors"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function CoberturaGrandesObras() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="bg-surface rounded-3xl border border-border p-8 flex flex-col md:flex-row items-center gap-8">
        {/* Info */}
        <div className="flex-1">
          <p className="text-[10px] font-black text-secondary uppercase tracking-widest mb-2">Servicio Corporativo</p>
          <h4 className="text-2xl font-black text-primary leading-tight mb-3">Cobertura para<br />Grandes Obras</h4>
          <p className="text-primary/60 text-sm font-medium leading-relaxed mb-6">
            Móvil UTIM 4x4 con personal médico en el lugar, cumplimiento normativo y servicio a medida para proyectos de gran escala.
          </p>
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-xs font-black rounded-xl hover:bg-primary/90 transition-colors"
          >
            Ver flyer completo
          </button>
        </div>

        {/* Thumbnail */}
        <div
          className="shrink-0 w-36 cursor-zoom-in group relative rounded-2xl overflow-hidden border border-border shadow-sm"
          onClick={() => setOpen(true)}
        >
          <Image
            src="/images/Cobertura Grandes Obras.png"
            alt="Cobertura para Grandes Obras"
            width={400}
            height={560}
            className="w-full h-auto"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6 cursor-zoom-out"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-h-full"
              style={{ maxWidth: "min(90vw, 500px)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src="/images/Cobertura Grandes Obras.png"
                alt="Cobertura para Grandes Obras"
                width={400}
                height={560}
                className="w-full h-auto rounded-2xl shadow-2xl"
                style={{ maxHeight: "90vh", objectFit: "contain" }}
              />
              <button
                onClick={() => setOpen(false)}
                className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white rounded-full w-9 h-9 flex items-center justify-center font-black text-sm transition-colors"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function ServicesContent() {
  const [activeTab, setActiveTab] = useState(SERVICES_CATEGORIES[0].id);
  const contentRef = React.useRef<HTMLDivElement>(null);

  function handleTabChange(id: string) {
    setActiveTab(id);
    contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section className="bg-white min-h-screen">
      {/* Dynamic Header */}
      <div className="pt-24 pb-6 bg-linear-to-b from-primary/5 to-white border-b border-border/50">
        <div className="container px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-3xl md:text-5xl font-black text-primary mb-4 uppercase tracking-tighter leading-[0.9]">
              Catálogo de <span className="text-secondary">Servicios</span>
            </h1>
            <p className="text-base text-primary/70 font-medium leading-relaxed max-w-2xl">
              Toda la información técnica y administrativa sobre nuestra cobertura médica,
              horarios de atención y números de gestión.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container px-4 md:px-8 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Navigation */}
          <div className="w-full lg:w-80 shrink-0">
            <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-3 lg:pb-0 snap-x snap-mandatory lg:snap-none scrollbar-hide">
              {SERVICES_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleTabChange(cat.id)}
                  className={`flex items-center gap-2 lg:gap-4 px-3 py-2.5 lg:p-5 rounded-xl lg:rounded-2xl border-2 transition-all font-bold text-xs lg:text-sm whitespace-nowrap lg:whitespace-normal snap-start shrink-0 h-fit min-h-11 ${activeTab === cat.id
                    ? "bg-primary border-primary text-white shadow-lg lg:scale-[1.05]"
                    : "bg-surface border-transparent text-primary/60"
                    }`}
                >
                  <div className={`w-6 h-6 lg:w-8 lg:h-8 rounded-md lg:rounded-lg flex items-center justify-center transition-colors shrink-0 [&>svg]:w-4 [&>svg]:h-4 ${activeTab === cat.id ? "bg-white/10" : "bg-white shadow-sm"
                    }`}>
                    {cat.icon}
                  </div>
                  {cat.title}
                </button>
              ))}
            </div>

            {/* Emergency Side CTA — solo desktop */}
            <div className="mt-8 p-6 bg-secondary rounded-3xl text-white shadow-premium relative overflow-hidden hidden lg:block">
              <HeartPulse className="mb-4 text-white/40" size={32} />
              <h4 className="text-lg font-black mb-1 not-italic">¿Emergencia?</h4>
              <p className="text-white/80 text-xs font-medium mb-4">Atención inmediata las 24 horas.</p>
              <EmergencyPhones
                className="flex flex-col gap-2"
                itemClassName="block w-full text-center bg-white text-secondary py-2 rounded-xl text-sm font-black shadow-lg"
              />
            </div>
          </div>

          {/* Content area */}
          <div ref={contentRef} className="grow min-h-150 scroll-mt-28">
            <AnimatePresence mode="wait">
              {SERVICES_CATEGORIES.map((cat) => activeTab === cat.id && (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {cat.services.map((service, idx) => (
                      <div key={idx} className="bg-surface rounded-3xl p-5 md:p-8 border border-border flex flex-col group">
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <h3 className="text-xl font-bold text-primary group-hover:text-secondary transition-colors">{service.name}</h3>
                          {service.hours && (
                            <div className="flex items-center gap-2 px-3 py-1 bg-white border border-border rounded-full text-[10px] font-black text-primary/60">
                              <Clock size={12} className="text-secondary" />
                              {service.hours}
                            </div>
                          )}
                        </div>

                        <p className="text-primary/70 text-sm font-medium leading-relaxed mb-6">
                          {service.desc}
                        </p>

                        {(service.dispatch || service.phone || service.whatsapp || service.link || service.requirements || service.extra || service.flyerImage) && (
                          <div className="mt-auto pt-6 border-t border-border/50 space-y-4">
                            {service.requirements && (
                              <div className="space-y-1.5 text-[11px] font-bold text-primary/40 uppercase tracking-tight">
                                {service.requirements.map((r, i) => (
                                  <div key={i} className="flex items-center gap-2">
                                    <AlertCircle size={10} className="text-secondary" />
                                    {r}
                                  </div>
                                ))}
                              </div>
                            )}

                            {service.extra && (
                              <p className="text-[11px] font-bold text-primary not-italic leading-tight">
                                &quot;{service.extra}&quot;
                              </p>
                            )}

                            {service.dispatch && (
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                <div className="text-[10px] font-black text-primary/40 uppercase tracking-widest">{DISPATCH_LABEL}</div>
                                <EmergencyPhones
                                  className="flex flex-col sm:items-end gap-1"
                                  itemClassName="flex items-center gap-2 text-secondary font-black"
                                  conIcono
                                  iconSize={14}
                                />
                              </div>
                            )}
                            {service.phone && (
                              <div className="flex items-center justify-between">
                                <div className="text-[10px] font-black text-primary/40 uppercase tracking-widest">Gestión telefónica</div>
                                <a href={`tel:${service.phone.replace(/[^0-9]/g, '')}`} className="flex items-center gap-2 text-secondary font-black hover:scale-105 transition-transform">
                                  <PhoneCall size={14} />
                                  {service.phone}
                                </a>
                              </div>
                            )}
                            {service.whatsapp && (
                              <div className="flex items-center justify-between">
                                <div className="text-[10px] font-black text-primary/40 uppercase tracking-widest">WhatsApp</div>
                                <a href={`https://wa.me/${service.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-green-600 font-black hover:scale-105 transition-transform">
                                  <MessageCircle size={14} />
                                  {service.whatsappDisplay}
                                </a>
                              </div>
                            )}
                            {service.link && (
                              <div className="flex items-center justify-between">
                                <div className="text-[10px] font-black text-primary/40 uppercase tracking-widest">Acceso online</div>
                                <a href={service.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-secondary font-black hover:scale-105 transition-transform">
                                  <ExternalLink size={14} />
                                  {service.linkDisplay ?? service.link}
                                </a>
                              </div>
                            )}
                            {service.flyerImage && (
                              <FlyerButton
                                image={service.flyerImage}
                                label={service.flyerLabel ?? "Ver flyer completo"}
                                alt={service.name}
                              />
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Highlights specialized */}
                  {cat.highlight === "pediatric" && (
                    <div className="p-8 bg-primary rounded-4xl text-white relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center gap-8">
                      <div className="relative z-10 w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-lg shrink-0 border-4 border-white/20">
                        <Baby className="text-primary" size={48} />
                      </div>
                      <div className="relative z-10">
                        <h4 className="text-2xl font-black not-italic mb-2 uppercase tracking-tight">Especialidad Neonatológica</h4>
                        <p className="text-white/80 font-medium leading-relaxed text-sm mb-4">
                          Unidades equipadas con incubadora de traslado, respirador de transporte, bombas de infusión y monitoreo avanzado. Profesionales altamente calificados en pediatría de alto riesgo.
                        </p>
                        <div className="flex gap-4">
                          <a href="tel:2216749056" className="px-6 py-2 bg-secondary rounded-xl text-xs font-black shadow-lg hover:bg-secondary-dark transition-colors">221 674-9056</a>
                        </div>
                      </div>
                      <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-white/10 to-transparent pointer-events-none" />
                    </div>
                  )}

                  {cat.id === "empresas" && <CoberturaGrandesObras />}

                  {cat.id === "medicos" && (
                    <div className="space-y-4">
                      <div className="p-8 bg-surface rounded-4xl border border-dashed border-primary/20">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                          <Truck className="text-secondary shrink-0" size={48} />
                          <div>
                            <h4 className="text-primary font-black text-xl mb-2">Clasificación de Traslados</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <p className="text-xs font-black text-secondary uppercase mb-1">Baja Complejidad</p>
                                <p className="text-[11px] text-primary/60 font-medium leading-tight">Sin acompañamiento médico: controles, rehabilitación o estudios.</p>
                              </div>
                              <div>
                                <p className="text-xs font-black text-secondary uppercase mb-1">UTIM</p>
                                <p className="text-[11px] text-primary/60 font-medium leading-tight">Patologías graves que requieren monitoreo y atención intensiva constante.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-8 bg-surface rounded-4xl border border-dashed border-secondary/30">
                        <div className="flex flex-col md:flex-row items-start gap-6">
                          <Users className="text-secondary shrink-0 mt-1" size={36} />
                          <div className="flex-1">
                            <p className="text-[10px] font-black text-secondary uppercase tracking-widest mb-1">Nuevo Servicio Adicional</p>
                            <h4 className="text-primary font-black text-xl mb-2">Acompañamiento en Traslados Programados</h4>
                            <p className="text-primary/60 text-sm font-medium mb-4">
                              ¿Necesitás que te acompañen durante el traslado? Ofrecemos dos modalidades según el estado y requerimientos del paciente:
                            </p>
                            <div className="space-y-1.5 mb-4">
                              <div className="flex items-center gap-2 text-xs font-bold text-primary/70">
                                <AlertCircle size={10} className="text-secondary" />
                                Acompañante durante el traslado
                              </div>
                              <div className="flex items-center gap-2 text-xs font-bold text-primary/70">
                                <AlertCircle size={10} className="text-secondary" />
                                Enfermero durante el traslado
                              </div>
                            </div>
                            <p className="text-[11px] font-bold text-primary/50 uppercase tracking-wide mb-3">Consultá por programaciones y más información</p>
                            <a
                              href="https://wa.me/5492216749056"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-green-600 font-black hover:scale-105 transition-transform text-sm"
                            >
                              <MessageCircle size={14} />
                              221-6749056
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Sede Central / Info Banner */}
      <section className="py-24 bg-surface border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-border rounded-full text-[10px] font-black text-secondary mb-4 uppercase tracking-widest">
                <MapPin size={12} />
                Sede Central
              </div>
              <h3 className="text-3xl font-black text-primary mb-4 leading-tight">Plaza Italia 183,<br />La Plata</h3>
              <p className="text-primary/60 font-medium leading-relaxed mb-6">
                Nuestra sede central no sólo es el núcleo administrativo, sino que alberga el gabinete de enfermería para socios y afiliados.
              </p>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 bg-white rounded-3xl border border-border shadow-sm">
                <Clock className="text-primary mb-4" />
                <h4 className="font-bold text-primary mb-2">Horario Administración</h4>
                <p className="text-sm text-primary/60 font-medium">Lunes a Viernes de 9:00 a 16:00 h.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
