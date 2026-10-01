interface DashboardErrorProps {
  message: string;
}

export default function DashboardError({ message }: DashboardErrorProps) {
  return (
    <div className="flex min-h-40 w-full items-center justify-center rounded-2xl bg-white p-6 dark:bg-zinc-800">
      <p className="text-sm text-red-500">{message}</p>
    </div>
  );
}
