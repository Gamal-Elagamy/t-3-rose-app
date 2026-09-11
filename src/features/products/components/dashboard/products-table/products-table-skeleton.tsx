import { Skeleton } from '@/shared/components/ui/skeleton';

export function ProductsTableSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-7 w-32" />
        <Skeleton className="h-10 w-64 rounded-lg" />
      </div>

      {/* Desktop */}
      <div className="hidden lg:block">
        <div className="border-b border-ds-border-subtle py-3">
          <Skeleton className="h-4 w-full" />
        </div>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 border-b border-ds-border-subtle py-4">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </div>

      {/* Mobile */}
      <div className="flex flex-col lg:hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between border-b border-ds-border-subtle py-3">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-14" />
            <Skeleton className="h-4 w-8" />
          </div>
        ))}
      </div>
    </div>
  );
}