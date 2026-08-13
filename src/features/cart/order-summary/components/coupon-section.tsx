'use client';

import { useState } from 'react';
import { CouponForm } from './coupon-form';
import { CouponList } from './coupon-list';
import { ICoupon } from '../types/copons';
import { useCoupon } from '../context/coupon-context';

export function CouponSection() {
  const [coupons, setCoupons] = useState<ICoupon[]>([]);

  const { setCoupon } = useCoupon();

  const handleCouponFound = (coupon: ICoupon) => {
    setCoupons([coupon]);
    setCoupon(coupon);
  };

  const handleCouponNotFound = () => {
    setCoupons([]);
    setCoupon(null);
  };

  const handleRemoveCoupon = (id: string) => {
    setCoupons((currentCoupons) => currentCoupons.filter((coupon) => coupon.id !== id));

    setCoupon(null);
  };


  return (
    <div className="space-y-3">
      <CouponForm onCouponFound={handleCouponFound} onCouponNotFound={handleCouponNotFound} />

      <CouponList coupons={coupons} onRemove={handleRemoveCoupon} />
    </div>
  );
}
