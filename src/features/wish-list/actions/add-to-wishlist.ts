'use server';
import { updateTag } from 'next/cache';
import { getNextAuthToken } from '@/shared/lib/utils/auth.utils';
import { IApiResponse } from '@/shared/lib/types/api';

import { AddToWishlistPayload, WishlistItemRequest } from '../types/wishlist';
import { getApiBaseUrl } from '@/shared/lib/utils/api-url';

export async function addToWishlist(body: WishlistItemRequest) {
  const jwt = await getNextAuthToken();
  const token = jwt?.token;

  if (!token) {
    throw new Error('User is not authenticated');
  }

  const response = await fetch(`${getApiBaseUrl()}/wishlist`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data: IApiResponse<AddToWishlistPayload> = await response.json();

  if (!response.ok || !data.status) {
    throw new Error(data.message || 'Failed to add product to wishlist');
  }
  updateTag('wishlist');
  return data.payload;
}
