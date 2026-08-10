'use client';

import { useMemo } from 'react';

import { useCoupon } from '../context/coupon-context';
import { useCart } from '@/features/cart/context/cart.context';

interface TotalPriceProps {
  currency?: string;
}

export function TotalPrice({
  currency = 'EGP',
}: TotalPriceProps) {
  const { cartTotal } = useCart();
  const { coupon } = useCoupon();

  const total = useMemo(() => {
    const subtotal = Number(cartTotal ?? 0);

    if (!coupon) {
      return subtotal;
    }

    const couponValue = Number(coupon.value);
    const maxDiscount = Number(coupon.maxDiscount);

    let discount = 0;

    if (coupon.type === 'PERCENT') {
      const percentageDiscount =
        (subtotal * couponValue) / 100;

      discount = Math.min(
        percentageDiscount,
        maxDiscount
      );
    } else {
      discount = Math.min(
        couponValue,
        subtotal
      );
    }

    return Math.max(subtotal - discount, 0);
  }, [cartTotal, coupon]);

  return (
    <div className="flex items-center justify-between">
      <span className="text-base font-bold text-red-700">
        Total
      </span>

      <span className="text-base font-bold text-red-700">
        {total.toFixed(2)} {currency}
      </span>
    </div>
  );
}