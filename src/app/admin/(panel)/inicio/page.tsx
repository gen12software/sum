import { getHeroAdmin } from "@/lib/hero/queries";
import { HeroForm } from "@/components/admin/HeroForm";

export default async function InicioAdminPage() {
  // Es una fila única: no hay listado ni pantalla de creación. Si la migración
  // todavía no corrió, llega null y el formulario arranca vacío, que en el
  // sitio significa que se sigue mostrando el carrusel original.
  const hero = await getHeroAdmin();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-black tracking-tight text-primary">Inicio</h1>
        <p className="mt-0.5 text-sm font-medium text-primary/50">
          Las imágenes grandes que se van pasando arriba de todo en la página principal.
        </p>
      </div>

      <HeroForm hero={hero} />
    </div>
  );
}
