export default function TopSellingProductsSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center justify-between rounded-lg bg-zinc-100 px-3 py-2 dark:bg-zinc-700"
        >
          <div className="flex flex-col gap-2">
            <div className="h-5 w-32 animate-pulse rounded bg-zinc-200 dark:bg-zinc-600" />
            <div className="h-4 w-16 animate-pulse rounded bg-zinc-200 dark:bg-zinc-600" />
          </div>

          <div className="h-4 w-14 animate-pulse rounded bg-zinc-200 dark:bg-zinc-600" />
        </div>
      ))}
    </>
  );
}
