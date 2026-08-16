import { getPopupAdmin } from "@/lib/popup/queries";
import { getNovedadesPublicadas } from "@/lib/novedades/queries";
import { PopupForm } from "@/components/admin/PopupForm";

export default async function PopupAdminPage() {
  // Es una fila única: no hay listado ni pantalla de creación. Si la migración
  // todavía no corrió, llega null y el formulario arranca vacío.
  //
  // Las novedades alimentan el desplegable de destinos: solo las publicadas,
  // porque enlazar a una despublicada llevaría a una página que no existe.
  const [popup, novedades] = await Promise.all([getPopupAdmin(), getNovedadesPublicadas()]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-black tracking-tight text-primary">Pop-up</h1>
        <p className="mt-0.5 text-sm font-medium text-primary/50">
          El aviso que se abre sobre la página de inicio. A cada visitante se le muestra una sola
          vez por visita.
        </p>
      </div>

      <PopupForm
        popup={popup}
        novedades={novedades.map(({ slug, titulo }) => ({ slug, titulo }))}
      />
    </div>
  );
}
