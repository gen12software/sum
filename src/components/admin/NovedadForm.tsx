"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { Loader2, Save } from "lucide-react";

import { guardarNovedadAction, type ActionState } from "@/lib/novedades/actions";
import { TITULO_MAX } from "@/lib/novedades/schema";
import type { Novedad, NovedadImagen } from "@/lib/novedades/types";
import { getImagenesOrdenadas } from "@/lib/novedades/types";
import { ImagenesUploader } from "@/components/admin/ImagenesUploader";
import { VideoUploader, type VideoValue } from "@/components/admin/VideoUploader";
import { Alert, Button, Input, Label, Textarea } from "@/components/admin/ui";

function SubmitButton({ incompleto }: { incompleto: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending || incompleto}>
      {pending ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
      {pending ? "Guardando…" : "Guardar"}
    </Button>
  );
}

function Seccion({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-white p-5 sm:p-6">
      <h2 className="mb-4 text-sm font-black uppercase tracking-widest text-primary/60">
        {titulo}
      </h2>
      {children}
    </section>
  );
}

export function NovedadForm({ novedad }: { novedad?: Novedad }) {
  const [state, formAction] = useActionState<ActionState, FormData>(guardarNovedadAction, {});

  const [titulo, setTitulo] = useState(novedad?.titulo ?? "");
  const [descripcion, setDescripcion] = useState(novedad?.descripcion ?? "");
  const [imagenes, setImagenes] = useState<NovedadImagen[]>(
    novedad ? getImagenesOrdenadas(novedad) : [],
  );
  const [video, setVideo] = useState<VideoValue>({
    url: novedad?.video_url ?? null,
    path: novedad?.video_path ?? null,
    orientacion: novedad?.video_orientacion ?? null,
  });
  const [destacada, setDestacada] = useState(novedad?.destacada ?? false);
  // Una novedad nueva nace activada: lo habitual es cargarla para publicarla.
  // Al editar se respeta el estado que ya tenía.
  const [publicada, setPublicada] = useState(novedad?.publicada ?? true);
  const [mostrarEnInicio, setMostrarEnInicio] = useState(novedad?.mostrar_en_inicio ?? false);

  // Las imágenes y el video viven en estado de React, así que el payload viaja
  // serializado en un campo oculto en lugar de como campos sueltos del form.
  const payload = JSON.stringify({
    titulo,
    descripcion,
    imagenes,
    video_url: video.url,
    video_path: video.path,
    video_orientacion: video.orientacion,
    destacada,
    publicada,
    mostrar_en_inicio: mostrarEnInicio,
  });

  // Mismos requisitos que valida el servidor: sin esto el botón guardaría una
  // novedad que después el esquema rechaza.
  const faltaTexto = !titulo.trim() || !descripcion.trim();
  const faltaMedia = imagenes.length === 0 && !video.url;
  const incompleto = faltaTexto || faltaMedia;

  return (
    <form action={formAction} className="space-y-4">
      {novedad && <input type="hidden" name="id" value={novedad.id} />}
      <input type="hidden" name="payload" value={payload} />

      {state.error && <Alert kind="error">{state.error}</Alert>}

      <Seccion titulo="Contenido">
        <div className="space-y-4">
          <div>
            <Label htmlFor="titulo">Título</Label>
            <Input
              id="titulo"
              value={titulo}
              onChange={(event) => setTitulo(event.target.value)}
              maxLength={TITULO_MAX}
              required
              autoFocus
            />
            <p className="mt-1.5 text-xs font-medium text-primary/40">
              {titulo.length} / {TITULO_MAX}
            </p>
          </div>

          <div>
            <Label htmlFor="descripcion">Descripción</Label>
            <Textarea
              id="descripcion"
              value={descripcion}
              onChange={(event) => setDescripcion(event.target.value)}
              rows={8}
              required
            />
            <p className="mt-1.5 text-xs font-medium text-primary/40">
              Texto simple. Los saltos de línea se respetan tal como los escribas.
            </p>
          </div>
        </div>
      </Seccion>

      <Seccion titulo="Imágenes">
        <ImagenesUploader value={imagenes} onChange={setImagenes} />
      </Seccion>

      <Seccion titulo="Video">
        <VideoUploader value={video} onChange={setVideo} />
      </Seccion>

      <Seccion titulo="Publicación">
        <div className="space-y-3">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={publicada}
              onChange={(event) => setPublicada(event.target.checked)}
              className="mt-0.5 h-4 w-4 accent-[#005599]"
            />
            <span>
              <span className="block text-sm font-bold text-primary">Activada</span>
              <span className="block text-xs font-medium text-primary/45">
                Si está desmarcada, la novedad no se ve en el sitio.
              </span>
            </span>
          </label>

          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={destacada}
              onChange={(event) => setDestacada(event.target.checked)}
              className="mt-0.5 h-4 w-4 accent-[#005599]"
            />
            <span>
              <span className="block text-sm font-bold text-primary">Destacada</span>
              <span className="block text-xs font-medium text-primary/45">
                Las destacadas aparecen primero en el listado.
              </span>
            </span>
          </label>

          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={mostrarEnInicio}
              onChange={(event) => setMostrarEnInicio(event.target.checked)}
              className="mt-0.5 h-4 w-4 accent-[#005599]"
            />
            <span>
              <span className="block text-sm font-bold text-primary">Mostrar en el inicio</span>
              <span className="block text-xs font-medium text-primary/45">
                La novedad aparece en la página principal. Solo tiene efecto si además está
                activada.
              </span>
            </span>
          </label>
        </div>
      </Seccion>

      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <SubmitButton incompleto={incompleto} />
          <Link href="/admin/novedades">
            <Button type="button" variant="secondary">
              Cancelar
            </Button>
          </Link>
        </div>

        {/* Un botón deshabilitado sin explicación deja a quien carga el
            contenido sin saber qué le falta. */}
        {incompleto && (
          <p role="status" className="text-xs font-medium text-primary/50">
            Para guardar falta{" "}
            {[
              !titulo.trim() && "el título",
              !descripcion.trim() && "la descripción",
              faltaMedia && "al menos una imagen o un video",
            ]
              .filter(Boolean)
              .join(", ")}
            .
          </p>
        )}
      </div>
    </form>
  );
}
