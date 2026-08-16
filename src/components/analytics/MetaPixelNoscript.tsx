/**
 * Beacon de imagen para visitantes sin JavaScript.
 *
 * Va separado de <MetaPixel /> y fuera del <Suspense>: ese boundary hace
 * bailout a cliente por usar useSearchParams, y todo lo que quede adentro
 * desaparece del HTML prerenderizado — justo el caso que este fallback cubre.
 */
export function MetaPixelNoscript({ pixelId: PIXEL_ID }: { pixelId: string }) {
  if (!PIXEL_ID) return null;

  return (
    <noscript>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        height="1"
        width="1"
        style={{ display: "none" }}
        alt=""
        src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
      />
    </noscript>
  );
}
