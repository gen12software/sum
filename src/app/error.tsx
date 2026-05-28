"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Error boundary]", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 text-center">
      <div className="mb-6 w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center">
        <span className="text-secondary text-2xl font-black">!</span>
      </div>
      <h1 className="text-3xl font-black text-primary uppercase tracking-tight mb-2">
        Algo salió mal
      </h1>
      <p className="text-primary/50 font-medium text-sm mb-8 max-w-sm">
        Ocurrió un error inesperado. Podés reintentar o volver al inicio.
      </p>
      <div className="flex items-center gap-4">
        <button
          onClick={reset}
          className="px-6 py-3 bg-secondary text-white rounded-xl font-bold text-sm hover:bg-secondary-dark transition-colors"
        >
          Reintentar
        </button>
        <Link
          href="/"
          className="px-6 py-3 bg-primary/5 text-primary rounded-xl font-bold text-sm hover:bg-primary/10 transition-colors"
        >
          Ir al inicio
        </Link>
      </div>
    </div>
  );
}
