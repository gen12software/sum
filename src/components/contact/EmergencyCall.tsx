"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { PhoneCall, Smartphone } from "lucide-react";

import { EMERGENCY_PHONES } from "@/lib/contact";

/**
 * Un `tel:` en escritorio abre el diálogo "¿Abrir Elegir una aplicación?" del
 * navegador, que no le sirve a nadie. Detectamos la capacidad de llamar por
 * puntero grueso (táctil) en vez de sniffear el user-agent.
 *
 * Arranca en `true` a propósito: hasta que hidrata, el enlace se comporta como
 * hoy, así un teléfono sin JS sigue pudiendo llamar.
 */
const PUNTERO_TACTIL = "(pointer: coarse)";

function useCanCall() {
  const subscribe = useCallback((onChange: () => void) => {
    const query = window.matchMedia(PUNTERO_TACTIL);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(PUNTERO_TACTIL).matches,
    // En el servidor asumimos que puede llamar: así el HTML inicial conserva el
    // `tel:` y un teléfono sin JS sigue funcionando.
    () => true,
  );
}

/**
 * Aviso de escritorio. Usa <dialog> nativo: el foco queda atrapado, Escape
 * cierra y al cerrarse el navegador devuelve el foco al botón que lo abrió.
 */
function SoloCelularDialog({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    ref.current?.showModal();
  }, []);

  return (
    <dialog
      ref={ref}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === ref.current) onClose();
      }}
      // m-auto repone el centrado que el preflight de Tailwind le saca al <dialog>.
      className="m-auto max-w-sm rounded-2xl border border-border bg-white p-0 shadow-premium backdrop:bg-primary/30 backdrop:backdrop-blur-sm"
    >
      <div className="p-6">
        <div className="mb-3 flex items-center gap-2.5">
          <span className="rounded-lg bg-secondary/10 p-2 text-secondary">
            <Smartphone size={16} />
          </span>
          <h2 className="text-base font-black tracking-tight text-primary">
            Función exclusiva para celulares
          </h2>
        </div>

        <p className="text-sm font-medium leading-relaxed text-primary/55">
          La llamada directa sólo está disponible desde un celular. Si estás en una
          computadora, marcá el número desde tu teléfono.
        </p>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-secondary px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-secondary-dark"
          >
            Entendido
          </button>
        </div>
      </div>
    </dialog>
  );
}

type EmergencyCallLinkProps = {
  tel: string;
  className?: string;
  "aria-label"?: string;
  children: React.ReactNode;
};

/**
 * Enlace de llamada que, en escritorio, muestra el aviso en vez de disparar el
 * `tel:`.
 */
export function EmergencyCallLink({
  tel,
  className,
  children,
  ...rest
}: EmergencyCallLinkProps) {
  const canCall = useCanCall();
  const [avisoAbierto, setAvisoAbierto] = useState(false);

  return (
    <>
      <a
        href={`tel:${tel}`}
        className={className}
        onClick={(event) => {
          if (canCall) return;
          event.preventDefault();
          setAvisoAbierto(true);
        }}
        {...rest}
      >
        {children}
      </a>
      {avisoAbierto && <SoloCelularDialog onClose={() => setAvisoAbierto(false)} />}
    </>
  );
}

type EmergencyPhonesProps = {
  /** Clase del contenedor. Por defecto apila en mobile y alinea en fila desde sm. */
  className?: string;
  /** Clase de cada número. */
  itemClassName?: string;
  /** Muestra el ícono de teléfono junto a cada número. */
  conIcono?: boolean;
  iconSize?: number;
};

/**
 * Las dos líneas de la cabina de despacho, una debajo de la otra en mobile.
 */
export function EmergencyPhones({
  className = "flex flex-col sm:flex-row sm:flex-wrap gap-3",
  itemClassName,
  conIcono = false,
  iconSize = 18,
}: EmergencyPhonesProps) {
  return (
    <div className={className}>
      {EMERGENCY_PHONES.map((phone) => (
        <EmergencyCallLink
          key={phone.tel}
          tel={phone.tel}
          className={itemClassName}
          aria-label={`Llamar al ${phone.display}`}
        >
          {conIcono && <PhoneCall size={iconSize} />}
          {phone.display}
        </EmergencyCallLink>
      ))}
    </div>
  );
}
