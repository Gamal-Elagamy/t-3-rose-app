import { useContext } from "react";
import { CheckoutContext } from "../providers/checkout-provider";

export function useCheckout() {
    const context = useContext(CheckoutContext);

    if (!context) {
        throw new Error('useCheckout must be used within CheckoutProvider');
    }

    return context;
}