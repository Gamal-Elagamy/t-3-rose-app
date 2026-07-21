'use server';

import { IApiResponse } from '@/shared/lib/types/api';

// import { AddToCartPayload, CartItemRequest } from '../types/cart';
import { getNextAuthToken } from '@/shared/lib/utils/auth.utils';
import { AddToCartPayload, CartItemRequest } from '../types/cart';

export async function addToCart(body: CartItemRequest) {
  const jwt = await getNextAuthToken();
  const token = jwt?.token;

  if (!token) {
    throw new Error('Unauthorized');
  }

  const response = await fetch(`${process.env.API_URL}/cart`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data: IApiResponse<AddToCartPayload> = await response.json();

  if (!response.ok || !data.status) {
    throw new Error(data.message || 'Failed to add product to cart');
  }

  return data.payload;
}
