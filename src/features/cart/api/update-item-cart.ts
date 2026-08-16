'use server';
import { getApiBaseUrl } from '@/shared/lib/utils/api-url';
import { getNextAuthToken } from '@/shared/lib/utils/auth.utils';

interface IProps {
  cartItemId: string;
  quantity: number;
}

// Update Item
export default async function updateUserCart({ cartItemId, quantity }: IProps) {
  // Get Token
  const jwt = await getNextAuthToken();

  const response = await fetch(`${getApiBaseUrl()}/cart/${cartItemId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt?.token}`,
    },
    body: JSON.stringify({ quantity }),
  });

  const data = await response.json();

  if (!response.ok || !data.status) {
    throw new Error(data.message ?? 'Failed to update Cart Item');
  }

  return data;
}
