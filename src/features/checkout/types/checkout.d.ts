export type PaymentMethod = "CREDIT_CARD" | "CASH_ON_DELIVERY"

export interface PayloadCheckOut {
    addressId: string,
    paymentMethod: PaymentMethod
    couponCode?: string,
}