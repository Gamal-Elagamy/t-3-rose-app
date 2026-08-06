import { Badge } from '@/shared/components/ui/badge';
import { X } from 'lucide-react';
import { ICoupon } from '../types/copons';





export function CouponList({ coupons, onRemove }: { coupons: ICoupon[]; onRemove?: (id: string) => void }) {


 if (!coupons) {
  return (
    <p className="flex h-65 w-full items-center justify-center rounded-md border border-zinc-300 px-4 text-center text-sm text-muted-foreground">
      No coupon applied
    </p>
  );
}

return (
  <div className="w-full space-y-2">
    {coupons.map((coupon: ICoupon) => (
      <Badge
        key={coupon.id}
        variant="secondary"
        className="flex w-full items-center justify-between gap-2 px-3 py-2"
      >
        <span className="min-w-0 flex-1 truncate">
          {coupon.code}
        </span>

        <button
          type="button"
          className="shrink-0"
          onClick={() => onRemove?.(coupon.id)}
        >
          <X className="h-4 w-4" />
        </button>
      </Badge>
    ))}
  </div>
);
}
