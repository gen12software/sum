import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Administración",
  // Refuerza el header X-Robots-Tag que agrega el middleware.
  robots: { index: false, follow: false },
};

// El panel siempre refleja el estado real: nada de contenido cacheado.
export const dynamic = "force-dynamic";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-surface">{children}</div>;
}
