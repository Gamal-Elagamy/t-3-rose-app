'use client';

import { useMutation } from '@tanstack/react-query';

import { addToWishlist } from '../actions/add-to-wishlist';

export function useAddToWishlist() {
  return useMutation({
    mutationFn: addToWishlist,
  });
}
