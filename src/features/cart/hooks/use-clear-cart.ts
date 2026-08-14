'use client';

import { useMutation } from '@tanstack/react-query';
import { clearUserCart } from '../api/delete-item-cart';

export function useClearCart() {
  return useMutation({
    mutationFn: async () => {
      return await clearUserCart();
    },
  });
}
