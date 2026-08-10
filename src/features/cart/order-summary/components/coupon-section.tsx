"use client";

import { useState } from "react";
import { CouponForm } from "./coupon-form";
import { CouponList } from "./coupon-list";
import { ICoupon } from "../types/copons";

export function CouponSection() {
  const [coupons, setCoupons] = useState<ICoupon[]>([]);

  const handleCouponFound = (coupon: ICoupon) => {
    setCoupons([coupon]);
  };

  const handleCouponNotFound = () => {
    setCoupons([]);
  };

  const handleRemoveCoupon = (id: string) => {
    setCoupons((currentCoupons) =>
      currentCoupons.filter((coupon) => coupon.id !== id)
    );
  };

  return (
    <div className="space-y-3">
      <CouponForm
        onCouponFound={handleCouponFound}
        onCouponNotFound={handleCouponNotFound}
      />

      <CouponList
        coupons={coupons}
        onRemove={handleRemoveCoupon}
      />
    </div>
  );
}