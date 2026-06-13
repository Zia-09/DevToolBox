export default function ToolLoadingSkeleton() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-pulse">
      {/* Header skeleton */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-lg bg-muted" />
        <div className="h-8 w-56 rounded-lg bg-muted" />
      </div>
      <div className="h-4 w-80 rounded bg-muted mb-10" />

      {/* Body skeleton — two columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div className="h-5 w-28 rounded bg-muted" />
          <div className="h-[300px] rounded-xl bg-muted" />
        </div>
        <div className="space-y-3">
          <div className="h-5 w-28 rounded bg-muted" />
          <div className="h-[300px] rounded-xl bg-muted" />
        </div>
      </div>
    </div>
  );
}
