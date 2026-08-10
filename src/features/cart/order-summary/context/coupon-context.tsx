'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';

import { ICoupon } from '../types/copons';

interface CouponContextType {
  coupon: ICoupon | null;
  setCoupon: (coupon: ICoupon | null) => void;
  clearCoupon: () => void;
  discount: number;
}

const CouponContext = createContext<CouponContextType | undefined>(
  undefined
);

interface CouponProviderProps {
  children: ReactNode;
}

export function CouponProvider({ children }: CouponProviderProps) {
  const [coupon, setCoupon] = useState<ICoupon | null>(null);

  const discount = useMemo(() => {
    if (!coupon) {
      return 0;
    }

    return 0;
  }, [coupon]);

  const clearCoupon = () => {
    setCoupon(null);
  };

  return (
    <CouponContext.Provider
      value={{
        coupon,
        setCoupon,
        clearCoupon,
        discount,
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