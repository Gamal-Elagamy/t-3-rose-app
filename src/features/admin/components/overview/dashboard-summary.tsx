'use client';

import { BadgeDollarSign, ClipboardList, Package, ReceiptText } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { formatLocaleNumber } from '@/shared/lib/utils/format-number';

import { DashboardSummary as DashboardSummaryType } from '../../types/admin';

interface DashboardSummaryProps {
  summary: DashboardSummaryType;
}

export default function DashboardSummary({ summary }: DashboardSummaryProps) {
  const t = useTranslations('admin-dashboard');
  const locale = useLocale();

  const cards = [
    {
      title: t('summary.total-products'),
      value: formatLocaleNumber(summary.totalProducts, locale),
      icon: Package,
      color: 'bg-maroon-50 dark:bg-maroon-900/40',
      iconColor: 'text-maroon-600 dark:text-maroon-300',
      textColor: 'text-maroon-600 dark:text-maroon-300',
    },
    {
      title: t('summary.total-orders'),
      value: formatLocaleNumber(summary.totalOrders, locale),
      icon: ReceiptText,
      color: 'bg-blue-50 dark:bg-blue-900/40',
      iconColor: 'text-blue-600 dark:text-blue-300',
      textColor: 'text-blue-600 dark:text-blue-300',
    },
    {
      title: t('summary.total-categories'),
      value: formatLocaleNumber(summary.totalCategories, locale),
      icon: ClipboardList,
      color: 'bg-purple-50 dark:bg-purple-900/40',
      iconColor: 'text-purple-600 dark:text-purple-300',
      textColor: 'text-purple-800 dark:text-purple-300',
    },
    {
      title: t('summary.total-revenue'),
      value: `${formatLocaleNumber(summary.totalRevenue, locale)} ${t('currency')}`,
      icon: BadgeDollarSign,
      color: 'bg-emerald-50 dark:bg-emerald-900/40',
      iconColor: 'text-emerald-600 dark:text-emerald-300',
      textColor: 'text-emerald-800 dark:text-emerald-300',
    },
  ];

  return (
    <div className="grid w-full grid-cols-2 gap-3 rounded-2xl bg-white p-4 dark:bg-zinc-800 sm:gap-4 sm:p-6">
      {cards.map(({ title, value, icon: Icon, color, iconColor, textColor }) => (
        <div
          key={title}
          className={`flex min-h-28 w-full flex-col justify-between rounded-xl p-3 sm:min-h-32 sm:p-4 ${color}`}
        >
          <Icon className={`size-5 ${iconColor}`} />
          <div>
            <p className={`truncate text-lg font-semibold sm:text-2xl ${textColor}`}>{value}</p>
            <span className="text-xs text-muted-foreground sm:text-sm">{title}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
