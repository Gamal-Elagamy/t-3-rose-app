'use server';

import { IApiResponse } from '@/shared/lib/types/api';
import { getApiBaseUrl } from '@/shared/lib/utils/api-url';
import { getNextAuthToken } from '@/shared/lib/utils/auth.utils';

import { AddAddressRequest, AddAddressPayload } from '../types/address';

import { HEADERS } from '@/shared/constant/api.constant';

export async function updateAddressAction({ id, body }: { id: string; body: AddAddressRequest }) {
  const jwt = await getNextAuthToken();
  const token = jwt?.token;

  if (!token) {
    throw new Error('User is not authenticated');
  }

  const response = await fetch(`${getApiBaseUrl()}/addresses/${id}`, {
    method: 'PATCH',
    headers: {
      ...HEADERS.JsonBody,
      ...HEADERS.authorize(token),
    },
    body: JSON.stringify(body),
  });

  const data: IApiResponse<AddAddressPayload> = await response.json();

  if (!response.ok || !data.status || !data.payload) {
    throw new Error(data.message || 'Failed to update address');
  }

  return data.payload;
}
