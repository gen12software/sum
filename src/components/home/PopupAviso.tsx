"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { getAspectoCarrusel, type NovedadImagen } from "@/lib/novedades/types";
import { esEnlaceExterno, estaVigente, type Popup } from "@/lib/popup/types";

/**
 * El aviso emergente del inicio.
 *
 * Recibe el contenido por props desde el server component: no consulta la base
 * ni al montarse ni después. El home es una página estática y el aviso viaja
 * embebido en ella, así que mostrarlo no cuesta ninguna llamada extra.
 *
 * El modal es un <dialog> nativo abierto con showModal(): de ahí salen gratis
 * el foco atrapado, el cierre con Escape, el ::backdrop y la capa superior por
 * encima de cualquier z-index. Solo se agregan a mano el cierre por clic en el
 * fondo y el bloqueo del scroll.
 */

/** Que la apertura no le tape el home al visitante apenas llega. */
const RETARDO_APERTURA_MS = 600;

/** Que una imagen muy alta no exceda la ventana, ni siquiera en un teléfono. */
const ALTURA_MAXIMA = "min(72vh, 620px)";

/** Tope de ancho en pantallas grandes, para que un aviso apaisado no domine. */
const ANCHO_MAXIMO = "560px";

/** Prefijo de la marca en sessionStorage. Se completa con la versión. */
const CLAVE = "sum:popup";

/**
 * La versión forma parte de la clave a propósito: si el administrador cambia
 * el aviso, quien ya había cerrado el anterior tiene que ver el nuevo.
 */
function yaCerrado(version: string): boolean {
  try {
    return sessionStorage.getItem(`${CLAVE}:${version}`) !== null;
  } catch {
    // Almacenamiento bloqueado: preferible mostrar el aviso de más que romper
    // el home por una comprobación accesoria.
    return false;
  }
}

function marcarCerrado(version: string): void {
  try {
    sessionStorage.setItem(`${CLAVE}:${version}`, "1");
  } catch {
    // Sin persistencia el aviso reaparece en la próxima carga. Molesto, pero
    // inofensivo: no es motivo para interrumpir nada.
  }
}

function Carrusel({ imagenes }: { imagenes: NovedadImagen[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [actual, setActual] = useState(0);

  const irA = useCallback(
    (index: number) => {
      const scroller = scrollerRef.current;
      if (!scroller) return;

      const destino = Math.max(0, Math.min(index, imagenes.length - 1));
      scroller.scrollTo({ left: scroller.clientWidth * destino, behavior: "smooth" });
    },
    [imagenes.length],
  );

  return (
    <>
      <div
        ref={scrollerRef}
        onScroll={(event) => {
          const scroller = event.currentTarget;
          setActual(Math.round(scroller.scrollLeft / scroller.clientWidth));
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            irA(actual + 1);
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            irA(actual - 1);
          }
        }}
        tabIndex={0}
        role="group"
        aria-label="Imágenes del aviso"
        className="flex h-full w-full snap-x snap-mandatory overflow-x-auto outline-none [scrollbar-width:none] focus-visible:ring-2 focus-visible:ring-accent [&::-webkit-scrollbar]:hidden"
      >
        {imagenes.map((imagen, index) => (
          <div key={imagen.path} className="relative h-full w-full shrink-0 snap-center">
            <Image
              src={imagen.url}
              alt={imagen.alt || `Aviso — imagen ${index + 1}`}
              fill
              sizes="(max-width: 640px) 92vw, 560px"
              // Sin prioridad y en carga diferida: el aviso no debe disputarle
              // ancho de banda a la imagen principal del inicio.
              loading="lazy"
              className="object-contain"
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => irA(actual - 1)}
        disabled={actual === 0}
        aria-label="Imagen anterior"
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/85 p-2 text-primary shadow-md backdrop-blur transition-opacity hover:bg-white disabled:pointer-events-none disabled:opacity-0"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        type="button"
        onClick={() => irA(actual + 1)}
        disabled={actual === imagenes.length - 1}
        aria-label="Imagen siguiente"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/85 p-2 text-primary shadow-md backdrop-blur transition-opacity hover:bg-white disabled:pointer-events-none disabled:opacity-0"
      >
        <ChevronRight size={20} />
      </button>

      <div className="absolute inset-x-0 bottom-2 flex justify-center gap-1.5" aria-hidden="true">
        {imagenes.map((imagen, index) => (
          <button
            key={imagen.path}
            type="button"
            tabIndex={-1}
            onClick={() => irA(index)}
            className={`h-1.5 rounded-full transition-all ${
              index === actual ? "w-5 bg-primary" : "w-1.5 bg-primary/25 hover:bg-primary/45"
            }`}
          />
        ))}
      </div>

      <p className="sr-only" role="status">
        Imagen {actual + 1} de {imagenes.length}
      </p>
    </>
  );
}

export function PopupAviso({ popup }: { popup: Popup }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [abierto, setAbierto] = useState(false);

  const cerrar = useCallback(() => {
    marcarCerrado(popup.updated_at);
    dialogRef.current?.close();
    setAbierto(false);
  }, [popup.updated_at]);

  useEffect(() => {
    // La vigencia se evalúa acá, contra el reloj del visitante, y no al generar
    // la página: el home es estático y solo se regenera al guardar desde el
    // panel, así que un filtro por fecha del lado del servidor dejaría un aviso
    // vencido colgado hasta la próxima edición.
    if (!estaVigente(popup)) return;
    if (yaCerrado(popup.updated_at)) return;

    const timer = setTimeout(() => {
      dialogRef.current?.showModal();
      setAbierto(true);
    }, RETARDO_APERTURA_MS);

    return () => clearTimeout(timer);
  }, [popup]);

  useEffect(() => {
    if (!abierto) return;

    // showModal() ya inhibe la interacción con el fondo, pero no su scroll.
    const previo = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previo;
    };
  }, [abierto]);

  const imagenes = [...popup.imagenes].sort((a, b) => a.orden - b.orden);
  const unica = imagenes.length === 1;

  // La caja se calcula sobre todo el conjunto: si cada diapositiva tuviera su
  // altura, el aviso saltaría de tamaño al navegar entre imágenes.
  const aspecto = getAspectoCarrusel(imagenes);

  const contenido = (
    <div
      style={{ aspectRatio: aspecto }}
      className="relative w-full overflow-hidden bg-surface"
    >
      {unica ? (
        <Image
          src={imagenes[0].url}
          alt={imagenes[0].alt || "Aviso"}
          fill
          sizes="(max-width: 640px) 92vw, 560px"
          loading="lazy"
          className="object-contain"
        />
      ) : (
        <Carrusel imagenes={imagenes} />
      )}
    </div>
  );

  return (
    <dialog
      ref={dialogRef}
      onClose={cerrar}
      onCancel={cerrar}
      // <dialog> no trae el cierre por clic en el fondo. El elemento ocupa todo
      // el modal, así que un clic sobre él —y no sobre el contenido de adentro—
      // es un clic en el backdrop.
      onClick={(event) => {
        if (event.target === dialogRef.current) cerrar();
      }}
      aria-label="Aviso"
      // El ancho se deriva del alto disponible y de la proporción de la imagen,
      // para que el marco la abrace en lugar de dejarle bandas blancas al
      // costado. Una imagen vertical acaba angosta y alta; una apaisada, ancha
      // y baja. Los tres términos acotan: el ancho de la ventana, la altura
      // máxima convertida a ancho por el aspecto, y el tope en pantallas
      // grandes.
      style={{
        width: `min(92vw, calc(${ALTURA_MAXIMA} * ${aspecto}), ${ANCHO_MAXIMO})`,
      }}
      className="m-auto overflow-hidden rounded-2xl bg-white p-0 shadow-premium backdrop:bg-black/60 backdrop:backdrop-blur-sm"
    >
      <div className="relative">
        <button
          type="button"
          onClick={cerrar}
          aria-label="Cerrar el aviso"
          className="absolute right-2 top-2 z-10 rounded-full bg-black/55 p-2 text-white transition-colors hover:bg-black/75"
        >
          <X size={18} />
        </button>

        {popup.enlace ? (
          esEnlaceExterno(popup.enlace) ? (
            <a
              href={popup.enlace}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
              aria-label="Ver más sobre este aviso"
            >
              {contenido}
            </a>
          ) : (
            <Link
              href={popup.enlace}
              onClick={cerrar}
              className="block"
              aria-label="Ver más sobre este aviso"
            >
              {contenido}
            </Link>
          )
        ) : (
          contenido
        )}
      </div>
    </dialog>
  );
}
