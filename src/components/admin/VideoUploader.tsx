"use client";

import { useRef, useState } from "react";
import { FileVideo, Loader2, RectangleHorizontal, RectangleVertical, X } from "lucide-react";

import type { VideoOrientacion } from "@/lib/novedades/types";
import { subirArchivo, validarArchivo } from "@/lib/novedades/upload-client";
import { Alert, Label } from "@/components/admin/ui";

export type VideoValue = {
  url: string | null;
  path: string | null;
  orientacion: VideoOrientacion | null;
};

type Props = {
  value: VideoValue;
  onChange: (value: VideoValue) => void;
  disabled?: boolean;
};

const ORIENTACIONES: { value: VideoOrientacion; label: string; hint: string; Icon: typeof RectangleVertical }[] = [
  {
    value: "vertical",
    label: "Vertical",
    hint: "Grabado con el celular parado",
    Icon: RectangleVertical,
  },
  {
    value: "horizontal",
    label: "Horizontal",
    hint: "Grabado con el celular acostado",
    Icon: RectangleHorizontal,
  },
];

export function VideoUploader({ value, onChange, disabled }: Props) {
  const [progreso, setProgreso] = useState<number | null>(null);
  const [nombre, setNombre] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function procesar(file: File) {
    setError(null);

    // Se valida antes de pedir la URL firmada: con archivos de decenas de MB,
    // enterarse del rechazo a mitad de la subida es inaceptable.
    const invalido = validarArchivo(file, "video");
    if (invalido) {
      setError(invalido);
      return;
    }

    setNombre(file.name);
    setProgreso(0);

    try {
      const { url, path } = await subirArchivo(file, "video", setProgreso);
      // Al reemplazar, el archivo anterior se borra del lado del servidor al
      // guardar la novedad.
      onChange({ url, path, orientacion: value.orientacion });
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "No se pudo subir el video.");
    } finally {
      setProgreso(null);
      setNombre(null);
    }
  }

  function quitar() {
    onChange({ url: null, path: null, orientacion: null });
    setError(null);
  }

  const subiendo = progreso !== null;

  return (
    <div className="space-y-3">
      {error && <Alert kind="error">{error}</Alert>}

      {!value.url && !subiendo && (
        <div className="rounded-xl border-2 border-dashed border-border bg-white p-6 text-center">
          <FileVideo size={22} className="mx-auto mb-2 text-primary/30" />
          <p className="text-sm font-medium text-primary/60">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={disabled}
              className="font-bold text-secondary underline underline-offset-2 hover:text-primary"
            >
              Elegí un video
            </button>{" "}
            (opcional)
          </p>
          <p className="mt-1 text-xs font-medium text-primary/35">
            MP4 o WebM. Hasta 50 MB. Uno por novedad.
          </p>
        </div>
      )}

      {subiendo && (
        <div className="flex items-center gap-3 rounded-xl border border-border bg-white px-4 py-3">
          <Loader2 size={16} className="shrink-0 animate-spin text-secondary" />
          <span className="min-w-0 flex-1 truncate text-xs font-medium text-primary/70">
            {nombre}
          </span>
          <div className="h-1.5 w-28 overflow-hidden rounded-full bg-border">
            <div
              className="h-full rounded-full bg-accent transition-all"
              style={{ width: `${progreso}%` }}
            />
          </div>
          <span className="w-9 text-right text-xs font-bold text-primary/50">{progreso}%</span>
        </div>
      )}

      {value.url && !subiendo && (
        <>
          <div className="flex items-center gap-3 rounded-xl border border-border bg-white px-4 py-3">
            <FileVideo size={16} className="shrink-0 text-secondary" />
            <span className="min-w-0 flex-1 truncate text-xs font-medium text-primary/70">
              Video cargado
            </span>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={disabled}
              className="text-xs font-bold text-secondary hover:text-primary"
            >
              Reemplazar
            </button>
            <button
              type="button"
              onClick={quitar}
              disabled={disabled}
              aria-label="Quitar video"
              className="rounded-md p-1 text-primary/40 transition-colors hover:bg-red-50 hover:text-red-600"
            >
              <X size={14} />
            </button>
          </div>

          <div>
            <Label htmlFor="orientacion-vertical">¿Cómo se grabó?</Label>
            <p className="mb-2 text-xs font-medium text-primary/40">
              Lo declarás vos y no lo detectamos solo: los celulares reportan la rotación de forma
              inconsistente según el navegador.
            </p>

            <div className="grid grid-cols-2 gap-2">
              {ORIENTACIONES.map(({ value: opcion, label, hint, Icon }) => {
                const activo = value.orientacion === opcion;

                return (
                  <button
                    key={opcion}
                    id={`orientacion-${opcion}`}
                    type="button"
                    onClick={() => onChange({ ...value, orientacion: opcion })}
                    disabled={disabled}
                    aria-pressed={activo}
                    className={`rounded-xl border-2 p-3 text-left transition-colors ${
                      activo
                        ? "border-accent bg-accent/5"
                        : "border-border bg-white hover:border-primary/20"
                    }`}
                  >
                    <Icon size={18} className={activo ? "text-accent" : "text-primary/40"} />
                    <span className="mt-1.5 block text-sm font-bold text-primary">{label}</span>
                    <span className="block text-xs font-medium text-primary/40">{hint}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="video/mp4,video/webm"
        hidden
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) void procesar(file);
          event.target.value = "";
        }}
      />
    </div>
  );
}
