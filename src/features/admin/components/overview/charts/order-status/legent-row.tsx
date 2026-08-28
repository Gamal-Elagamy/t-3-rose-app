
export default function LegendRow({
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
