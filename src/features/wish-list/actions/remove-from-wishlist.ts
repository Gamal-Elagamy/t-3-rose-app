'use server';

import { IApiResponse } from '@/shared/lib/types/api';

import { RemoveWishlistItemRequest } from '../types/wishlist';
import { getNextAuthToken } from '@/shared/lib/utils/auth.utils';
import { getApiBaseUrl } from '@/shared/lib/utils/api-url';

interface RemoveWishlistPayload {
  message: string;
}

export async function removeFromWishlist({ id }: RemoveWishlistItemRequest) {
  const jwt = await getNextAuthToken();
  const token = jwt?.token;

  if (!token) {
    throw new Error('User is not authenticated');
  }

  const response = await fetch(`${getApiBaseUrl()}/wishlist/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data: IApiResponse<RemoveWishlistPayload> = await response.json();

  if (!response.ok || !data.status) {
    throw new Error(data.message || 'Failed to remove item from wishlist');
  }

  return data;
}
