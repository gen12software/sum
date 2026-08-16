import type { VideoOrientacion } from "@/lib/novedades/types";

/**
 * Reproductor adaptado a cómo se grabó el video.
 *
 * Los verticales se acotan en altura para que el reproductor no se coma la
 * pantalla ni obligue a hacer scroll para llegar a los controles. Los
 * horizontales van en 16:9. En ambos casos la relación del contenedor coincide
 * con la del video, así que no aparecen franjas negras a los costados.
 */
export function VideoPlayer({
  src,
  orientacion,
  poster,
  titulo,
}: {
  src: string;
  orientacion: VideoOrientacion;
  poster?: string | null;
  titulo: string;
}) {
  const esVertical = orientacion === "vertical";

  return (
    <div className={esVertical ? "flex justify-center" : ""}>
      <div
        className={
          esVertical
            ? "aspect-9/16 max-h-[70vh] w-full max-w-sm overflow-hidden rounded-2xl bg-primary"
            : "aspect-video w-full overflow-hidden rounded-2xl bg-primary"
        }
      >
        <video
          src={src}
          poster={poster ?? undefined}
          controls
          // Sin playsInline, iOS Safari salta a pantalla completa al reproducir.
          playsInline
          // Sin autoplay y sin precarga: el video solo consume datos si el
          // visitante decide verlo, que es lo que mantiene acotado el tráfico
          // de Storage.
          preload="none"
          aria-label={`Video de ${titulo}`}
          className="h-full w-full object-contain"
        />
      </div>
    </div>
  );
}
