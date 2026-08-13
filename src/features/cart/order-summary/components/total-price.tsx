'use client';

import { useMemo, useState } from 'react';

import { useCart } from '../../context/cart.context';
import { useCoupon } from '../context/coupon-context';
import UseApplyCoupon from '../hooks/use-apply-coupon';
import { ICoupon } from '../types/copons';
import { useTranslations } from 'next-intl';

interface Props {
  currency?: string;
}

export function TotalPrice({ currency = 'EGP' }: Props) {
  const { totalPrice } = useCart();
  const { coupon } = useCoupon();

    const t = useTranslations("order-summary");
  

  const total = useMemo(() => {
    const subtotal = Number(totalPrice) || 0;

    if (!coupon) {
      return subtotal;
    }

    const couponValue = Number(coupon.value) || 0;
    const maxDiscount = Number(coupon.maxDiscount) || 0;

    let discount = 0;

    if (coupon.type === 'PERCENT') {
      const percentageDiscount = (subtotal * couponValue) / 100;

      discount = Math.min(percentageDiscount, maxDiscount);
    } else {
      discount = Math.min(couponValue, subtotal);
    }

    const finalTotal = Math.max(subtotal - discount, 0);

    return finalTotal;
  }, [totalPrice, coupon]);
  return (
    <div className="flex items-center justify-between gap-2 border-t border-zinc-200 pt-4">
      <span className="text-lg font-semibold text-maroon-600 sm:text-xl">{t("total")}</span>

      <span className="text-right text-lg font-semibold text-maroon-600 sm:text-xl">
        {total} {currency}
      </span>
    </div>
  );
}
