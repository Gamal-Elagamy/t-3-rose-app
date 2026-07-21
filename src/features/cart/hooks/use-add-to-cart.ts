'use client';

import { useMutation } from '@tanstack/react-query';

import { addToCart } from '../actions/add-to-cart';

export function useAddToCart() {
  return useMutation({
    mutationFn: addToCart,
  });
}
