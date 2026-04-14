import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Download } from "lucide-react";

export const metadata: Metadata = {
  title: "Términos y Condiciones | SUM",
  description: "Contrato de Adhesión Afiliatoria SUM S.A. Términos y condiciones del servicio integral de medicina prehospitalaria.",
  alternates: { canonical: "/terminos" },
};

const SECTIONS = [
  {
    number: "1",
    title: "SOBRE SUM S.A.",
    content: `SUM S.A. es una sociedad anónima con domicilio social en Plaza Italia Nº 183 de la Ciudad de La Plata, Provincia de Buenos Aires, siendo su CUIT 30-61140404-9. El Servicio Integral de Medicina Prehospitalaria de SUM cubre servicios de acuerdo al plan de su elección. No se trata de un sistema de medicina prepaga sino de urgencias y emergencias médicas, atención médica domiciliaria, traslado de personas y demás servicios que en cada caso correspondan, conforme luego se detalla en especial respecto a cada plan.`,
  },
  {
    number: "2",
    title: "CALIDAD DE ASOCIADO",
    content: `Podrá asociarse a este sistema de Servicio Integral de Medicina Prehospitalaria de SUM toda persona con capacidad jurídica de contratar, acreditando fehacientemente ser residente en la República Argentina.`,
  },
  {
    number: "3",
    title: "CONDICIONES PARA FORMALIZAR EL INGRESO",
    content: `La persona interesada en ingresar al Sistema de Servicio Integral de Medicina Prehospitalaria de SUM deberá completar una Solicitud de Ingreso en forma personal en la sede de SUM o en forma telemática, por Whatsapp o incluso vía telefónica a través de un operador, pudiéndosele requerir sus antecedentes clínicos, los que tendrán carácter de declaración jurada de salud y toda otra información médica requerida por nuestra auditoría médica. El afiliado será personalmente responsable por la información suministrada en su declaración jurada, como así también por la correspondiente a cada uno de los integrantes de su grupo familiar a su cargo en caso de que exista. Toda inexactitud, falsedad, omisión o irregularidad en la solicitud de ingreso y la información complementaria de carácter de declaración jurada otorgará derecho a SUM a disponer la resolución unilateral fundada de la contratación respecto a todos los usuarios consignados en la solicitud de ingreso en los términos del art. 1077 del CCYC, 9 Ley 26.682 y art. 9 inc 2b) Decreto 1993/2011. Se deja expresa constancia que la persona titular de la cuenta, conoce y acepta dicha condición. La declaración jurada implica autorizar en forma irrevocable a SUM a solicitar cuanta información estime pertinente a los fines del efectivo control y verificación de los datos allí consignados. A tales efectos, dicha facultad incluye entre otros la renuncia al amparo en el secreto profesional y el relevamiento del mismo a los médicos y/o todo otro prestador de salud que lo/s hubieren tratado con anterioridad y posterioridad a la fecha de la solicitud de ingreso; como así también la conformidad irrevocable para que sean exhibidas a SUM y/o a los profesionales y/o instituciones a través de los cuales brinda cobertura en el marco de sus servicios sus historias clínicas, antecedentes y toda otra documentación médica relacionada con la ejecución de las prestaciones a cargo de SUM.`,
  },
  {
    number: "4",
    title: "PERFECCIONAMIENTO DEL CONTRATO Y RESCISIÓN UNILATERAL POR EL AFILIADO",
    content: `El contrato sólo quedará perfeccionado una vez recepcionada la documentación correspondiente al ingreso y al momento en que el afiliado abone la primera cuota del plan elegido. Una vez perfeccionado el contrato de acuerdo con lo estipulado precedentemente, el usuario titular tiene derecho a revocar la aceptación durante el plazo de diez (10) días corridos (cf. art. 34 de la Ley 24.240 y normas complementarias y modificatorias). Asimismo, el asociado podrá, rescindir en cualquier momento el contrato sin limitación y sin penalidad alguna conforme debiendo notificar fehacientemente esta decisión a SUM SA con treinta (30) días de anticipación conforme art. 9 de la Ley 26.682. Sin perjuicio de ello y a efectos de evitar el ejercicio abusivo de este derecho, el mismo podrá ser ejercido solamente una vez por año (art. 9 inc. 1 Ley 26.682 - Decreto 1993/2011.)`,
  },
  {
    number: "5",
    title: "AFILIACIÓN AL SERVICIO (ALTA) Y DURACIÓN DE LA CONTRATACIÓN",
    content: `El alta en sistema se realiza dentro de las 72 hs. hábiles contadas desde el momento en que se considera perfeccionado el contrato. La información requerida para el Alta del servicio se encuentra detallada en el Anexo Alta Afiliación Particular. La afiliación al Sistema es por tiempo indeterminado, hasta que el afiliado o responsable de la afiliación manifieste la intención de baja del servicio en los términos antes previstos o por SUM SA, al momento que disponga en forma causada el cése y comunique la baja de la afiliación. La baja de afiliación del usuario se podrá hacer a través del botón existente en su página web.`,
  },
  {
    number: "6",
    title: "PAGO",
    content: `El pago del abono se puede realizar mediante los sistemas de débito automático o transferencia bancaria.`,
  },
  {
    number: "7",
    title: "PRECIO DEL SERVICIO. AUMENTO DE CUOTA MENSUAL",
    content: `El Servicio que brinda SUM tiene un precio diferenciado en función del plan al cual se encuentra suscripto el afiliado y con monto inicial conforme a la lista de precios vigente a la fecha de la solicitud de Ingreso. El precio se incrementará conforme los términos del art. 17 Decreto 1993/2011 P.E.N. y normas complementarias y modificatorias. Asimismo, el importe de la cuota mensual será incrementada por SUM conforme los aumentos expresamente autorizados por la Superintendencia de Servicios de Salud en su carácter de Autoridad de Aplicación, los cuales serán debidamente informados con 30 días de antelación conforme artículo 5 inciso g) del Decreto N° 1993/2011 y sus normas complementarias y modificatorias.`,
  },
  {
    number: "8",
    title: "SOBRE LAS CREDENCIALES DE AFILIACIÓN",
    content: `a) Toda vez que SUM acepte el ingreso del solicitante, el mismo recibirá credencial definitiva, la cual una vez activa, se presentará junto con el DNI cada vez que se requieran servicios contemplados en el plan del asociado.\n\nb) La credencial de afiliación es personal e intransferible, así como los derechos que confiere. El uso de la credencial para la prestación de servicios a terceras personas no afiliadas será causal de resolución del contrato, reservándose SUM el derecho a ejercer en su caso las acciones legales que considere pertinentes.\n\nc) En caso de extravío de su credencial, el asociado deberá notificarlo a SUM dentro de las cuarenta y ocho (48) horas siguientes a la pérdida. Transcurrido dicho plazo, se lo considerará responsable por la eventual utilización dolosa de la misma y se producirá la resolución del contrato si dicha utilización causare perjuicio SUM. La credencial deberá ser devuelta por el afiliado en las oficinas de SUM en caso de cése de la afiliación por cualquier causa que fuera.`,
  },
  {
    number: "9",
    title: "BAJA TRANSITORIA",
    content: `Cuando un afiliado / usuario se ausentare del país por un período que supere los noventa (90) días corridos, podrá solicitar la condición de "afiliado ausente" mediante la cual se suspende temporalmente el servicio debiendo abonar el veinticinco por ciento (25%) de la cuota correspondiente a efectos de mantener su antigüedad. Este beneficio sólo podrá utilizarse una (1) vez por año calendario de vigencia del plan. Al retornar al país, el asociado acreditará en forma fehaciente su lugar y tiempo de permanencia en el exterior, como paso previo a la regularización del servicio. Este beneficio operará únicamente para todo el grupo familiar no pudiendo optar por el beneficio en forma individual cuando la afiliación implique la del grupo familiar.`,
  },
  {
    number: "10",
    title: "CAMBIOS DE PLAN",
    content: `El afiliado podrá solicitar su inclusión en planes de mayores o menores prestaciones y/o beneficios, reservándose SUM el derecho de aceptar o rechazar la modificación solicitada, en función de la disponibilidad y/o capacidad, con el fin de asegurar la calidad del servicio médico asistencial brindado a todos los afiliados de SUM, bajo un criterio de razonabilidad. La modificación en caso de ser aceptada, tendrá vigencia desde la fecha en que la misma fuera aceptada.`,
  },
  {
    number: "11",
    title: "COBERTURAS Y PLANES",
    content: `El detalle de las coberturas de los planes ofrecidos y los tiempos de acceso progresivo a los mismas, se rigen en forma exclusiva, excluyente y taxativa de conformidad al presente reglamento y cuadro de cobertura de cada Plan a nivel local en el Partido de La Plata y su zona de influencia. La cobertura nacional e internacional se realizará a través de la red SIEM.\n\nPlan A: Emergencias médicas (24 hs.); Urgencias médica (24 hs.); Visita programada a domicilio (con copago); Urgencia odontológica nocturna en la SOLP; SIEM - Cobertura Nacional e Internacional.\n\nPlan B Integral: Emergencias médicas 24hs; Urgencias médica 24hs.; Visita programada a domicilio (con copago); Urgencia odontológica nocturna en la SOLP; Gabinete de enfermería en SUM de 9-16 hs. (c/orden médica); Descuentos comerciales; Electrocardiograma programado a domicilio (c/orden médica); Enfermería programada a domicilio (c/orden médica); Descuentos farmacias; Médico de familia; SUM Especialistas; Vehículo protegido (uno por núcleo familiar); Radiografías programadas a domicilio. SIEM - Cobertura Nacional e Internacional.\n\nAB Premium: Emergencias médicas 24 hs.; Urgencias médicas 24 hs.; Visita Médica Programada con turno (SIN copago); Urgencias Odontológicas Nocturnas (en la SOLP); Gabinete de enfermería (Pza. Italia de 9 a 16 hs. / Con orden médica); Enfermería Programada a Domicilio (10 atenciones con orden médica); Médico de Familia; Sum Especialistas (arancel preferencial); Radiografías Programadas a Domicilio (arancel preferencial); Electrocardiogramas Programados a Domicilio; Descuentos comerciales; FarmaSUM (descuentos en farmacias); Traslados Programados de Baja Complejidad (dos por mes); Vehículo Protegido (2 por grupo familiar); SIEM - Cobertura Nacional e Internacional.`,
  },
  {
    number: "12",
    title: "DESCRIPCIÓN DE SERVICIOS CONFORME PLANES",
    content: `Emergencias y Urgencias médicas: Cobertura las 24 hs., durante los 365 días del año. SUM SA lo cubre con Unidades de Terapia Intensiva Móvil (UTIM), equipados con toda la tecnología requerida y con un jerarquizado cuerpo de profesionales médicos y enfermeros. Para solicitar el servicio, deberá comunicarse a los teléfonos: (0221) 421-1226 y (0221) 421-2234.\n\nVisita Médica Domiciliaria: Orientado a la atención de enfermedades que no constituyen una emergencia médica. Se deberá abonar un Copago que se adicionará a la cuota del mes próximo siguiente (excepto en el Plan AB). Para solicitarlo: (0221) 483-9781.\n\nUrgencias Odontológicas: Funciona en el Servicio de Guardia (SEGU) de la Sociedad Odontológica de La Plata (SOLP), sito en Av. 13 Nº 680 e/45 y 46. Previa autorización telefónica del Despacho de Radio-Operaciones de SUM SA.\n\nGabinete de enfermería: Para inyecciones, control de presión, nebulizaciones y curaciones. Requiere orden médica. Funciona en Plaza Italia 183, La Plata, de lunes a viernes de 9 a 16 hs.\n\nElectrocardiogramas programados a domicilio: Requiere orden médica. Horario: lunes a viernes de 8 a 16 hs.\n\nEnfermería Programada Domicilio: Mismas condiciones que el Gabinete de enfermería. Incluye diez prácticas mensuales por persona (Planes B y AB). Para socios nuevos tiene carencia de 30 días.\n\nFarmaSUM y Descuentos comerciales: Ver farmacias y comercios adheridos en nuestra web oficial.\n\nTraslados programados: El socio podrá hacer uso de traslados programados con tarifa preferencial. Solicitarlos con 48 hs. de antelación. Los de baja complejidad solo están incluidos en el Plan AB (dos por mes, con carencia de 30 días para socios nuevos).\n\nSUM Especialistas y Médico de familia: Funciona en consultorio. Arancel preferencial para afiliados. Ver cartilla en web oficial.\n\nRadiografías programadas a domicilio: Arancel preferencial para socios. Requiere orden médica donde se indique que debe ser a domicilio.`,
  },
  {
    number: "13",
    title: "FORMA DE PROCEDER A LA DESAFILIACIÓN AL SERVICIO (BAJA)",
    content: `La baja se podrá gestionar a través de la sección de Contacto de nuestra web; o a través del botón específico de "Baja / Desafiliación del servicio" incluido en la página principal de nuestra web oficial.`,
  },
  {
    number: "14",
    title: "DESAFILIACIÓN POR FALTA DE PAGO. SUSPENSIÓN DEL SERVICIO",
    content: `SUM puede proceder a rescindir el contrato con un afiliado en caso de que éste incurra en la falta de pago de tres cuotas consecutivas. Sin perjuicio de ello, luego de transcurridos 10 días del vencimiento de la cuota mensual SUM estará facultado a proceder a la suspensión del servicio hasta tanto el pago sea regularizado.`,
  },
  {
    number: "15",
    title: "ENFERMEDADES PREEXISTENTES O ENFERMEDADES SECUELARES",
    content: `Se entenderá por enfermedad o situación preexistente, aquella que el afiliado padeciera al momento de suscribir la declaración jurada de salud. Se entenderá por patología secuelas, aquellas que sean consecuencia de tratamientos médicos de cualquier tipo. No tendrán cobertura las enfermedades y/o situaciones y/o patologías secuelares preexistentes, excepto las que hubieran sido debidamente informadas por el solicitante en la declaración jurada de salud y fueran expresamente aceptadas por SUM.`,
  },
  {
    number: "16",
    title: "ACLARACIONES TERMINOLÓGICAS",
    content: `Cargo/Copago (CC): importe que debe abonar el afiliado para acceder a una determinada prestación médico asistencial.\n\nTope: Cantidad de prestaciones médico asistenciales cubiertas por plan por persona o grupo según el caso en un determinado plazo de tiempo.`,
  },
  {
    number: "17",
    title: "NOTIFICACIONES Y JURISDICCIÓN",
    content: `Las comunicaciones que se cursen las partes podrán realizarse a SUM S.A. a través de cualquiera de los canales indicados en punto 13 y al afiliado al domicilio o a la casilla de mail indicados en la solicitud de ingreso. Para cualquier divergencia las partes se someten a la jurisdicción de los Tribunales Ordinarios de la Ciudad de La Plata con exclusión de todo otro fuero o jurisdicción.`,
  },
];

export default function TerminosPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="grow bg-background pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">

          {/* Header */}
          <div className="mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-secondary mb-3">Legal</p>
            <h1 className="text-4xl font-black text-primary uppercase tracking-tight mb-4">
              Términos y Condiciones
            </h1>
            <p className="text-primary/60 font-medium text-sm leading-relaxed max-w-2xl">
              Contrato de Adhesión Afiliatoria SUM S.A. — Cumplimiento Art. 38 Ley 24.240 y Arts. 1°, 2º y 3º de la Resolución Nº 271/20 de la Secretaría de Comercio Interior. Ley 26.682 Decreto 1993/2011.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-8">
            {SECTIONS.map((section) => (
              <div key={section.number} className="p-8 bg-surface rounded-3xl border border-border">
                <div className="flex items-start gap-5">
                  <span className="w-9 h-9 rounded-xl bg-secondary/10 text-secondary font-black text-sm flex items-center justify-center shrink-0">
                    {section.number}
                  </span>
                  <div>
                    <h2 className="font-black text-primary text-sm uppercase tracking-tight mb-3">
                      {section.title}
                    </h2>
                    {section.content.split("\n\n").map((paragraph, i) => (
                      <p key={i} className="text-primary/60 text-sm font-medium leading-relaxed mb-3 last:mb-0">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Descarga PDF */}
          <div className="mt-10 flex justify-center">
            <a
              href="/Términos y Condiciones.pdf"
              download
              className="inline-flex items-center gap-3 px-8 py-4 bg-secondary text-white rounded-2xl font-bold hover:bg-secondary-dark transition-all shadow-lg hover:-translate-y-0.5"
            >
              <Download size={18} />
              Descargar Términos y Condiciones (PDF)
            </a>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
