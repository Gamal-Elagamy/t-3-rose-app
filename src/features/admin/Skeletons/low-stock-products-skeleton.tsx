export default function LowStockProductsSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center justify-between border-b border-zinc-100 px-3 py-2 last:border-b-0 dark:border-zinc-700"
        >
          <div className="h-5 w-32 animate-pulse rounded bg-zinc-200 dark:bg-zinc-600" />

          <div className="h-4 w-14 animate-pulse rounded bg-zinc-200 dark:bg-zinc-600" />
        </div>
      ))}
    </>
  );
}
