"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * El ID llega por prop desde el layout (componente de servidor) en lugar de
 * leerse acá con process.env: sin el prefijo NEXT_PUBLIC_ la variable no existe
 * en el bundle del navegador, y así ninguna var de entorno queda expuesta.
 */
export function MetaPixel({ pixelId: PIXEL_ID }: { pixelId: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // El script inline ya dispara el PageView de la carga inicial: el efecto
  // sólo debe cubrir las navegaciones cliente del App Router.
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (!PIXEL_ID) return;
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    window.fbq?.("track", "PageView");
  }, [pathname, searchParams, PIXEL_ID]);

  if (!PIXEL_ID) return null;

  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
// El snippet oficial asume que siempre hay un <script> con padre en el
// documento. Si un bloqueador lo quitó, s es null y rompe con
// "Cannot read properties of null (reading 'parentNode')".
if(s&&s.parentNode){s.parentNode.insertBefore(t,s)}else{(b.head||b.documentElement).appendChild(t)}}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${PIXEL_ID}');
fbq('track', 'PageView');
      `}
    </Script>
  );
}
