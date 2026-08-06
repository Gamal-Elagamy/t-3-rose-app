import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import GetCoupon from "../apis/get-coupon.api";

export default function UseApplyCoupon() {
  return useMutation({
    mutationFn: GetCoupon,

    onSuccess: (response) => {
      if (!response.payload?.data.length) {
        toast.error("Coupon not found");
        return;
      } 
      
      const coupon = response.payload.data[0];

      console.log(coupon);

      toast.success("Coupon applied successfully");
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
}