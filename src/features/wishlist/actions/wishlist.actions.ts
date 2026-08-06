'use server';

import { revalidateTag } from 'next/cache';
import { getApiBaseUrl } from '@/shared/lib/utils/api-url';
import { getServerToken } from '@/shared/lib/auth/get-server-token';
import { IApiResponse } from '@/shared/lib/types/api';

export async function removeFromWishlistAction(id: string) {
  const token = await getServerToken();

  if (!token) {
    throw new Error('Unauthorized');
  }

  const response = await fetch(`${getApiBaseUrl()}/wishlist/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  const data: IApiResponse<null> = await response.json();

  if (!data.status) {
    throw new Error(data.message || 'Failed to remove item');
  }

  revalidateTag('wishlist', 'max');
}

export async function clearWishlistAction() {
  const token = await getServerToken();

  if (!token) {
    throw new Error('Unauthorized');
  }

  const response = await fetch(`${getApiBaseUrl()}/wishlist`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  const data: IApiResponse<null> = await response.json();

  if (!data.status) {
    throw new Error(data.message || 'Failed to clear wishlist');
  }

  revalidateTag('wishlist', 'max');
}