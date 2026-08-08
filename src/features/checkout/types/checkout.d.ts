export type PaymentMethod = "CREDIT_CARD" | "CASH_ON_DELIVERY"

export interface PayloadCheckOut {
    addressId: string,
    paymentMethod: PaymentMethod
    couponCode?: string,
}


type OrderStatus = 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

type PaymentMethod = 'CASH_ON_DELIVERY' | 'CARD';

type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';

export interface Order {
    id: string;
    userId: string;
    addressId: string;
    couponId: string | null;
    status: OrderStatus;
    paymentMethod: PaymentMethod;
    paymentStatus: PaymentStatus;
    stripePaymentIntentId: string | null;
    subtotal: string;
    discount: string;
    shipping: string;
    total: string;
    trackingNumber: string | null;
    notes: string | null;
    createdAt: string;
    updatedAt: string;
};