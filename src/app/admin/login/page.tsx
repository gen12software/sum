import Image from "next/image";
import { LoginForm } from "@/components/admin/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <div className="rounded-2xl bg-primary px-6 py-4">
            <Image
              src="/images/nuevoLogoBlanco.png"
              alt="SUM"
              width={1054}
              height={249}
              className="h-9 w-auto object-contain"
              priority
            />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-8 shadow-premium">
          <h1 className="mb-1 text-2xl font-black tracking-tight text-primary">
            Administración
          </h1>
          <p className="mb-6 text-sm font-medium text-primary/50">
            Ingresá con tus credenciales para gestionar las novedades.
          </p>

          <LoginForm />
        </div>
      </div>
    </div>
  );
}
