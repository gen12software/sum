import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Dirección Nacional de Datos Personales | SUM",
  description: "Información sobre el tratamiento de datos personales de SUM S.A. conforme a la Ley N° 25.326.",
  alternates: { canonical: "/datos-personales" },
};

export default function DatosPersonalesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="grow bg-background pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-3xl">

          {/* Header */}
          <div className="mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-secondary mb-3">Legal</p>
            <h1 className="text-4xl font-black text-primary uppercase tracking-tight mb-4">
              Dirección Nacional de Datos Personales
            </h1>
            <p className="text-primary/50 text-sm font-medium">Ley N° 25.326 — Protección de Datos Personales</p>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div className="p-8 bg-surface rounded-3xl border border-border">
              <p className="text-primary/70 text-sm font-medium leading-relaxed">
                Los datos aportados forman parte de un banco de datos de <strong className="text-primary">SUM S.A.</strong>, con domicilio en Plaza Italia 183, ciudad de La Plata, y serán tratados para brindar servicios a los asociados. El titular de los datos personales no se encuentra obligado a proporcionar datos sensibles. Asimismo, el titular se responsabiliza por la exactitud de los datos proporcionados.
              </p>
            </div>

            <div className="p-8 bg-surface rounded-3xl border border-border">
              <p className="text-primary/70 text-sm font-medium leading-relaxed">
                El titular de los datos personales tiene la facultad de ejercer el derecho de acceso a los mismos en forma gratuita, a intervalos no inferiores a seis meses, salvo que se acredite un interés legítimo al efecto, conforme lo establecido en el <strong className="text-primary">artículo 14, inciso 3 de la Ley N° 25.326</strong>.
              </p>
            </div>

            <div className="p-8 bg-surface rounded-3xl border border-border">
              <p className="text-primary/70 text-sm font-medium leading-relaxed mb-5">
                La <strong className="text-primary">AGENCIA DE ACCESO A LA INFORMACIÓN PÚBLICA</strong>, en su carácter de Órgano de Control de la Ley N° 25.326, tiene la atribución de atender las denuncias y reclamos que interpongan quienes resulten afectados en sus derechos por incumplimiento de las normas vigentes en materia de protección de datos personales.
              </p>
              <a
                href="https://www.argentina.gob.ar/aaip"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-secondary/10 text-secondary rounded-xl font-bold text-sm hover:bg-secondary/20 transition-colors"
              >
                <ExternalLink size={15} />
                www.argentina.gob.ar/aaip
              </a>
            </div>

            <div id="resolucion" className="p-8 bg-surface rounded-3xl border border-border scroll-mt-32">
              <h2 className="font-black text-primary text-sm uppercase tracking-tight mb-4">
                Resolución del Director Nacional de Defensa Del Consumidor y Arbitraje del Consumo
              </h2>
              <p className="text-primary/70 text-sm font-medium leading-relaxed mb-4">
                En expediente administrativo caratulado <strong className="text-primary">"EX-2021-35192336-APN-DGD#MDP"</strong>, en trámite por ante el entonces Ministerio de Desarrollo Productivo de la Nación, con fecha 6 de diciembre de 2021, se dictó la <strong className="text-primary">"DI-2021-816-APN-DNDCYAC#MDP"</strong>:
              </p>
              <div className="bg-primary/5 border border-border rounded-2xl p-6 space-y-4 text-xs text-primary/60 font-medium leading-relaxed">
                <p><strong className="text-primary">ARTÍCULO 1°.</strong> Impónese sanción de multa por la suma de PESOS UN MILLÓN NOVECIENTOS MIL ($ 1.900.000) a la firma SUM S.A., CUIT N° 30-61140404-9, con domicilio en la calle Plaza Italia 183, de la localidad de La Plata, provincia de Buenos Aires, por infracción al artículo 38, párrafo segundo, de la Ley N° 24.240, a los artículos 1°, 2° y 3° de la Resolución SCI N° 271/20, al artículo 1° de la Resolución SC N° 316/18 (modificada por Resolución SCI N° 271/20), ambas reglamentarias de la Ley N° 24.240, y al artículo 8°, segundo párrafo, de la misma ley, toda vez que no incluyó en el sitio web a través del cual ofrece los bienes y servicios que comercializa los modelos de contrato de adhesión a suscribir por los consumidores, por no incluir el "botón de baja" del servicio, y por no adecuar el sitio web a través del cual ofrece los bienes y servicios que comercializa, a las precisiones estipuladas en las citadas normas, en lo que respecta a la información sobre el número de CUIT de la empresa.</p>
                <p><strong className="text-primary">ARTÍCULO 2°.</strong> La firma infractora deberá abonar la multa impuesta por la presente medida en el plazo de DIEZ (10) días hábiles a través del sistema E-Recauda Sistema de Recaudación de la Administración Pública Nacional, indicando: ENTIDAD RECEPTORA: "Ministerio de Desarrollo Productivo" (362); CONCEPTO DE PAGO: "Secretaria de Comercio Interior - Multas", "Multa Ley 24.240 – Ley de Defensa del Consumidor". Efectuado el pago, el mismo deberá acreditarse en el expediente, a través de la Plataforma "Trámites a Distancia" (TAD) del sistema de Gestión Documental Electrónica (GDE), ingresando en la página web <a href="https://tramitesadistancia.gob.ar" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">https://tramitesadistancia.gob.ar</a> con su CUIL y clave fiscal.</p>
                <p><strong className="text-primary">ARTÍCULO 3°.</strong> La infractora deberá publicar la parte dispositiva de la presente a su costa, de acuerdo a lo establecido en el Artículo 47 de la Ley N° 24.240 de Defensa del Consumidor, debiendo acreditar dicha publicación en este expediente en el plazo de CINCO (5) días hábiles bajo apercibimiento de que la Autoridad de Aplicación la efectúe a su costa.</p>
                <p><strong className="text-primary">ARTÍCULO 4°.</strong> Hágase saber a la sancionada que la presente disposición condenatoria podrá ser impugnada solamente por vía de Recurso Directo ante la Cámara correspondiente. El recurso deberá interponerse y fundarse ante la misma autoridad que impuso la sanción, dentro de los DIEZ (10) días hábiles de notificada la resolución. En todos los casos, para interponer el recurso directo contra una resolución administrativa que imponga sanción de multa, deberá depositarse el monto de la multa impuesta a la orden de la autoridad que la dispuso, y presentar el comprobante del depósito con el escrito del recurso, sin cuyo requisito será desestimado, salvo que el cumplimiento del mismo pudiese ocasionar un perjuicio irreparable al recurrente, conforme lo establecido en el Artículo 45 de la Ley N° 24.240 de Defensa del Consumidor.</p>
                <p><strong className="text-primary">ARTÍCULO 5°.</strong> Notifíquese a la firma sancionada.</p>
                <p><strong className="text-primary">ARTÍCULO 6°.</strong> Regístrese, comuníquese y archívese.</p>
              </div>
            </div>

          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
