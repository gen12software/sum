export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-secondary/20 border-t-secondary animate-spin" />
        <span className="text-xs font-black uppercase tracking-widest text-primary/30">Cargando</span>
      </div>
    </div>
  );
}
