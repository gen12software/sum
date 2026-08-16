"use client";

import Image from "next/image";
import { useRef } from "react";

import { FOCO_PREDETERMINADO, type HeroImagen } from "@/lib/hero/types";

/**
 * Control de encuadre de una imagen del carrusel.
 *
 * El carrusel muestra cada imagen a sangre completa: la recorta para llenar el
 * espacio, y ese espacio tiene proporciones muy distintas en escritorio y en
 * celular. El punto focal decide qué parte sobrevive al recorte, y estas
 * vistas previas son la única forma de juzgarlo antes de publicar.
 */

/**
 * Proporciones que reproduce cada vista previa.
 *
 * Salen de las medidas reales del carrusel en [Hero.tsx]: en escritorio ocupa
 * el alto de la ventana menos la barra de navegación, en celular 60svh. Son
 * aproximaciones representativas —la ventana de cada visitante varía—, y su
 * valor está en el contraste entre las dos: lo que entra en una y no en la
 * otra.
 */
const VISTAS = [
  { id: "escritorio", etiqueta: "En computadora", ratio: 16 / 9 },
  { id: "celular", etiqueta: "En celular", ratio: 9 / 14 },
] as const;

const ATAJOS = [
  { etiqueta: "Arriba", foco: "50% 0%" },
  { etiqueta: "Centro", foco: "50% 50%" },
  { etiqueta: "Abajo", foco: "50% 100%" },
] as const;

/** `"50% 0%"` → `{ x: 50, y: 0 }`. Ante cualquier rareza, vuelve al centro. */
function parsearFoco(foco: string): { x: number; y: number } {
  const match = foco.match(/^([\d.]+)%\s+([\d.]+)%$/);
  if (!match) return { x: 50, y: 50 };

  return { x: Number(match[1]), y: Number(match[2]) };
}

function formatearFoco(x: number, y: number): string {
  // Sin decimales: el clic da precisión de sobra y un valor redondo es más
  // fácil de reconocer y de comparar entre imágenes.
  return `${Math.round(x)}% ${Math.round(y)}%`;
}

/**
 * Qué franja de la imagen sobrevive a un recorte dado, en porcentaje de la
 * imagen original.
 *
 * Es la cuenta que hace `object-fit: cover`: la imagen se escala hasta cubrir
 * el marco, y sobra en un solo eje. Si la imagen es más apaisada que el marco,
 * sobra a los costados; si es más alta, sobra arriba y abajo. El punto focal
 * decide dónde cae la franja que queda.
 */
function franjaVisible(
  ratioImagen: number,
  ratioMarco: number,
  foco: { x: number; y: number },
) {
  if (ratioImagen > ratioMarco) {
    // Sobra ancho: se ve todo el alto y una franja vertical del ancho.
    const visible = (ratioMarco / ratioImagen) * 100;
    const inicio = ((100 - visible) * foco.x) / 100;
    return { left: inicio, width: visible, top: 0, height: 100 };
  }

  // Sobra alto: se ve todo el ancho y una franja horizontal del alto.
  const visible = (ratioImagen / ratioMarco) * 100;
  const inicio = ((100 - visible) * foco.y) / 100;
  return { left: 0, width: 100, top: inicio, height: visible };
}

/**
 * La zona segura: lo que se ve en escritorio Y en celular a la vez.
 *
 * Es la intersección de las dos franjas. Lo que cae afuera se ve en una
 * pantalla y no en la otra, que es justo el error difícil de detectar cuando
 * el texto viene incorporado en la imagen.
 *
 * Sin dimensiones no se puede calcular: devuelve null y la vista previa se
 * muestra sin el recuadro, que sigue siendo útil.
 */
function zonaSegura(imagen: HeroImagen, foco: { x: number; y: number }) {
  if (!imagen.ancho || !imagen.alto) return null;

  const ratioImagen = imagen.ancho / imagen.alto;
  const franjas = VISTAS.map((vista) => franjaVisible(ratioImagen, vista.ratio, foco));

  const left = Math.max(...franjas.map((f) => f.left));
  const right = Math.min(...franjas.map((f) => f.left + f.width));
  const top = Math.max(...franjas.map((f) => f.top));
  const bottom = Math.min(...franjas.map((f) => f.top + f.height));

  if (right <= left || bottom <= top) return null;

  return { left, top, width: right - left, height: bottom - top };
}

function VistaPrevia({
  imagen,
  foco,
  vista,
  onFoco,
}: {
  imagen: HeroImagen;
  foco: { x: number; y: number };
  vista: (typeof VISTAS)[number];
  onFoco: (x: number, y: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  /**
   * El clic ocurre sobre el marco, que muestra un recorte de la imagen. Para
   * traducirlo a un punto focal hay que ir del marco a la imagen completa: se
   * ubica el clic dentro de la franja visible y se lleva ese punto al eje que
   * el foco controla.
   */
  function fijar(event: React.MouseEvent<HTMLDivElement>) {
    const marco = ref.current?.getBoundingClientRect();
    if (!marco) return;

    if (!imagen.ancho || !imagen.alto) {
      // Sin dimensiones no hay cómo hacer la cuenta exacta: el clic al menos
      // mueve el foco de forma directa, que es mejor que no responder.
      onFoco(
        ((event.clientX - marco.left) / marco.width) * 100,
        ((event.clientY - marco.top) / marco.height) * 100,
      );
      return;
    }

    const ratioImagen = imagen.ancho / imagen.alto;
    const franja = franjaVisible(ratioImagen, vista.ratio, foco);

    const xEnMarco = ((event.clientX - marco.left) / marco.width) * 100;
    const yEnMarco = ((event.clientY - marco.top) / marco.height) * 100;

    // Punto elegido, en coordenadas de la imagen completa.
    const xEnImagen = franja.left + (xEnMarco * franja.width) / 100;
    const yEnImagen = franja.top + (yEnMarco * franja.height) / 100;

    // El foco solo manda en el eje donde sobra imagen; en el otro, cualquier
    // valor da el mismo resultado y conviene no moverlo.
    if (franja.width < 100) {
      const margen = 100 - franja.width;
      onFoco(margen === 0 ? 50 : ((xEnImagen - franja.width / 2) / margen) * 100, foco.y);
    } else if (franja.height < 100) {
      const margen = 100 - franja.height;
      onFoco(foco.x, margen === 0 ? 50 : ((yEnImagen - franja.height / 2) / margen) * 100);
    }
  }

  const segura = zonaSegura(imagen, foco);
  const franja = imagen.ancho && imagen.alto
    ? franjaVisible(imagen.ancho / imagen.alto, vista.ratio, foco)
    : null;

  // La zona segura se calcula sobre la imagen completa; para dibujarla acá hay
  // que expresarla respecto de la franja que este marco muestra.
  const seguraEnMarco =
    segura && franja
      ? {
          left: ((segura.left - franja.left) / franja.width) * 100,
          top: ((segura.top - franja.top) / franja.height) * 100,
          width: (segura.width / franja.width) * 100,
          height: (segura.height / franja.height) * 100,
        }
      : null;

  return (
    <div className="min-w-0 flex-1">
      <p className="mb-1.5 text-[11px] font-black uppercase tracking-widest text-primary/45">
        {vista.etiqueta}
      </p>

      <div
        ref={ref}
        onClick={fijar}
        role="presentation"
        title="Hacé clic sobre la parte que querés mantener a la vista"
        className="relative w-full cursor-crosshair overflow-hidden rounded-lg border border-border bg-surface"
        style={{ aspectRatio: String(vista.ratio) }}
      >
        <Image
          src={imagen.url}
          alt=""
          fill
          sizes="(max-width: 640px) 50vw, 320px"
          className="object-cover"
          style={{ objectPosition: formatearFoco(foco.x, foco.y) }}
        />

        {/* El mismo degradado que el sitio pone sobre el carrusel: sin él, la
            vista previa miente justo en la zona donde suele caer el texto. */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

        {seguraEnMarco && (
          <div
            className="pointer-events-none absolute border-2 border-dashed border-white/70"
            style={{
              left: `${seguraEnMarco.left}%`,
              top: `${seguraEnMarco.top}%`,
              width: `${seguraEnMarco.width}%`,
              height: `${seguraEnMarco.height}%`,
            }}
          />
        )}
      </div>
    </div>
  );
}

export function HeroEncuadre({
  imagen,
  onChange,
}: {
  imagen: HeroImagen;
  onChange: (foco: string) => void;
}) {
  const foco = parsearFoco(imagen.foco || FOCO_PREDETERMINADO);

  function fijar(x: number, y: number) {
    onChange(formatearFoco(Math.min(100, Math.max(0, x)), Math.min(100, Math.max(0, y))));
  }

  // Una imagen más alta que ancha se recorta muchísimo en escritorio: entra su
  // franja central y poco más. Vale la pena decirlo antes de que se publique.
  const vertical = Boolean(imagen.ancho && imagen.alto && imagen.ancho / imagen.alto < 1.2);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-black uppercase tracking-widest text-primary/45">
          Encuadre
        </span>

        {ATAJOS.map((atajo) => {
          const activo = imagen.foco === atajo.foco;

          return (
            <button
              key={atajo.foco}
              type="button"
              onClick={() => onChange(atajo.foco)}
              aria-pressed={activo}
              className={`rounded-lg border px-2.5 py-1 text-xs font-bold transition-colors ${
                activo
                  ? "border-primary bg-primary text-white"
                  : "border-border bg-white text-primary/60 hover:border-accent"
              }`}
            >
              {atajo.etiqueta}
            </button>
          );
        })}
      </div>

      <div className="flex gap-3">
        {VISTAS.map((vista) => (
          <VistaPrevia
            key={vista.id}
            imagen={imagen}
            foco={foco}
            vista={vista}
            onFoco={fijar}
          />
        ))}
      </div>

      <p className="text-xs font-medium text-primary/45">
        Así se va a ver la imagen en cada pantalla. Hacé clic sobre la parte que querés mantener a
        la vista. Lo que queda dentro del recuadro punteado se ve en las dos.
      </p>

      {vertical && (
        <p className="rounded-lg bg-amber-50 px-3 py-2 text-xs font-medium text-amber-800">
          Esta imagen es más alta que ancha, así que en computadora se va a recortar bastante.
          Revisá que el texto entre dentro del recuadro punteado.
        </p>
      )}
    </div>
  );
}
