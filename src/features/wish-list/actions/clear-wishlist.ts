'use server';

import { updateTag } from 'next/cache';
import { IApiResponse } from '@/shared/lib/types/api';
import { getNextAuthToken } from '@/shared/lib/utils/auth.utils';
import { getApiBaseUrl } from '@/shared/lib/utils/api-url';

export async function clearWishlist() {
  const jwt = await getNextAuthToken();
  const token = jwt?.token;

  if (!token) {
    throw new Error('User is not authenticated');
  }

  const response = await fetch(`${getApiBaseUrl()}/wishlist`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  const data: IApiResponse<{ message: string }> = await response.json();

  if (!response.ok || !data.status) {
    throw new Error(data.message || 'Failed to clear wishlist');
  }

  updateTag('wishlist');

  return data;
}
