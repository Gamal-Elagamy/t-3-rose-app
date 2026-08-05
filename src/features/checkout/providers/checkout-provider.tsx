'use client';

import {
    createContext,
    useMemo,
    useState,
    type ReactNode,
} from 'react';

export type PaymentMethod = 'cash' | 'card';

export interface CheckoutState {
    addressId?: string;
    paymentMethod?: PaymentMethod;
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
    const [checkout, setCheckout] = useState<CheckoutState>({});

    const updateCheckout = (data: Partial<CheckoutState>) => {
        setCheckout((prev) => ({
            ...prev,
            ...data,
        }));
    };

    const resetCheckout = () => {
        setCheckout({});
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

