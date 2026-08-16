"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { Loader2, Save } from "lucide-react";

import { guardarHeroAction, type HeroActionState } from "@/lib/hero/actions";
import {
  HERO_MAX_IMAGENES,
  conFoco,
  getImagenesOrdenadas,
  type Hero,
  type HeroImagen,
} from "@/lib/hero/types";
import type { NovedadImagen } from "@/lib/novedades/types";
import { ImagenesUploader } from "@/components/admin/ImagenesUploader";
import { HeroEncuadre } from "@/components/admin/HeroEncuadre";
import { Alert, Button } from "@/components/admin/ui";

/**
 * Proporción recomendada. No se impone: una imagen que se aparta se acepta
 * igual y se avisa, porque el encuadre puede estar bien de todos modos y quien
 * carga el contenido lo ve en la vista previa.
 */
const RATIO_RECOMENDADO = 16 / 9;
const TOLERANCIA = 0.25;

function SubmitButton({ etiqueta }: { etiqueta: string }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
      {pending ? "Guardando…" : etiqueta}
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

function proporcionRara(imagen: HeroImagen): boolean {
  if (!imagen.ancho || !imagen.alto) return false;

  return Math.abs(imagen.ancho / imagen.alto - RATIO_RECOMENDADO) > TOLERANCIA;
}

export function HeroForm({ hero }: { hero: Hero | null }) {
  const [state, formAction] = useActionState<HeroActionState, FormData>(guardarHeroAction, {});

  const [imagenes, setImagenes] = useState<HeroImagen[]>(
    hero ? getImagenesOrdenadas(hero).map(conFoco) : [],
  );

  // Confirmación de un solo paso para el caso que sorprende: guardar sin nada
  // cargado devuelve el sitio al carrusel original.
  const [confirmandoVacio, setConfirmandoVacio] = useState(false);

  const vacio = imagenes.length === 0;
  const arrancoVacio = !hero?.imagenes.length;

  /**
   * El uploader produce imágenes con el contrato de una novedad, sin punto
   * focal. Se completa acá al incorporarlas, en lugar de duplicar el uploader
   * para agregarle un campo.
   */
  function recibir(nuevas: NovedadImagen[]) {
    setImagenes(nuevas.map(conFoco));
    setConfirmandoVacio(false);
  }

  function actualizar(path: string, cambios: Partial<HeroImagen>) {
    setImagenes((prev) =>
      prev.map((imagen) => (imagen.path === path ? { ...imagen, ...cambios } : imagen)),
    );
  }

  const payload = JSON.stringify({ imagenes });

  const fueraDeProporcion = imagenes.filter(proporcionRara).length;

  return (
    <form
      action={formAction}
      onSubmit={(event) => {
        // Vaciar el carrusel es una decisión con una consecuencia visible en el
        // sitio, y se llega ahí borrando imágenes de a una. Se pide confirmar
        // una vez, salvo que ya estuviera vacío y no haya nada que perder.
        if (vacio && !arrancoVacio && !confirmandoVacio) {
          event.preventDefault();
          setConfirmandoVacio(true);
        }
      }}
      className="space-y-4"
    >
      <input type="hidden" name="payload" value={payload} />

      {arrancoVacio && (
        <Alert kind="success">
          El inicio está mostrando el carrusel original, el que vino con el sitio. Apenas cargues
          una imagen acá, pasa a mostrar las tuyas.
        </Alert>
      )}

      <Seccion titulo="Imágenes">
        <ImagenesUploader
          value={imagenes}
          onChange={recibir}
          tipo="hero-imagen"
          marcarPortada={false}
          max={HERO_MAX_IMAGENES}
          ayuda={`JPG, PNG o WebP. Hasta ${HERO_MAX_IMAGENES} imágenes, 10 MB cada una. Arrastralas para cambiar el orden.`}
        />

        <p className="mt-3 text-xs font-medium text-primary/45">
          La medida recomendada es <strong className="font-bold">2400 × 1350 px</strong>{" "}
          (proporción 16:9, apaisada). La imagen se muestra a pantalla completa y se recorta según
          el tamaño de cada pantalla, así que el texto tiene que ir incorporado en la propia imagen
          y bien adentro, lejos de los bordes.
        </p>

        {fueraDeProporcion > 0 && (
          <p className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-xs font-medium text-amber-800">
            {fueraDeProporcion === 1
              ? "Hay 1 imagen con una proporción distinta a 16:9."
              : `Hay ${fueraDeProporcion} imágenes con una proporción distinta a 16:9.`}{" "}
            Se pueden usar igual: revisá el encuadre de cada una más abajo.
          </p>
        )}
      </Seccion>

      {imagenes.map((imagen, index) => (
        <Seccion key={imagen.path} titulo={`Imagen ${index + 1}`}>
          <HeroEncuadre imagen={imagen} onChange={(foco) => actualizar(imagen.path, { foco })} />
        </Seccion>
      ))}

      <div className="space-y-2">
        {state.error && <Alert kind="error">{state.error}</Alert>}
        {state.success && <Alert kind="success">{state.success}</Alert>}

        {confirmandoVacio && (
          <Alert kind="error">
            Vas a guardar el carrusel sin ninguna imagen. El inicio va a volver a mostrar el
            carrusel original. Tocá Guardar otra vez para confirmar.
          </Alert>
        )}

        <SubmitButton etiqueta={confirmandoVacio ? "Guardar de todos modos" : "Guardar"} />
      </div>
    </form>
  );
}
