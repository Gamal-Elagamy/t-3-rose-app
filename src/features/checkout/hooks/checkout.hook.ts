"use client"

import { useMutation } from "@tanstack/react-query"
import { checkoutAction } from "../apis/checkout.action"

export const useCheckoutMutation = () => {
    return useMutation({
        mutationFn: checkoutAction
    })
}