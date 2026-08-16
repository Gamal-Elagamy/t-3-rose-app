'use server';
import { getApiBaseUrl } from '@/shared/lib/utils/api-url';
import { getNextAuthToken } from '@/shared/lib/utils/auth.utils';

// Delete Item
export default async function deleteUserCart(cartItemId: string) {
  // Get Token
  const jwt = await getNextAuthToken();

  const response = await fetch(`${getApiBaseUrl()}/cart/${cartItemId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt?.token}`,
    },
  });

  const data = await response.json();

  if (!response.ok || !data.status) {
    throw new Error(data.message ?? 'Failed to delete Cart Item');
  }

  return data;
}

// Clear Cart Items
export async function clearUserCart() {
  // Get Token
  const jwt = await getNextAuthToken();

  const response = await fetch(`${getApiBaseUrl()}/cart`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt?.token}`,
    },
  });

  const data = await response.json();

  if (!response.ok || !data.status) {
    throw new Error(data.message ?? 'Failed to Clear Cart Items');
  }

  return data;
}
