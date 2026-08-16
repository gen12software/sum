import Image from "next/image";
import Link from "next/link";

import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth/guard";
import { AdminNav } from "@/components/admin/AdminNav";
import { LogoutButton } from "@/components/admin/LogoutButton";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  // El middleware ya protege estas rutas. Esto es la red de contención: si por
  // algún motivo no corriera, corresponde redirigir al login y no mostrar una
  // pantalla de error.
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-primary">
        <div className="container flex items-center justify-between gap-4 px-6 py-3">
          <Link href="/admin/novedades" className="flex items-center gap-3">
            <Image
              src="/images/nuevoLogoBlanco.png"
              alt="SUM"
              width={1054}
              height={249}
              className="h-7 w-auto object-contain"
              priority
            />
            <span className="hidden text-xs font-black uppercase tracking-widest text-white/60 sm:inline">
              Administración
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/admin/cuenta"
              className="hidden rounded-lg px-3 py-1.5 text-xs font-bold text-white/70 transition-colors hover:bg-white/10 hover:text-white sm:inline-block"
            >
              {session.u}
            </Link>
            <LogoutButton />
          </div>
        </div>

        <AdminNav />
      </header>

      <main className="grow">
        <div className="container px-6 py-8">{children}</div>
      </main>
    </div>
  );
}
