"use server"

import { getNextAuthToken } from "@/shared/lib/utils/auth.utils"
import { Order, PayloadCheckOut } from "../types/checkout"
import { RESPONSES } from "@/shared/constant/api.responses"
import { HEADERS } from "@/shared/constant/api.constant"
import { IApiResponse } from "@/shared/lib/types/api"

export async function checkoutAction(payload: PayloadCheckOut) {
    const token = await getNextAuthToken()

    if (!token) return RESPONSES.unauthorized

    const res = await fetch(`${process.env.API_URL}/orders`, {
        method: "POST",
        headers: {
            ...HEADERS.JsonBody,
            ...HEADERS.authorize(token.token),
        },
        body: JSON.stringify(payload)
    })

    const data: IApiResponse<{order:Order}> = await res.json()
    console.log("################################")
    console.log(payload)
    console.log(data)
    console.log("################################")
    if (!data.status) {
        throw new Error(data.message || "Checkout failed")
    }
    return data
}

export async function postPaymentIntent(orderId: string) {
    const token = await getNextAuthToken()

    if (!token) return RESPONSES.unauthorized

    const res = await fetch(`${process.env.API_URL}/payments/create-intent`, {
        method: "POST",
        headers: {
            ...HEADERS.JsonBody,
            ...HEADERS.authorize(token.token),
        },
        body: JSON.stringify({orderId})
    })

    const data: IApiResponse<string> = await res.json()
    console.log("POST PAYMENT INTENT")
    console.log(data)
    console.log("POST PAYMENT INTENT")
    if (!data.status) {
        throw new Error(data.message || "Payment intent failed")
    }
    return data
}