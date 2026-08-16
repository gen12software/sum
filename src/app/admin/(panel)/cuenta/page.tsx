import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth/guard";
import { ChangePasswordForm } from "@/components/admin/ChangePasswordForm";

export default async function CuentaPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="mx-auto max-w-md">
      <h1 className="mb-1 text-3xl font-black tracking-tight text-primary">Mi cuenta</h1>
      <p className="mb-8 text-sm font-medium text-primary/50">
        Sesión iniciada como <strong className="text-primary/70">{session.u}</strong>.
      </p>

      <div className="rounded-2xl border border-border bg-white p-6 shadow-premium">
        <h2 className="mb-5 text-lg font-black tracking-tight text-primary">
          Cambiar contraseña
        </h2>
        <ChangePasswordForm />
      </div>
    </div>
  );
}
