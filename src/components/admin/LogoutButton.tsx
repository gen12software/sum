"use client";

import { useFormStatus } from "react-dom";
import { LogOut, Loader2 } from "lucide-react";

import { logoutAction } from "@/lib/auth/actions";

function Inner() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-bold text-white/70 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-60"
    >
      {pending ? <Loader2 size={14} className="animate-spin" /> : <LogOut size={14} />}
      <span className="hidden sm:inline">Salir</span>
    </button>
  );
}

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <Inner />
    </form>
  );
}
