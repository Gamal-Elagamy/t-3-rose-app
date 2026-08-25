"use client";

import * as React from "react";
import { Pie, PieChart, Cell, Sector } from "recharts";
import type { PieLabelRenderProps } from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
} from "@/shared/components/ui/chart";
import { DashboardOrderStatus } from "@/features/admin/types/admin";

type Props = {
  orderStatus: DashboardOrderStatus;
};

const chartConfig = {
  count: { label: "Orders" },
  completed: { label: "Completed", color: "#16C266" },
  inProgress: { label: "In progress", color: "#2C7BFF" },
  canceled: { label: "Canceled", color: "#E5342A" },
} satisfies ChartConfig;

// بيرسم الفقاعة البيضاء اللي فيها النسبة، متطلعة برة الحلقة على منتصف كل قطاع
function PercentBubble(props: PieLabelRenderProps) {
  const { cx, cy, midAngle, outerRadius, percent } = props as {
    cx: number;
    cy: number;
    midAngle: number;
    outerRadius: number;
    percent: number;
  };

  if (!percent) return null;

  const RADIAN = Math.PI / 180;
  const radius = Number(outerRadius) + 6;
  const x = Number(cx) + radius * Math.cos(-midAngle * RADIAN);
  const y = Number(cy) + radius * Math.sin(-midAngle * RADIAN);

  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r={20}
        fill="white"
        stroke="rgba(0,0,0,0.06)"
        strokeWidth={1}
        style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.12))" }}
      />
      <text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-foreground text-[13px] font-semibold"
      >
        {Math.round(percent * 100)}%
      </text>
    </g>
  );
}

function LegendRow({
  color,
  label,
  count,
  percent,
}: {
  color: string;
  label: string;
  count: number;
  percent: number;
}) {
  return (
    <div className="flex items-center justify-between py-2  mx-auto ">
      <div className="flex items-center gap-2.5">
        <span
          className="h-3 w-3 shrink-0 rounded-full"
          style={{ backgroundColor: color }}
        />
        <span className="text-sm text-foreground">{label}</span>
      </div>
      <span className="text-sm font-semibold text-foreground">
        {count} ({percent}%)
      </span>
    </div>
  );
}

export function OrderStatusChart({ orderStatus }: Props) {
  const { completed, inProgress, canceled } = orderStatus;

  const chartData = [
    {
      status: "completed",
      count: completed.count,
      fill: chartConfig.completed.color,
    },
    {
      status: "inProgress",
      count: inProgress.count,
      fill: chartConfig.inProgress.color,
    },
    {
      status: "canceled",
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
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-56 w-full"
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
          <div className="flex aspect-square max-h-56 w-full items-center justify-center rounded-full text-sm text-muted-foreground">
            لا توجد طلبات بعد
          </div>
        )}

        <div className="w-full pb-4">
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
