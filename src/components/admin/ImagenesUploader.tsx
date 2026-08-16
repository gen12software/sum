"use client";

import { useRef, useState } from "react";
import Image from "next/image";
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
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, ImagePlus, Loader2, Star, X } from "lucide-react";

import {
  getOrientacion,
  type NovedadImagen,
  type OrientacionImagen,
} from "@/lib/novedades/types";
import { subirArchivo, validarArchivo } from "@/lib/novedades/upload-client";
import { Alert } from "@/components/admin/ui";

type EnCurso = { id: string; nombre: string; progreso: number };

const ETIQUETA_ORIENTACION: Record<OrientacionImagen, string> = {
  apaisada: "Apaisada",
  vertical: "Vertical",
  cuadrada: "Cuadrada",
};

type Props = {
  value: NovedadImagen[];
  onChange: (imagenes: NovedadImagen[]) => void;
  disabled?: boolean;
};

function Miniatura({
  imagen,
  index,
  onRemove,
  disabled,
}: {
  imagen: NovedadImagen;
  index: number;
  onRemove: () => void;
  disabled?: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: imagen.path,
    disabled,
  });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`group relative aspect-square overflow-hidden rounded-xl border bg-surface ${
        index === 0 ? "border-primary/40 ring-2 ring-primary/15" : "border-border"
      } ${isDragging ? "z-10 opacity-80 shadow-premium" : ""}`}
    >
      {/* La celda es cuadrada para que la grilla quede pareja, pero la imagen
          va contenida sobre el fondo de superficie: así una foto vertical se
          distingue de una apaisada a simple vista y nada queda recortado. */}
      <Image
        src={imagen.url}
        alt={imagen.alt || ""}
        fill
        sizes="(max-width: 640px) 33vw, 150px"
        className="object-contain"
      />

      {index === 0 && (
        <span className="absolute left-1.5 top-1.5 inline-flex items-center gap-1 rounded-md bg-primary/90 px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-white">
          <Star size={9} className="fill-current" />
          Portada
        </span>
      )}

      {imagen.ancho && imagen.alto && (
        <span
          className="absolute bottom-1.5 left-1.5 rounded-md bg-black/55 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white"
          title={`${imagen.ancho} × ${imagen.alto} px`}
        >
          {ETIQUETA_ORIENTACION[getOrientacion(imagen)]}
        </span>
      )}

      <button
        type="button"
        onClick={onRemove}
        disabled={disabled}
        aria-label="Quitar imagen"
        className="absolute right-1.5 top-1.5 rounded-md bg-black/60 p-1 text-white opacity-0 transition-opacity hover:bg-red-600 focus:opacity-100 group-hover:opacity-100"
      >
        <X size={13} />
      </button>

      <button
        type="button"
        {...attributes}
        {...listeners}
        aria-label="Reordenar imagen"
        className="absolute bottom-1.5 right-1.5 cursor-grab touch-none rounded-md bg-black/60 p-1 text-white opacity-0 transition-opacity focus:opacity-100 group-hover:opacity-100 active:cursor-grabbing"
      >
        <GripVertical size={13} />
      </button>
    </div>
  );
}

export function ImagenesUploader({ value, onChange, disabled }: Props) {
  const [enCurso, setEnCurso] = useState<EnCurso[]>([]);
  const [errores, setErrores] = useState<string[]>([]);
  const [arrastrando, setArrastrando] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // La distancia mínima evita que un click en los botones de la miniatura se
  // interprete como el comienzo de un arrastre.
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 8 } }),
  );

  async function procesar(files: FileList | File[]) {
    const lista = Array.from(files);
    if (!lista.length) return;

    setErrores([]);

    // Se validan todos primero para que los rechazos aparezcan de una sola vez.
    const nuevosErrores: string[] = [];
    const validos: File[] = [];

    for (const file of lista) {
      const error = validarArchivo(file, "imagen");
      if (error) nuevosErrores.push(`${file.name}: ${error}`);
      else validos.push(file);
    }

    if (nuevosErrores.length) setErrores(nuevosErrores);

    const subidas: NovedadImagen[] = [];

    for (const file of validos) {
      const id = `${file.name}-${file.size}-${subidas.length}`;
      setEnCurso((prev) => [...prev, { id, nombre: file.name, progreso: 0 }]);

      try {
        const { url, path, ancho, alto } = await subirArchivo(file, "imagen", (progreso) => {
          setEnCurso((prev) => prev.map((item) => (item.id === id ? { ...item, progreso } : item)));
        });

        // ancho/alto llegan medidos del navegador. Si el archivo no se pudo
        // decodificar vienen undefined y la imagen se muestra con la relación
        // predeterminada, sin pedirle nada a quien la sube.
        subidas.push({
          url,
          path,
          alt: "",
          orden: value.length + subidas.length,
          ...(ancho && alto ? { ancho, alto } : {}),
        });
      } catch (error) {
        // Una imagen que falla no descarta las que sí se subieron.
        const mensaje = error instanceof Error ? error.message : "No se pudo subir.";
        setErrores((prev) => [...prev, `${file.name}: ${mensaje}`]);
      } finally {
        setEnCurso((prev) => prev.filter((item) => item.id !== id));
      }
    }

    if (subidas.length) onChange([...value, ...subidas]);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const from = value.findIndex((imagen) => imagen.path === active.id);
    const to = value.findIndex((imagen) => imagen.path === over.id);
    if (from === -1 || to === -1) return;

    onChange(arrayMove(value, from, to).map((imagen, index) => ({ ...imagen, orden: index })));
  }

  function quitar(path: string) {
    onChange(
      value
        .filter((imagen) => imagen.path !== path)
        .map((imagen, index) => ({ ...imagen, orden: index })),
    );
  }

  return (
    <div className="space-y-3">
      <div
        onDragOver={(event) => {
          event.preventDefault();
          setArrastrando(true);
        }}
        onDragLeave={() => setArrastrando(false)}
        onDrop={(event) => {
          event.preventDefault();
          setArrastrando(false);
          if (!disabled) void procesar(event.dataTransfer.files);
        }}
        className={`rounded-xl border-2 border-dashed p-6 text-center transition-colors ${
          arrastrando ? "border-accent bg-accent/5" : "border-border bg-white"
        }`}
      >
        <ImagePlus size={22} className="mx-auto mb-2 text-primary/30" />
        <p className="text-sm font-medium text-primary/60">
          Arrastrá las imágenes acá o{" "}
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={disabled}
            className="font-bold text-secondary underline underline-offset-2 hover:text-primary"
          >
            elegilas desde tu dispositivo
          </button>
        </p>
        <p className="mt-1 text-xs font-medium text-primary/35">
          JPG, PNG o WebP. Hasta 10 MB cada una. La primera se usa como portada.
        </p>

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          hidden
          onChange={(event) => {
            if (event.target.files) void procesar(event.target.files);
            event.target.value = "";
          }}
        />
      </div>

      {errores.length > 0 && (
        <Alert kind="error">
          <ul className="space-y-1">
            {errores.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </Alert>
      )}

      {enCurso.length > 0 && (
        <ul className="space-y-2">
          {enCurso.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-3 rounded-xl border border-border bg-white px-3 py-2"
            >
              <Loader2 size={14} className="shrink-0 animate-spin text-secondary" />
              <span className="min-w-0 flex-1 truncate text-xs font-medium text-primary/70">
                {item.nombre}
              </span>
              <div className="h-1.5 w-24 overflow-hidden rounded-full bg-border">
                <div
                  className="h-full rounded-full bg-accent transition-all"
                  style={{ width: `${item.progreso}%` }}
                />
              </div>
              <span className="w-9 text-right text-xs font-bold text-primary/50">
                {item.progreso}%
              </span>
            </li>
          ))}
        </ul>
      )}

      {value.length > 0 && (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={value.map((imagen) => imagen.path)} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
              {value.map((imagen, index) => (
                <Miniatura
                  key={imagen.path}
                  imagen={imagen}
                  index={index}
                  disabled={disabled}
                  onRemove={() => quitar(imagen.path)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}
