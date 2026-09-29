'use server';

import { IApiResponse } from '@/shared/lib/types/api';
import { getApiBaseUrl } from '@/shared/lib/utils/api-url';
import { getNextAuthToken } from '@/shared/lib/utils/auth.utils';
import { AddAddressPayload } from '../types/address';

export async function deleteAddressAction(id: string) {
  const jwt = await getNextAuthToken();
  const token = jwt?.token;

  if (!token) {
    throw new Error('User is not authenticated');
  }

  const response = await fetch(`${getApiBaseUrl()}/addresses/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data: IApiResponse<AddAddressPayload> = await response.json();

  if (!response.ok || !data.status) {
    throw new Error(data.message || 'Failed to delete address');
  }

  return data;
}
