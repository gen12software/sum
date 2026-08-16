import { AlertCircle, CheckCircle2 } from "lucide-react";

/** Primitivas compartidas por los formularios del panel. */

export function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block text-xs font-black uppercase tracking-widest text-primary/60"
    >
      {children}
    </label>
  );
}

const fieldClasses =
  "w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-medium text-foreground " +
  "outline-none transition-colors placeholder:text-primary/30 focus:border-accent " +
  "disabled:cursor-not-allowed disabled:opacity-60";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${fieldClasses} ${props.className ?? ""}`} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`${fieldClasses} ${props.className ?? ""}`} />;
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`${fieldClasses} resize-y leading-relaxed ${props.className ?? ""}`}
    />
  );
}

export function Alert({ kind, children }: { kind: "error" | "success"; children: React.ReactNode }) {
  const isError = kind === "error";
  const Icon = isError ? AlertCircle : CheckCircle2;

  return (
    <div
      role={isError ? "alert" : "status"}
      className={`flex items-start gap-2.5 rounded-xl px-4 py-3 text-sm font-medium ${
        isError ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700"
      }`}
    >
      <Icon size={16} className="mt-0.5 shrink-0" />
      <span>{children}</span>
    </div>
  );
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger" | "ghost";
};

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-primary text-white hover:bg-primary-dark",
  secondary: "border border-border bg-white text-primary hover:border-accent",
  danger: "bg-red-600 text-white hover:bg-red-700",
  ghost: "text-primary/60 hover:bg-primary/5 hover:text-primary",
};

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${variantClasses[variant]} ${className ?? ""}`}
    />
  );
}
