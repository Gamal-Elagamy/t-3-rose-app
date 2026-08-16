'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { IProduct } from '@/features/products/types/products';
import { getCartProducts } from '../api/get-cart-products';

export function useCartProducts(productIds: string[]) {
  return useQuery<IProduct[]>({
    queryKey: ['cart-products', productIds.slice().sort()],
    queryFn: () => getCartProducts(productIds),
    enabled: productIds.length > 0,
     placeholderData: keepPreviousData,
  });
}
