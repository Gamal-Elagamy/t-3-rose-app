'use server';

import { updateTag } from 'next/cache';
import { getApiBaseUrl } from '@/shared/lib/utils/api-url';
import { IApiResponse } from '@/shared/lib/types/api';
import { HEADERS } from '@/shared/constant/api-header.constants';
import { RESPONSES } from '@/shared/constant/api.responses';
import { getNextAuthToken } from '@/shared/lib/utils/auth.utils';

export async function deleteProduct(id: string): Promise<{ message: string }> {
  const token = await getNextAuthToken();

  if (!token?.token) {
    throw new Error(RESPONSES.unauthorized.message);
  }

  const response = await fetch(`${getApiBaseUrl()}/products/${id}`, {
    method: 'DELETE',
    headers: {
      ...HEADERS.AUTH(token.token),
    },
  });

  const data: IApiResponse<{ message: string }> = await response.json();

  if (!response.ok || !data.status) {
    throw new Error(data.message || 'Failed to delete product');
  }

  updateTag('products');

  return data.payload ?? { message: 'Product deleted successfully' };
}