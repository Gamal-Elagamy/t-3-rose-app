'use client';

import {
    createContext,
    useMemo,
    useState,
    type ReactNode,
} from 'react';
import { PaymentMethod } from '../types/checkout';


export interface CheckoutState {
    addressId: string;
    paymentMethod: PaymentMethod;
    couponCode?: string;
}

interface CheckoutContextValue {
    checkout: CheckoutState;
    updateCheckout: (data: Partial<CheckoutState>) => void;
    resetCheckout: () => void;
}

export const CheckoutContext = createContext<CheckoutContextValue | null>(null);

export function CheckoutProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [checkout, setCheckout] = useState<CheckoutState>({
        addressId: '',
        paymentMethod: "CASH_ON_DELIVERY",
        couponCode: undefined,
    });

    const updateCheckout = (data: Partial<CheckoutState>) => {
        setCheckout((prev) => ({
            ...prev,
            ...data,
        }));
    };

    const resetCheckout = () => {
        setCheckout({
            addressId: '',
            paymentMethod: "CASH_ON_DELIVERY",
            couponCode: undefined,
        });
    };

    const value = useMemo(
        () => ({
            checkout,
            updateCheckout,
            resetCheckout,
        }),
        [checkout]
    );

    return (
        <CheckoutContext.Provider value={value}>
            {children}
        </CheckoutContext.Provider>
    );
}

