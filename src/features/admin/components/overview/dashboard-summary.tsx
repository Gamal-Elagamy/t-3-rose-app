'use client';

import { BadgeDollarSign, ClipboardList, Package, ReceiptText } from 'lucide-react';

import { useAdminStatistics } from '../../hooks/use-admin-statistics';

import DashboardSummarySkeleton from '../../Skeletons/dashboard-summary-skeleton';

export default function DashboardSummary() {
  const { data, isLoading, isError } = useAdminStatistics();

  if (isLoading) {
    return <DashboardSummarySkeleton />;
  }

  if (isError || !data || !data.status || !('payload' in data) || !data.payload) {
    return <p className="text-sm text-red-500">Failed to load summary</p>;
  }

  const { summary } = data.payload;

  const cards = [
    {
      title: 'Total Products',
      value: summary.totalProducts,
      icon: Package,
      color: 'bg-maroon-50 dark:bg-maroon-900/40',
      iconColor: 'text-maroon-600 dark:text-maroon-300',
      textColor: 'text-maroon-600 dark:text-maroon-300',
    },
    {
      title: 'Total Orders',
      value: summary.totalOrders,
      icon: ReceiptText,
      color: 'bg-blue-50 dark:bg-blue-900/40',
      iconColor: 'text-blue-600 dark:text-blue-300',
      textColor: 'text-blue-600 dark:text-blue-300',
    },
    {
      title: 'Total Categories',
      value: summary.totalCategories,
      icon: ClipboardList,
      color: 'bg-purple-50 dark:bg-purple-900/40',
      iconColor: 'text-purple-600 dark:text-purple-300',
      textColor: 'text-purple-800 dark:text-purple-300',
    },
    {
      title: 'Total Revenue',
      value: `${summary.totalRevenue} ${summary.currency}`,
      icon: BadgeDollarSign,
      color: 'bg-emerald-50 dark:bg-emerald-900/40',
      iconColor: 'text-emerald-600 dark:text-emerald-300',
      textColor: 'text-emerald-800 dark:text-emerald-300',
    },
  ];

  return (
    <div className="grid h-80 w-full grid-cols-2 gap-4 rounded-2xl bg-white p-6 dark:bg-zinc-800">
      {cards.map(({ title, value, icon: Icon, color, iconColor, textColor }) => (
        <div key={title} className={`h-32 w-52 rounded-xl p-4 ${color}`}>
          <div className="flex items-center justify-between">
            <Icon className={`size-5 ${iconColor}`} />
          </div>

          <p className={`mt-4 text-2xl font-semibold ${textColor}`}>{value}</p>
          <span className="text-sm text-muted-foreground">{title}</span>
        </div>
      ))}
    </div>
  );
}
