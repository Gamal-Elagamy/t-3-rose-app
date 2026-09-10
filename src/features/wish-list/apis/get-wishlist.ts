import 'server-only';
import { getNextAuthToken } from '@/shared/lib/utils/auth.utils';
import { getApiBaseUrl } from '@/shared/lib/utils/api-url';
import { IApiResponse } from '@/shared/lib/types/api';
import { WishlistItem } from '../types/wishlist';

export async function getWishlist(): Promise<WishlistItem[]> {
  const jwt = await getNextAuthToken();
  const token = jwt?.token;

  if (!token) return [];

  const response = await fetch(`${getApiBaseUrl()}/wishlist`, {
    headers: { Authorization: `Bearer ${token}` },
    next: { tags: ['wishlist'] },
  });

  const data: IApiResponse<{ wishlistItems: WishlistItem[] }> = await response.json();

  if (!response.ok || !data.status || !data.payload) {
    throw new Error(data.message || 'Failed to fetch wishlist');
  }

  return data.payload.wishlistItems;
}
