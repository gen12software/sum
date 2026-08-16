export default function Loading() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="animate-pulse space-y-8">
          <div className="text-center space-y-4">
            <div className="h-16 bg-primary/5 rounded-2xl w-64 mx-auto" />
            <div className="h-4 bg-primary/5 rounded-xl w-80 mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-48 bg-primary/5 rounded-3xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
