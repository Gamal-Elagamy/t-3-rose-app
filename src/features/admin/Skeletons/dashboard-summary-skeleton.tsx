export default function DashboardSummarySkeleton() {
  return (
    <div className="grid h-80 w-full grid-cols-2 gap-4 rounded-2xl bg-white p-6 dark:bg-zinc-800">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="h-32 w-52 animate-pulse rounded-xl bg-zinc-100 p-4 dark:bg-zinc-700"
        />
      ))}
    </div>
  );
}
