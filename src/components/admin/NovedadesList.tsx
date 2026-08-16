"use client";

import { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  DndContext,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Eye,
  EyeOff,
  FileText,
  FileVideo,
  GripVertical,
  Home,
  ImageIcon,
  Pencil,
  Plus,
  Star,
  Trash2,
} from "lucide-react";

import {
  eliminarNovedadAction,
  reordenarNovedadesAction,
  toggleDestacadaAction,
  togglePublicadaAction,
} from "@/lib/novedades/actions";
import { getExtracto, getPortada, type Novedad } from "@/lib/novedades/types";
import { Alert, Button } from "@/components/admin/ui";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";

function Fila({
  novedad,
  onToggle,
  onDelete,
  busy,
}: {
  novedad: Novedad;
  onToggle: (campo: "publicada" | "destacada", valor: boolean) => void;
  onDelete: () => void;
  busy: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: novedad.id,
  });

  const portada = getPortada(novedad);

  return (
    <li
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`flex items-start gap-3 rounded-2xl border border-border bg-white p-3 sm:items-center ${
        isDragging ? "z-10 shadow-premium" : ""
      } ${busy ? "opacity-60" : ""}`}
    >
      <button
        type="button"
        {...attributes}
        {...listeners}
        aria-label={`Reordenar ${novedad.titulo}`}
        className="mt-1 shrink-0 cursor-grab touch-none rounded-md p-1 text-primary/25 transition-colors hover:bg-primary/5 hover:text-primary/60 active:cursor-grabbing sm:mt-0"
      >
        <GripVertical size={18} />
      </button>

      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-surface sm:h-16 sm:w-16">
        {portada ? (
          <Image
            src={portada.url}
            alt=""
            fill
            sizes="64px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-primary/5">
            <ImageIcon size={16} className="text-primary/25" />
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-1.5">
          <h3 className="text-sm font-black tracking-tight text-primary">{novedad.titulo}</h3>

          {novedad.destacada && (
            <span className="inline-flex items-center gap-1 rounded-md bg-accent/10 px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-accent">
              <Star size={9} className="fill-current" />
              Destacada
            </span>
          )}

          <span
            className={`rounded-md px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wider ${
              novedad.publicada
                ? "bg-emerald-50 text-emerald-700"
                : "bg-primary/8 text-primary/50"
            }`}
          >
            {novedad.publicada ? "Activada" : "Desactivada"}
          </span>

          {novedad.mostrar_en_inicio && (
            <span className="inline-flex items-center gap-1 rounded-md bg-secondary/10 px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-secondary">
              <Home size={9} />
              En el inicio
            </span>
          )}

          {novedad.video_url && (
            <span className="inline-flex items-center gap-1 rounded-md bg-primary/8 px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-primary/50">
              <FileVideo size={9} />
              Video
            </span>
          )}
        </div>

        <p className="mt-0.5 line-clamp-1 text-xs font-medium text-primary/45">
          {getExtracto(novedad.descripcion, 90)}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-0.5">
        <button
          type="button"
          onClick={() => onToggle("destacada", !novedad.destacada)}
          disabled={busy}
          aria-label={novedad.destacada ? "Quitar de destacadas" : "Marcar como destacada"}
          title={novedad.destacada ? "Quitar de destacadas" : "Marcar como destacada"}
          className={`rounded-lg p-2 transition-colors hover:bg-primary/5 ${
            novedad.destacada ? "text-accent" : "text-primary/30"
          }`}
        >
          <Star size={16} className={novedad.destacada ? "fill-current" : ""} />
        </button>

        <button
          type="button"
          onClick={() => onToggle("publicada", !novedad.publicada)}
          disabled={busy}
          aria-label={novedad.publicada ? "Desactivar" : "Activar"}
          title={novedad.publicada ? "Desactivar" : "Activar"}
          className="rounded-lg p-2 text-primary/40 transition-colors hover:bg-primary/5 hover:text-primary"
        >
          {novedad.publicada ? <Eye size={16} /> : <EyeOff size={16} />}
        </button>

        <Link
          href={`/admin/novedades/${novedad.id}/ver`}
          aria-label={`Ver ${novedad.titulo}`}
          title="Ver"
          className="rounded-lg p-2 text-primary/40 transition-colors hover:bg-primary/5 hover:text-primary"
        >
          {/* No se usa Eye: ese icono ya significa publicar/despublicar acá. */}
          <FileText size={16} />
        </Link>

        <Link
          href={`/admin/novedades/${novedad.id}`}
          aria-label={`Editar ${novedad.titulo}`}
          title="Editar"
          className="rounded-lg p-2 text-primary/40 transition-colors hover:bg-primary/5 hover:text-primary"
        >
          <Pencil size={16} />
        </Link>

        <button
          type="button"
          onClick={onDelete}
          disabled={busy}
          aria-label={`Eliminar ${novedad.titulo}`}
          title="Eliminar"
          className="rounded-lg p-2 text-primary/40 transition-colors hover:bg-red-50 hover:text-red-600"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </li>
  );
}

export function NovedadesList({ novedades }: { novedades: Novedad[] }) {
  const [items, setItems] = useState(novedades);
  const [error, setError] = useState<string | null>(null);
  const [aEliminar, setAEliminar] = useState<Novedad | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  // El servidor es la fuente de verdad: tras revalidar, la lista se sincroniza.
  useEffect(() => setItems(novedades), [novedades]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 8 } }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const from = items.findIndex((item) => item.id === active.id);
    const to = items.findIndex((item) => item.id === over.id);
    if (from === -1 || to === -1) return;

    const previo = items;
    const reordenado = arrayMove(items, from, to);

    setItems(reordenado);
    setError(null);

    startTransition(async () => {
      try {
        await reordenarNovedadesAction(reordenado.map((item) => item.id));
      } catch {
        // Si no se pudo guardar, la interfaz no debe mentir sobre el orden real.
        setItems(previo);
        setError("No se pudo guardar el nuevo orden. Intentá de nuevo.");
      }
    });
  }

  function toggle(novedad: Novedad, campo: "publicada" | "destacada", valor: boolean) {
    const previo = items;

    setItems((actual) =>
      actual.map((item) => (item.id === novedad.id ? { ...item, [campo]: valor } : item)),
    );
    setBusyId(novedad.id);
    setError(null);

    startTransition(async () => {
      try {
        if (campo === "publicada") await togglePublicadaAction(novedad.id, valor);
        else await toggleDestacadaAction(novedad.id, valor);
      } catch {
        setItems(previo);
        setError("No se pudo guardar el cambio. Intentá de nuevo.");
      } finally {
        setBusyId(null);
      }
    });
  }

  function eliminar() {
    const novedad = aEliminar;
    if (!novedad) return;

    setAEliminar(null);
    setBusyId(novedad.id);
    setError(null);

    startTransition(async () => {
      try {
        await eliminarNovedadAction(novedad.id);
        setItems((actual) => actual.filter((item) => item.id !== novedad.id));
      } catch {
        setError("No se pudo eliminar la novedad. Intentá de nuevo.");
      } finally {
        setBusyId(null);
      }
    });
  }

  if (!items.length) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-white px-6 py-16 text-center">
        <h2 className="text-lg font-black tracking-tight text-primary">Todavía no hay novedades</h2>
        <p className="mx-auto mt-1 max-w-sm text-sm font-medium text-primary/45">
          Creá la primera para que aparezca en el sitio. Podés dejarla como borrador hasta que esté
          lista.
        </p>
        <Link href="/admin/novedades/nueva" className="mt-6 inline-block">
          <Button>
            <Plus size={16} />
            Crear la primera novedad
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {error && <Alert kind="error">{error}</Alert>}

      {/* El id va explícito: sin él, dnd-kit lo genera con un contador global
          que arranca de cero en cada render del servidor pero sigue creciendo
          en el cliente. Los aria-describedby quedaban distintos entre uno y
          otro y React reportaba un error de hidratación al abrir el panel. */}
      <DndContext
        id="novedades-list"
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
          <ul className="space-y-2">
            {items.map((novedad) => (
              <Fila
                key={novedad.id}
                novedad={novedad}
                busy={busyId === novedad.id}
                onToggle={(campo, valor) => toggle(novedad, campo, valor)}
                onDelete={() => setAEliminar(novedad)}
              />
            ))}
          </ul>
        </SortableContext>
      </DndContext>

      <ConfirmDialog
        open={aEliminar !== null}
        titulo="Eliminar novedad"
        mensaje={
          aEliminar
            ? `Se va a eliminar “${aEliminar.titulo}” junto con sus imágenes y su video. Esta acción no se puede deshacer.`
            : ""
        }
        confirmLabel="Eliminar"
        onConfirm={eliminar}
        onCancel={() => setAEliminar(null)}
      />
    </div>
  );
}
