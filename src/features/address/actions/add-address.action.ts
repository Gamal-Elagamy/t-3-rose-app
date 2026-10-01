'use server';

import { IApiResponse } from '@/shared/lib/types/api';
import { getApiBaseUrl } from '@/shared/lib/utils/api-url';
import { getNextAuthToken } from '@/shared/lib/utils/auth.utils';

import { AddAddressPayload, AddAddressRequest } from '../types/address';

import { HEADERS } from '@/shared/constant/api.constant';

export async function addAddressAction(body: AddAddressRequest) {
  const jwt = await getNextAuthToken();
  const token = jwt?.token;

  if (!token) {
    throw new Error('User is not authenticated');
  }

  const response = await fetch(`${getApiBaseUrl()}/addresses`, {
    method: 'POST',
    headers: {
      ...HEADERS.JsonBody,
      ...HEADERS.authorize(token),
    },
    body: JSON.stringify(body),
  });

  const data: IApiResponse<AddAddressPayload> = await response.json();

  if (!response.ok || !data.status || !data.payload) {
    throw new Error(data.message || 'Failed to add address');
  }

  return data.payload;
}
