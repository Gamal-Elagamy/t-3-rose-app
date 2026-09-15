"use client"

import { useMutation } from "@tanstack/react-query"
import { checkoutAction } from "../apis/checkout.action"
import { useRouter } from "@/i18n/navigation"
import { toast } from "sonner"

export const useCheckoutMutation = () => {
    const router = useRouter()
    return useMutation({
        mutationFn: checkoutAction,
        onSuccess: (data) => {
            const checkout = data.payload?.checkout;

            if (checkout) {
                // Credit Card
                window.location.href = checkout.checkoutUrl;
                return;
            }

            // Cash on Delivery
            router.push('/orders');
        },
        onError: (error) => {
            toast.error(error.message);
        },
    })
}