'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useState,
} from 'react';

import { ICoupon } from '../types/copons';

interface CouponContextType {
  coupon: ICoupon | null;
  setCoupon: (coupon: ICoupon | null) => void;
  clearCoupon: () => void;
}

const CouponContext = createContext<
  CouponContextType | undefined
>(undefined);

export function CouponProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [coupon, setCoupon] =
    useState<ICoupon | null>(null);

  const clearCoupon = () => {
    setCoupon(null);
  };

  return (
    <CouponContext.Provider
      value={{
        coupon,
        setCoupon,
        clearCoupon,
      }}
    >
      {children}
    </CouponContext.Provider>
  );
}

export function useCoupon() {
  const context = useContext(CouponContext);

  if (!context) {
    throw new Error(
      'useCoupon must be used inside CouponProvider'
    );
  }

  return context; 
}