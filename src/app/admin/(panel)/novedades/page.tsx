import Link from "next/link";
import { Plus } from "lucide-react";

import { getNovedadesAdmin } from "@/lib/novedades/queries";
import { NovedadesList } from "@/components/admin/NovedadesList";
import { Button } from "@/components/admin/ui";

export default async function NovedadesAdminPage() {
  const novedades = await getNovedadesAdmin();

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-primary">Novedades</h1>
          <p className="mt-0.5 text-sm font-medium text-primary/50">
            Arrastrá para cambiar el orden en que se muestran en el sitio.
          </p>
        </div>

        {novedades.length > 0 && (
          <Link href="/admin/novedades/nueva">
            <Button>
              <Plus size={16} />
              Nueva novedad
            </Button>
          </Link>
        )}
      </div>

      <NovedadesList novedades={novedades} />
    </div>
  );
}
