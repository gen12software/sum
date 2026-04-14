// Centralized contact data — update here, reflects everywhere

export const EMERGENCY_PHONE = "02214211226";
export const EMERGENCY_PHONE_DISPLAY = "(0221) 421-1226 / 421-2234";

export const WHATSAPP_MAIN = "5492216754608";
export const WHATSAPP_MAIN_DISPLAY = "+54 9 221 675-4608";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_MAIN}`;

export interface Department {
  name: string;
  tel: string;
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
    tel: "(0221) 421-6002",
    email: "infosum@sumsa.com.ar",
    hours: "Lun a Vie de 9:00 a 16:00 h.",
  },
  {
    name: "Cobranzas",
    tel: "(0221) 483-9121",
    email: "cobranzas@sumsa.com.ar",
    hours: "Lun a Vie de 9:00 a 16:00 h.",
  },
  {
    name: "Área de Calidad",
    tel: "(0221) 483-9797",
    hours: "Lun a Vie de 9:00 a 16:00 h.",
  },
];

export const QUICK_WHATSAPP = [
  { title: "Informar un Pago", number: "+54 9 221 411-1800", hours: "9:00 a 16:00 h." },
  { title: "Pedir Factura", number: "+54 9 221 671-0641", hours: "9:00 a 16:00 h." },
  { title: "Consultar Deuda", number: "+54 9 221 593-0000", hours: "9:00 a 16:00 h." },
  { title: "Baja de Servicio", number: WHATSAPP_MAIN_DISPLAY, hours: "9:00 a 16:00 h." },
];
