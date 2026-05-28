"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Global error boundary]", error);
  }, [error]);

  return (
    <html lang="es">
      <body style={{ margin: 0, fontFamily: "sans-serif", background: "#f5f5f5" }}>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "1rem",
          }}
        >
          <h1 style={{ fontSize: "2rem", fontWeight: 900, color: "#003366", margin: "0 0 0.5rem" }}>
            SUM
          </h1>
          <p style={{ color: "#666", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
            Ocurrió un error crítico. Por favor recargá la página.
          </p>
          <button
            onClick={reset}
            style={{
              padding: "0.75rem 1.5rem",
              background: "#e63946",
              color: "white",
              border: "none",
              borderRadius: "0.75rem",
              fontWeight: 700,
              cursor: "pointer",
              fontSize: "0.875rem",
            }}
          >
            Reintentar
          </button>
        </div>
      </body>
    </html>
  );
}
