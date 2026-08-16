'use client';

import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { addToCart } from '../actions/add-to-cart';
import { addGuestCartItem } from '../storage/guest-cart';
import { CartItemRequest } from '../types/cart';
import { useCart } from '../context/cart.context';

export function useAddToCart() {
  const { data: session } = useSession();

  const { refreshCart } = useCart();

  return useMutation({
    mutationFn: async (body: CartItemRequest) => {
      if (session?.user) {
        return await addToCart(body);
      }

      addGuestCartItem(body);

      return null;
    },
    onSuccess: async () => {
      await refreshCart();
    },
  });
}
