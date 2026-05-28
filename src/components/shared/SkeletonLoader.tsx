"use client";

export function ProductCardSkeleton() {
  return (
    <div className="glass-card overflow-hidden">
      <div className="skeleton h-48 w-full rounded-t-2xl" />
      <div className="p-5 space-y-3">
        <div className="skeleton h-4 w-20 rounded" />
        <div className="skeleton h-6 w-3/4 rounded" />
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-4 w-2/3 rounded" />
        <div className="flex justify-between items-center pt-2">
          <div className="skeleton h-8 w-8 rounded-full" />
          <div className="skeleton h-8 w-24 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function StatsSkeleton() {
  return (
    <div className="glass-card p-6">
      <div className="skeleton h-10 w-10 rounded-lg mb-4" />
      <div className="skeleton h-8 w-20 rounded mb-2" />
      <div className="skeleton h-4 w-32 rounded" />
    </div>
  );
}

export function TableRowSkeleton() {
  return (
    <div className="flex items-center gap-4 p-4 border-b border-white/5">
      <div className="skeleton h-10 w-10 rounded-full" />
      <div className="flex-1 space-y-2">
        <div className="skeleton h-4 w-32 rounded" />
        <div className="skeleton h-3 w-48 rounded" />
      </div>
      <div className="skeleton h-6 w-16 rounded-full" />
    </div>
  );
}
