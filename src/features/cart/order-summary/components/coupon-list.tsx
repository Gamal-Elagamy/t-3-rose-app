import { Badge } from '@/shared/components/ui/badge';
import { X } from 'lucide-react';
import { ICoupon } from '../types/copons';
import { useTranslations } from 'next-intl';

interface CouponListProps {
  coupons: ICoupon[];
  onRemove?: (id: string) => void;
}

export function CouponList({ coupons, onRemove }: CouponListProps) {
  const t = useTranslations('order-summary');

  if (coupons.length === 0) {
    return (
      <p className="flex h-65 w-full items-center justify-center rounded-md border border-zinc-300 px-4 text-center text-sm text-muted-foreground">
        {t('no-coupon')}
      </p>
    );
  }

  return (
    <div className="w-full space-y-2">
      {coupons.map((coupon) => (
        <div
          key={coupon.id}
          className="flex w-full    justify-between gap-2 h-65 border border-zinc-200 dark:border-zinc-500 rounded-md px-4 py-2"
        >
          <Badge className="min-w-0 flex-1 p-4 m-4  truncate flex justify-between  ">
            <div className="mr-2">{coupon.code}</div>

            <button type="button" className="shrink-0" onClick={() => onRemove?.(coupon.id)}>
              <X className="size-4 cursor-pointer" />
            </button>
          </Badge>
        </div>
      ))}
    </div>
  );
}
