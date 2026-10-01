export function Skeleton({ className = "" }: { className?: string }) {
  return <div aria-hidden className={`skel ${className}`} />;
}

export function SectionSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="container section" aria-label="Loading content" role="status">
      <Skeleton className="skel" />
      <div className="mt-4 space-y-3">
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton key={i} />
        ))}
      </div>
      <div
        style={{ display: "grid", gap: 16, marginTop: 32, gridTemplateColumns: "repeat(3,1fr)" }}
      >
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="skel" style={{ height: 200 }} />
        ))}
      </div>
    </div>
  );
}
