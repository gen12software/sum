// Centralized contact data — update here, reflects everywhere

// Cabina de despacho: únicas líneas de emergencia, visita médica y traslados.
// El "15" es sólo presentación: los socios que llaman desde un fijo lo necesitan
// para marcar. En el href va el celular en formato internacional (+54 9 221 ...),
// que es el único que funciona desde cualquier operador y desde el exterior.
export interface EmergencyPhone {
  tel: string;
  display: string;
}

export const EMERGENCY_PHONES: EmergencyPhone[] = [
  { tel: "+5492213160076", display: "15 316-0076" },
  { tel: "+5492213160077", display: "15 316-0077" },
];

export const EMERGENCY_PHONES_DISPLAY = EMERGENCY_PHONES.map((p) => p.display).join(" / ");

export const DISPATCH_LABEL = "Cabina de despacho";

export const WHATSAPP_MAIN = "5492216754608";
export const WHATSAPP_MAIN_DISPLAY = "+54 9 221 675-4608";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_MAIN}`;

export interface Phone {
  /** Número marcable para el href. */
  tel: string;
  /** Número tal como lo lee el socio. */
  display: string;
}

export interface Department {
  name: string;
  tels?: Phone[];
  hours: string;
  whatsapp?: string;
  email?: string;
}

export const DEPARTMENTS: Department[] = [
  {
    name: "Comercial / Atención al Socio",
    whatsapp: WHATSAPP_MAIN_DISPLAY,
    hours: "Lun a Vie de 9:00 a 16:00 h.",
  },
  {
    name: "Administración General",
    tels: [
      { tel: "+542214216002", display: "(0221) 421-6002" },
      { tel: "+5492213160075", display: "15 316-0075" },
    ],
    email: "infosum@sumsa.com.ar",
    hours: "Lun a Vie de 9:00 a 16:00 h.",
  },
  {
    name: "Cobranzas",
    tels: [{ tel: "+542214839121", display: "(0221) 483-9121" }],
    email: "cobranzas@sumsa.com.ar",
    hours: "Lun a Vie de 9:00 a 16:00 h.",
  },
  {
    name: "Área de Calidad",
    tels: [{ tel: "+542214839797", display: "(0221) 483-9797" }],
    hours: "Lun a Vie de 9:00 a 16:00 h.",
  },
];

export const QUICK_WHATSAPP = [
  { title: "Informar un Pago", number: "+54 9 221 411-1800", hours: "9:00 a 16:00 h." },
  { title: "Pedir Factura", number: "+54 9 221 671-0641", hours: "9:00 a 16:00 h." },
  { title: "Consultar Deuda", number: "+54 9 221 593-0000", hours: "9:00 a 16:00 h." },
  { title: "Baja de Servicio", number: WHATSAPP_MAIN_DISPLAY, hours: "9:00 a 16:00 h." },
];
