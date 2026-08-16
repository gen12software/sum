"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { Loader2, Save } from "lucide-react";

import { guardarPopupAction, type PopupActionState } from "@/lib/popup/actions";
import { esEnlaceExterno, type Popup, type PopupImagen } from "@/lib/popup/types";
import { DESTINO_EXTERNO, SECCIONES, esSeccionConocida } from "@/lib/popup/destinos";
import { getImagenesOrdenadas } from "@/lib/novedades/types";
import { ImagenesUploader } from "@/components/admin/ImagenesUploader";
import { Alert, Button, Input, Label, Select } from "@/components/admin/ui";

/** Lo mínimo que el desplegable necesita de cada novedad publicada. */
export type NovedadEnlazable = { slug: string; titulo: string };

function SubmitButton({ incompleto }: { incompleto: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending || incompleto}>
      {pending ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
      {pending ? "Guardando…" : "Guardar"}
    </Button>
  );
}

function Seccion({
  titulo,
  children,
}: {
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border bg-white p-5 sm:p-6">
      <h2 className="mb-4 text-sm font-black uppercase tracking-widest text-primary/60">
        {titulo}
      </h2>
      {children}
    </section>
  );
}

export function PopupForm({
  popup,
  novedades,
}: {
  popup: Popup | null;
  novedades: NovedadEnlazable[];
}) {
  const [state, formAction] = useActionState<PopupActionState, FormData>(guardarPopupAction, {});

  const [activo, setActivo] = useState(popup?.activo ?? false);
  const [imagenes, setImagenes] = useState<PopupImagen[]>(
    popup ? getImagenesOrdenadas(popup) : [],
  );

  // El destino se elige de una lista. Un enlace externo ya guardado abre el
  // desplegable en "otra dirección" y llena el campo de texto.
  const enlaceGuardado = popup?.enlace ?? "";
  const externoGuardado = Boolean(enlaceGuardado) && esEnlaceExterno(enlaceGuardado);

  const [destino, setDestino] = useState(externoGuardado ? DESTINO_EXTERNO : enlaceGuardado);
  const [externo, setExterno] = useState(externoGuardado ? enlaceGuardado : "");

  const [desde, setDesde] = useState(popup?.vigencia_desde ?? "");
  const [hasta, setHasta] = useState(popup?.vigencia_hasta ?? "");

  // Enlace interno guardado que ya no figura en la lista: una novedad que se
  // despublicó, o una página que se dio de baja. Se conserva como opción para
  // que se vea y pueda cambiarse, en lugar de desaparecer sin aviso.
  const destinoHuerfano =
    enlaceGuardado &&
    !externoGuardado &&
    !esSeccionConocida(enlaceGuardado) &&
    !novedades.some((novedad) => `/novedades/${novedad.slug}` === enlaceGuardado)
      ? enlaceGuardado
      : null;

  const enlace = destino === DESTINO_EXTERNO ? externo.trim() : destino;

  // Las imágenes viven en estado de React, así que el payload viaja serializado
  // en un campo oculto en lugar de como campos sueltos del form.
  const payload = JSON.stringify({
    activo,
    imagenes,
    enlace,
    vigencia_desde: desde,
    vigencia_hasta: hasta,
  });

  // Mismas reglas que valida el servidor: sin esto el botón guardaría algo que
  // después el esquema rechaza.
  const faltaImagen = activo && imagenes.length === 0;
  const rangoInvalido = Boolean(desde && hasta && hasta < desde);
  // Elegir "otra dirección" y dejarla vacía o a medio escribir guardaría un
  // enlace roto. Vale también dejarla vacía y volver a elegir de la lista.
  const externoInvalido = destino === DESTINO_EXTERNO && !esEnlaceExterno(externo.trim());
  const incompleto = faltaImagen || rangoInvalido || externoInvalido;

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="payload" value={payload} />

      <Seccion titulo="Estado">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={activo}
            onChange={(event) => setActivo(event.target.checked)}
            className="mt-0.5 h-4 w-4 accent-[#005599]"
          />
          <span>
            <span className="block text-sm font-bold text-primary">Activado</span>
            <span className="block text-xs font-medium text-primary/45">
              Si está desmarcado, el aviso no se muestra y el contenido cargado se conserva para
              volver a usarlo.
            </span>
          </span>
        </label>
      </Seccion>

      <Seccion titulo="Imágenes">
        <ImagenesUploader
          value={imagenes}
          onChange={setImagenes}
          tipo="popup-imagen"
          marcarPortada={false}
          ayuda="JPG, PNG o WebP. Hasta 10 MB cada una. Con varias, el aviso se ve como carrusel."
        />
        <p className="mt-3 text-xs font-medium text-primary/45">
          Conviene una imagen cuadrada o algo más alta que ancha: así entra completa en la pantalla
          de un teléfono. El texto del aviso va dentro de la propia imagen.
        </p>
      </Seccion>

      <Seccion titulo="Enlace">
        <Label htmlFor="destino">A dónde lleva el aviso (opcional)</Label>
        <Select
          id="destino"
          value={destino}
          onChange={(event) => setDestino(event.target.value)}
        >
          <option value="">No lleva a ninguna parte</option>

          {SECCIONES.map((grupo) => (
            <optgroup key={grupo.titulo} label={grupo.titulo}>
              {grupo.destinos.map((item) => (
                <option key={item.href} value={item.href}>
                  {item.label}
                </option>
              ))}
            </optgroup>
          ))}

          {novedades.length > 0 && (
            <optgroup label="Novedades publicadas">
              {novedades.map((novedad) => (
                <option key={novedad.slug} value={`/novedades/${novedad.slug}`}>
                  {novedad.titulo}
                </option>
              ))}
            </optgroup>
          )}

          {/* Un enlace guardado que ya no está en la lista —una novedad que se
              despublicó, una página que se dio de baja— seguiría vigente en el
              sitio sin aparecer acá, y el desplegable mostraría otra cosa. Se
              lo agrega para que se vea y pueda cambiarse. */}
          {destinoHuerfano && (
            <optgroup label="Enlace actual">
              <option value={destinoHuerfano}>{destinoHuerfano}</option>
            </optgroup>
          )}

          <optgroup label="Otra">
            <option value={DESTINO_EXTERNO}>Una dirección de afuera del sitio…</option>
          </optgroup>
        </Select>

        {destino === DESTINO_EXTERNO && (
          <div className="mt-3">
            <Label htmlFor="externo">Dirección completa</Label>
            <Input
              id="externo"
              value={externo}
              onChange={(event) => setExterno(event.target.value)}
              placeholder="https://www.instagram.com/…"
            />
            <p className="mt-1.5 text-xs font-medium text-primary/45">
              Copiala y pegala desde la barra del navegador, entera y empezando con{" "}
              <code className="font-mono">https://</code>. Se abre en una pestaña nueva, así el
              visitante no pierde el sitio.
            </p>
          </div>
        )}

        <p className="mt-3 text-xs font-medium text-primary/45">
          Elegí de la lista la página a la que querés llevar a quien toque el aviso. Si dejás{" "}
          <em>No lleva a ninguna parte</em>, el aviso es solo informativo.
        </p>
      </Seccion>

      <Seccion titulo="Vigencia">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="desde">Se muestra desde</Label>
            <Input
              id="desde"
              type="date"
              value={desde}
              onChange={(event) => setDesde(event.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="hasta">Se muestra hasta</Label>
            <Input
              id="hasta"
              type="date"
              value={hasta}
              onChange={(event) => setHasta(event.target.value)}
            />
          </div>
        </div>

        <p className="mt-3 text-xs font-medium text-primary/45">
          Las dos fechas son opcionales y cuentan el día entero: el aviso aparece desde el primer
          día y se muestra también durante el último. Si no ponés ninguna, se ve mientras esté
          activado.
        </p>
      </Seccion>

      {/* El resultado va acá y no al principio del formulario: el botón está al
          pie, así que un mensaje arriba queda fuera de la pantalla justo cuando
          hay que leerlo. */}
      <div className="space-y-2">
        {state.error && <Alert kind="error">{state.error}</Alert>}
        {state.success && <Alert kind="success">{state.success}</Alert>}

        <SubmitButton incompleto={incompleto} />

        {/* Un botón deshabilitado sin explicación deja a quien carga el
            contenido sin saber qué le falta. */}
        {incompleto && (
          <p role="status" className="text-xs font-medium text-primary/50">
            {faltaImagen
              ? "Para activar el pop-up agregá al menos una imagen."
              : rangoInvalido
                ? "La fecha de fin no puede ser anterior a la de inicio."
                : "Escribí la dirección completa, empezando con https://, o elegí una página de la lista."}
          </p>
        )}
      </div>
    </form>
  );
}
