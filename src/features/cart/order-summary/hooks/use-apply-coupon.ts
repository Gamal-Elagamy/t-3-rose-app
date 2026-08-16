import { useMutation } from '@tanstack/react-query';
import GetCoupon from '../apis/get-coupon.api';

export default function useApplyCoupon() {
  return useMutation({
    mutationFn: async (couponCode: string) => {
      console.log('MUTATION START:', couponCode);

      const response = await GetCoupon(couponCode);

      console.log('MUTATION RESPONSE:', response);

      return response;
    },

    onSuccess: (response) => {
      console.log('MUTATION SUCCESS:', response);
    },

    onError: (error) => {
      console.error('MUTATION ERROR:', error);
    },
  });
}