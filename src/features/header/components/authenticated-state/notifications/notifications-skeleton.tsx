import { Skeleton } from '@/shared/components/ui/skeleton';

export function NotificationsSkeleton() {
  return (
    <div role="status" aria-label="Loading notifications" className="space-y-3 p-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} aria-hidden="true" className="flex items-start gap-3">
          <Skeleton className="size-9 shrink-0 rounded-full" />
          <div className="flex-1 space-y-2 py-1">
            <Skeleton className="h-3 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}
