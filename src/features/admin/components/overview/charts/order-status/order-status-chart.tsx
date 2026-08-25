'use client';

import { Pie, PieChart, Cell } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { ChartConfig, ChartContainer } from '@/shared/components/ui/chart';
import { DashboardOrderStatus } from '@/features/admin/types/admin';
import LegendRow from './legent-row';
import PercentBubble from './percent-puple';

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
  ].filter((d) => d.count > 0); // بيمنع البابل يترسم لقطاع صفر

  const hasData = orderStatus.totalOrders > 0;

  return (
    <Card className=" bg-white   rounded-xl max-h-105  max-w-80 ">
      <CardHeader>
        <CardTitle className="text-2xl  font-bold text-center  ">Orders Status</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center ">
        {hasData ? (
          <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-56 w-full">
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
          <div className="flex aspect-square max-h-56 w-full items-center justify-center rounded-full text-sm text-muted-foreground">
            لا توجد طلبات بعد
          </div>
        )}

        <div className="w-full pb-4 font-bold">
          <LegendRow
            color={chartConfig.completed.color}
            label="Completed"
            count={completed.count}
            percent={completed.percent}
          />
          <LegendRow
            color={chartConfig.inProgress.color}
            label="In progress"
            count={inProgress.count}
            percent={inProgress.percent}
          />
          <LegendRow
            color={chartConfig.canceled.color}
            label="Canceled"
            count={canceled.count}
            percent={canceled.percent}
          />
        </div>
      </CardContent>
    </Card>
  );
}
