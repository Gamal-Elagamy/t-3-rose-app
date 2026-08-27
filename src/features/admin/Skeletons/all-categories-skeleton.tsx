export default function AllCategoriesSkeleton() {
  return (
    <div className="flex h-80 w-full flex-col rounded-2xl bg-white p-6 dark:bg-zinc-800">
      <h3 className="mb-4 text-2xl font-bold text-muted-foreground">All Categories</h3>

      <div className="min-h-0 flex-1 space-y-2 overflow-y-auto">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-b border-zinc-100 px-3 py-2 last:border-b-0 dark:border-zinc-700"
          >
            <div className="h-5 w-28 animate-pulse rounded bg-zinc-200 dark:bg-zinc-600" />
            <div className="h-6 w-20 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-600" />
          </div>
        ))}
      </div>
    </div>
  );
}
