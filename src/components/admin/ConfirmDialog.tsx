"use client";

import { useEffect, useRef } from "react";
import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/admin/ui";

type Props = {
  open: boolean;
  titulo: string;
  mensaje: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

/**
 * Diálogo de confirmación para acciones irreversibles.
 *
 * Usa <dialog> nativo: trae el foco atrapado, el cierre con Escape y la capa de
 * fondo sin necesidad de implementarlos a mano.
 */
export function ConfirmDialog({
  open,
  titulo,
  mensaje,
  confirmLabel = "Confirmar",
  onConfirm,
  onCancel,
}: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onCancel={(event) => {
        event.preventDefault();
        onCancel();
      }}
      onClick={(event) => {
        // Un click fuera del panel cierra el diálogo.
        if (event.target === ref.current) onCancel();
      }}
      // m-auto es lo que centra el diálogo. El navegador lo hace con
      // `margin: auto` sobre un <dialog>:modal, pero el preflight de Tailwind
      // resetea el margen de todos los elementos y lo deja pegado arriba a la
      // izquierda. Hay que reponerlo a mano.
      className="m-auto max-w-sm rounded-2xl border border-border bg-white p-0 shadow-premium backdrop:bg-primary/30 backdrop:backdrop-blur-sm"
    >
      <div className="p-6">
        <div className="mb-3 flex items-center gap-2.5">
          <span className="rounded-lg bg-red-50 p-2 text-red-600">
            <AlertTriangle size={16} />
          </span>
          <h2 className="text-base font-black tracking-tight text-primary">{titulo}</h2>
        </div>

        <p className="text-sm font-medium leading-relaxed text-primary/55">{mensaje}</p>

        <div className="mt-6 flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="button" variant="danger" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </dialog>
  );
}
