import { useMutation } from '@tanstack/react-query';
import GetCoupon from '../apis/get-coupon.api';

export default function UseApplyCoupon() {
  return useMutation({
    mutationFn: (couponCode: string) => {
      return GetCoupon(couponCode);
    },
  });
}