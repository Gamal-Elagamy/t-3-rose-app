'use client';

import { Pie, PieChart, Cell } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { ChartConfig, ChartContainer } from '@/shared/components/ui/chart';
import { DashboardOrderStatus } from '@/features/admin/types/admin';
import LegendRow from './legent-row';
import PercentBubble from './percent-puple';
import { useTranslations } from 'next-intl';

type Props = {
  orderStatus: DashboardOrderStatus;
};

const chartConfig = {
  count: { label: 'Orders' },
  completed: { label: 'Completed', color: '#16C266' },
  inProgress: { label: 'In progress', color: '#2C7BFF' },
  canceled: { label: 'Canceled', color: '#E5342A' },
} satisfies ChartConfig;
 
export function OrderStatusChart({ orderStatus }: Props) {

  // Translation
  const t = useTranslations('dashboard.charts');
  const { completed, inProgress, canceled } = orderStatus;

  const chartData = [
    {
      status: 'completed',
      count: completed.count,
      fill: chartConfig.completed.color,
    },
    {
      status: 'inProgress',
      count: inProgress.count,
      fill: chartConfig.inProgress.color,
    },
    {
      status: 'canceled',
      count: canceled.count,
      fill: chartConfig.canceled.color,
    },
  ].filter((d) => d.count > 0);

  const hasData = orderStatus.totalOrders > 0;

  return (
    <Card className="w-full max-w-none  rounded-xl bg-white lg:col-span-1 ">
      <CardHeader className="px-4 pt-1 sm:px-5">
        <CardTitle className="text-center  font-bold sm:text-xl">
          <h1 className="text-lg font-semibold sm:text-2xl lg:text-3xl">{t('order-status')}</h1>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex w-full flex-col items-center px-4 sm:px-5">
        {hasData ? (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square w-full max-h-52 sm:max-h-56"
          >
            <PieChart>
              <Pie
                data={chartData}
                dataKey="count"
                nameKey="status"
                innerRadius="50%"
                outerRadius="85%"
                strokeWidth={0}
                labelLine={false}
                label={PercentBubble}
              >
                {chartData.map((entry) => (
                  <Cell key={entry.status} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        ) : (
          <div className="flex aspect-square max-h-52 w-full items-center justify-center rounded-full text-sm text-muted-foreground">
            {t('no-data')}
          </div>
        )}

        <div className="w-full pb-4 font-bold">
          <LegendRow
            color={chartConfig.completed.color}
            label={t('completed')}
            count={completed.count}
            percent={completed.percent}
          />

          <LegendRow
            color={chartConfig.inProgress.color}
            label={t('in-progress')}
            count={inProgress.count}
            percent={inProgress.percent}
          />

          <LegendRow
            color={chartConfig.canceled.color}
            label={t('canceled')}
            count={canceled.count}
            percent={canceled.percent}
          />
        </div>
      </CardContent>
    </Card>
  );
}
