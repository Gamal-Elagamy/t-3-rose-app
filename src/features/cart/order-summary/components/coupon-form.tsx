'use client';

import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { TicketPercent } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import useApplyCoupon from '../hooks/use-apply-coupon';
import { ICoupon } from '../types/copons';
import { useTranslations } from 'next-intl';

interface CouponFormProps {
  onCouponFound: (coupon: ICoupon) => void;
  onCouponNotFound: () => void;
}

export function CouponForm({ onCouponFound, onCouponNotFound }: CouponFormProps) {
  const t = useTranslations('order-summary');
  const [couponCode, setCouponCode] = useState('');

  const { mutate, isPending } = useApplyCoupon();

  const handleApplyCoupon = () => {
    const trimmedCoupon = couponCode.trim();

    if (!trimmedCoupon) {
      toast.error(t('coupon-empty'));
      return;
    }

    mutate(trimmedCoupon, {
      onSuccess: (response) => {
        const coupons = response.payload?.data ?? [];

        if (coupons.length === 0) {
          onCouponNotFound();

          toast.error(t('coupon-not-found'));
          return;
        }

        const coupon = coupons[0];

        onCouponFound(coupon);

        toast.success(t('coupon-found'));
      },

      onError: (error) => {
        onCouponNotFound();

        toast.error(error.message);
      },
    });
  };

  return (
    <div className="grid w-full grid-cols-[1fr_auto] gap-2">
      <Input
        className="w-full uppercase"
        placeholder={t('coupon-Placeholder')}
        value={couponCode}
        onChange={(event) => setCouponCode(event.target.value.toUpperCase())}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            handleApplyCoupon();
          }
        }}
      />

      <Button
        type="button"
        className="flex h-full items-center justify-center gap-2"
        disabled={isPending}
        onClick={handleApplyCoupon}
      >
        <TicketPercent className="size-5" />

        {isPending ? t('loading') : t('apply-button')}
      </Button>
    </div>
  );
}
