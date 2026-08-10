import { useMutation } from "@tanstack/react-query";
import getCoupon from "../apis/get-coupon.api";

export default function useApplyCoupon() {
  return useMutation({
    mutationFn: getCoupon,
  });
}