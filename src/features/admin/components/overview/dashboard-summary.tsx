import { BadgeDollarSign, ClipboardList, Package, Tags } from 'lucide-react';

import { DashboardSummary as DashboardSummaryType } from '../../types/admin';

interface DashboardSummaryProps {
  summary: DashboardSummaryType;
}

export default function DashboardSummary({ summary }: DashboardSummaryProps) {
  const cards = [
    {
      title: 'Total Products',
      value: summary.totalProducts,
      icon: Package,
      color: 'bg-amber-200 dark:bg-amber-900/40',
    },
    {
      title: 'Total Orders',
      value: summary.totalOrders,
      icon: ClipboardList,
      color: 'bg-sky-200 dark:bg-sky-900/40',
    },
    {
      title: 'Total Categories',
      value: summary.totalCategories,
      icon: Tags,
      color: 'bg-emerald-200 dark:bg-emerald-900/40',
    },
    {
      title: 'Total Revenue',
      value: `${summary.totalRevenue} ${summary.currency}`,
      icon: BadgeDollarSign,
      color: 'bg-rose-200 dark:bg-rose-900/40',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 rounded-2xl bg-white p-6 dark:bg-zinc-800">
      {cards.map(({ title, value, icon: Icon, color }) => (
        <div key={title} className={`h-32 w-52 rounded-xl p-4 ${color}`}>
          <div className="flex items-center justify-between">
            <Icon className="size-5 text-muted-foreground" />
          </div>

          <p className="mt-4 text-2xl font-semibold">{value}</p>
          <span className="text-sm text-muted-foreground">{title}</span>
        </div>
      ))}
    </div>
  );
}
