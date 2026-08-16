"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { KeyRound, Loader2 } from "lucide-react";

import { changePasswordAction, type FormState } from "@/lib/auth/actions";
import { Alert, Button, Input, Label } from "@/components/admin/ui";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? <Loader2 size={16} className="animate-spin" /> : <KeyRound size={16} />}
      {pending ? "Guardando…" : "Cambiar contraseña"}
    </Button>
  );
}

export function ChangePasswordForm() {
  const [state, formAction] = useActionState<FormState, FormData>(changePasswordAction, {});
  const formRef = useRef<HTMLFormElement>(null);

  // Tras un cambio exitoso no tiene sentido dejar las claves escritas.
  useEffect(() => {
    if (state.success) formRef.current?.reset();
  }, [state.success]);

  return (
    <form ref={formRef} action={formAction} className="space-y-4">
      {state.error && <Alert kind="error">{state.error}</Alert>}
      {state.success && <Alert kind="success">{state.success}</Alert>}

      <div>
        <Label htmlFor="actual">Contraseña actual</Label>
        <Input id="actual" name="actual" type="password" autoComplete="current-password" required />
      </div>

      <div>
        <Label htmlFor="nueva">Contraseña nueva</Label>
        <Input
          id="nueva"
          name="nueva"
          type="password"
          autoComplete="new-password"
          minLength={8}
          required
        />
        <p className="mt-1.5 text-xs font-medium text-primary/40">Mínimo 8 caracteres.</p>
      </div>

      <div>
        <Label htmlFor="repetir">Repetir contraseña nueva</Label>
        <Input
          id="repetir"
          name="repetir"
          type="password"
          autoComplete="new-password"
          minLength={8}
          required
        />
      </div>

      <SubmitButton />
    </form>
  );
}
