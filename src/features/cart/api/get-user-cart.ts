import { IApiResponse } from '@/shared/lib/types/api';
import { getApiBaseUrl } from '@/shared/lib/utils/api-url';
import { getNextAuthToken } from '@/shared/lib/utils/auth.utils';
import { CartItem } from '../types/cart';

interface ICartRes {
  status: boolean;
  code: number;
  message: string;
  cartItems: CartItem[];
}

export default async function getUserCart() {
  // Get Token
  const jwt = await getNextAuthToken();

  const response = await fetch(`${getApiBaseUrl()}/cart`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt?.token}`,
    },
  });

  const data: IApiResponse<ICartRes> = await response.json();

  if (!response.ok || !data.status || !data.payload) {
    throw new Error(data.message ?? 'Failed to fetch Cart Items');
  }

  return data.payload.cartItems;
}
