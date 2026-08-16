'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { ICoupon } from '../types/copons';
import { useCoupon } from '../context/coupon-context';
import { toast } from 'sonner';
import { CouponForm } from './coupon-form';
import { CouponList } from './coupon-list';
import useApplyCoupon from '../hooks/use-apply-coupon';

export function CouponSection() {
  const t = useTranslations('order-summary');

  const [coupons, setCoupons] = useState<ICoupon[]>([]);

  const { setCoupon } = useCoupon();

  const { mutate, isPending } = useApplyCoupon();

  const handleApplyCoupon = (code: string) => {
    mutate(code, {
      onSuccess: (response) => {
        const coupons = response.payload?.data ?? [];

        if (coupons.length === 0) {
          setCoupons([]);
          setCoupon(null);

          toast.error(t('coupon-not-found'));

          return;
        }

        const coupon = coupons[0];

        console.log('Coupon found:', coupon);

        setCoupons([coupon]);

        setCoupon(coupon);

        toast.success(t('coupon-found'));
      },

      onError: (error) => {
        setCoupon(null);

        toast.error(error.message);
      },
    });
  };

  const handleRemoveCoupon = (id: string) => {
    setCoupons((currentCoupons) => currentCoupons.filter((coupon) => coupon.id !== id));

    setCoupon(null);
  };

  return (
    <div className="space-y-3">
      <CouponForm onApply={handleApplyCoupon} isPending={isPending} />

      <CouponList coupons={coupons} onRemove={handleRemoveCoupon} />
    </div>
  );
}
