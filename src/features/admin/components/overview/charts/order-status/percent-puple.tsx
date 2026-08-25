import { PieLabelRenderProps } from "recharts";

export default function PercentBubble(props: PieLabelRenderProps) {
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