'use server';

import { IApiResponse } from '@/shared/lib/types/api';

import { getNextAuthToken } from '@/shared/lib/utils/auth.utils';
import { AddToCartPayload, CartItemRequest } from '../types/cart';
import { getApiBaseUrl } from '@/shared/lib/utils/api-url';

export async function addToCart(body: CartItemRequest) {
  const jwt = await getNextAuthToken();
  const token = jwt?.token;
  if (!token) {
    throw new Error('Unauthorized');
  }

  const response = await fetch(`${getApiBaseUrl()}/cart`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data: IApiResponse<AddToCartPayload> = await response.json();

  console.log(data)
  if (!response.ok || !data.status) {
    throw new Error(data.message || 'Failed to add product to cart');
  }

  return data.payload;
}
