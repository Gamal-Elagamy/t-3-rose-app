'use client';

import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from 'recharts';

import { useRouter, useSearchParams } from 'next/navigation';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/shared/components/ui/chart';

import type { DashboardRevenue } from '@/features/admin/types/admin';
import { GetAdminStatisticsParams } from '@/features/admin/apis/admin.api';

type RevenueChartClientProps = {
  revenue: DashboardRevenue;
  period: GetAdminStatisticsParams['revenuePeriod'];
};

const chartConfig = {
  revenue: {
    label: 'Revenue',
    color: '#A6252A',
  },
} satisfies ChartConfig;

export function RevenueChart({
  revenue,
  period,
}: RevenueChartClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const chartData = revenue.points;

  const maxRevenue = Math.max(
    ...chartData.map((point) => point.revenue),
    0,
  );

  const yAxisMax =
    maxRevenue === 0
      ? 5000
      : Math.ceil(maxRevenue / 1000) * 1000;

  const handlePeriodChange = (
    newPeriod: GetAdminStatisticsParams['revenuePeriod'] = 'monthly',
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('revenuePeriod', newPeriod);

    router.replace(`?${params.toString()}`,{scroll: false,});
    
  };

  return (
    <Card className="w-full rounded-2xl border-none mx-4  bg-white shadow-none sm:w-full lg:w-225">
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between px-5 pb-2  sm:px-8 ">
        <CardTitle className="text-2xl font-semibold sm:text-3xl">
          Revenue
        </CardTitle>

        <div className="flex items-center gap-3 text-sm sm:gap-4 sm:text-base">
          {/* Monthly */}
          <button
            type="button"
            onClick={() => handlePeriodChange('monthly')}
            className={
              period === 'monthly'
                ? 'font-medium text-ds-text-primary'
                : 'font-medium text-ds-text-muted transition-colors hover:text-ds-text-default'
            }
          >
            Monthly
          </button>

          {/* Last Week */}
          <button
            type="button"
            onClick={() => handlePeriodChange('week')}
            className={
              period === 'week'
                ? 'font-medium text-ds-text-primary'
                : 'font-medium text-ds-text-muted transition-colors hover:text-ds-text-default'
            }
          >
            Last Week
          </button>
        </div>
      </CardHeader>

      {/* Chart */}
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="h-50 w-full sm:h-87.5 lg:h-75"
        >
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            {/* Grid */}
            <CartesianGrid
              vertical
              horizontal={false}
              strokeDasharray="0"
              className="stroke-ds-border-soft"
            />

            {/* X Axis */}
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              tick={{
                fontSize: 13,
                fontWeight: 700,
              }}
            />

            {/* Y Axis */}
            <YAxis
              domain={[0, yAxisMax]}
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickCount={6}
              width={45}
              tick={{
                fontSize: 13,
                fontWeight: 700,
              }}
              tickFormatter={(value) =>
                value.toString()
              }
            />

            {/* Tooltip */}
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  className="shadow-none ring-0  text-maroon-600"
                  formatter={(value) =>
                    `${Number(value).toLocaleString()} EGP`
                  }
                />
              }
            />

            {/* Revenue Area */}
            <Area
              type="natural"
              dataKey="revenue"
              stroke="#A6252A"
              strokeWidth={2}
              fill="url(#revenueGradient)"
              fillOpacity={1}
              activeDot={{
                r: 7,
                strokeWidth: 3,
                stroke: 'white',
                fill: '#A6252A',
              }}
            />

            {/* Gradient */}
            <defs>
              <linearGradient
                id="revenueGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#E5342A"
                  stopOpacity={0.35}
                />

                <stop
                  offset="100%"
                  stopColor="#F8B1EF00"
                  stopOpacity={0.03}
                />
              </linearGradient>
            </defs>
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}