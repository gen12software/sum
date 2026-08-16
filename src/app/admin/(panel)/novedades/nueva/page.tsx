import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { NovedadForm } from "@/components/admin/NovedadForm";

export default function NuevaNovedadPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <Link
        href="/admin/novedades"
        className="mb-4 inline-flex items-center gap-1.5 text-xs font-bold text-primary/50 transition-colors hover:text-primary"
      >
        <ArrowLeft size={14} />
        Volver al listado
      </Link>

      <h1 className="mb-6 text-3xl font-black tracking-tight text-primary">Nueva novedad</h1>

      <NovedadForm />
    </div>
  );
}
