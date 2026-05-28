export default function Loading() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="animate-pulse space-y-8">
          <div className="text-center space-y-4">
            <div className="h-16 bg-primary/5 rounded-2xl w-48 mx-auto" />
            <div className="h-4 bg-primary/5 rounded-xl w-64 mx-auto" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 bg-surface rounded-4xl p-10 border border-border space-y-5">
              <div className="h-8 bg-primary/5 rounded-xl w-48" />
              <div className="grid grid-cols-2 gap-5">
                <div className="h-14 bg-primary/5 rounded-xl" />
                <div className="h-14 bg-primary/5 rounded-xl" />
              </div>
              <div className="h-40 bg-primary/5 rounded-xl" />
              <div className="h-14 bg-primary/5 rounded-xl" />
            </div>
            <div className="lg:col-span-5 space-y-4">
              <div className="h-20 bg-secondary/10 rounded-3xl" />
              <div className="h-48 bg-primary/5 rounded-3xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
