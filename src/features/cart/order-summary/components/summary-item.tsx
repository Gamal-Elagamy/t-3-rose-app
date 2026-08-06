import { cn } from "@/shared/lib/utils/tailwind-cn";

interface SummaryItemProps {
  label: string;
  value: React.ReactNode;
  className?: string;
  valueClassName?: string;
}

export function SummaryItem({
  label,
  value,
  className,
  valueClassName, 
}: SummaryItemProps) {
  return (
   <div
  className={cn(
    "flex w-full items-center justify-between gap-2",
    className
  )}
>
  <span className="min-w-0 flex-1 text-sm text-muted-foreground">
    {label}
  </span>

  <span
    className={cn(
      "shrink-0 text-right font-semibold text-foreground",
      valueClassName
    )}
  >
    {value}
  </span>
</div>
  );
}