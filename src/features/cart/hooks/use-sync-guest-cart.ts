'use client';

import { useMutation } from '@tanstack/react-query';

import { addToCart } from '../actions/add-to-cart';
import { clearGuestCart, getGuestCart } from '../storage/guest-cart';

export function useSyncGuestCart() {
  return useMutation({
    mutationFn: async () => {
      const guestCart = getGuestCart();

      if (!guestCart.length) {
        return;
      }

      for (const item of guestCart) {
        await addToCart(item);
      }

      clearGuestCart();
    },
  });
}
