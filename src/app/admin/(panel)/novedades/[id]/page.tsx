import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { getNovedadAdmin } from "@/lib/novedades/queries";
import { NovedadForm } from "@/components/admin/NovedadForm";

export default async function EditarNovedadPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const novedad = await getNovedadAdmin(id);

  if (!novedad) notFound();

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        href="/admin/novedades"
        className="mb-4 inline-flex items-center gap-1.5 text-xs font-bold text-primary/50 transition-colors hover:text-primary"
      >
        <ArrowLeft size={14} />
        Volver al listado
      </Link>

      <h1 className="mb-1 text-3xl font-black tracking-tight text-primary">Editar novedad</h1>
      <p className="mb-6 text-sm font-medium text-primary/45">
        La dirección de esta novedad es{" "}
        <code className="rounded bg-primary/5 px-1.5 py-0.5 text-xs">/novedades/{novedad.slug}</code>{" "}
        y no cambia al editar el título, para no romper los enlaces ya compartidos.
      </p>

      <NovedadForm novedad={novedad} />
    </div>
  );
}
