"use client"

import { useMutation } from "@tanstack/react-query"
import { checkoutAction, postPaymentIntent } from "../apis/checkout.action"

export const useCheckoutMutation = () => {
    return useMutation({
        mutationFn: checkoutAction
    })
}

export const usePostPaymentIntentMutation = () => {
    return useMutation({
        mutationFn: postPaymentIntent
    })
}