import { Suspense } from "react";

import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { MetaPixel } from "@/components/analytics/MetaPixel";
import { MetaPixelNoscript } from "@/components/analytics/MetaPixelNoscript";

/**
 * Chrome del sitio público.
 *
 * El pixel de Meta y el botón flotante de WhatsApp viven acá y no en el layout
 * raíz para que el panel de administración no los cargue: no es tráfico de
 * campaña ni corresponde ofrecer contacto por WhatsApp ahí.
 *
 * Separarlo por layout y no con un condicional sobre el pathname es lo que
 * evita el error de hidratación: MetaPixel usa useSearchParams() dentro de un
 * Suspense, y devolver null según la ruta hacía que el servidor y el cliente
 * armaran árboles distintos.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  // Se lee acá, en el servidor, y baja por prop: así la variable no necesita el
  // prefijo NEXT_PUBLIC_ para llegar al componente de cliente.
  const pixelId = process.env.META_PIXEL_ID ?? "1074134285367824";

  return (
    <>
      <MetaPixelNoscript pixelId={pixelId} />
      <Suspense fallback={null}>
        <MetaPixel pixelId={pixelId} />
      </Suspense>
      <div className="flex min-h-screen flex-col">{children}</div>
      <FloatingWhatsApp />
    </>
  );
}
