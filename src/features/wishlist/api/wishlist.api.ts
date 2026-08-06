import 'server-only';
import { getApiBaseUrl } from '@/shared/lib/utils/api-url';
import { getServerToken } from '@/shared/lib/auth/get-server-token';
import { IWishlistItem } from '../types/wishlist';
import { IApiResponse } from '@/shared/lib/types/api';

export async function getWishlist(): Promise<IWishlistItem[]> {
  const token = await getServerToken();

  if (!token) return [];

  const response = await fetch(`${getApiBaseUrl()}/wishlist`, {
    headers: { Authorization: `Bearer ${token}` },
    next: { tags: ['wishlist'] },
  });

  const data: IApiResponse<{ wishlistItems: IWishlistItem[] }> = await response.json();

  if (!data.status || !data.payload) {
    throw new Error(data.message || 'Failed to fetch wishlist');
  }

  return data.payload.wishlistItems;
}