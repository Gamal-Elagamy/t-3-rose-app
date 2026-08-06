import { IApiResponse } from '@/shared/lib/types/api';
import { getApiBaseUrl } from '@/shared/lib/utils/api-url';
import { getNextAuthToken } from '@/shared/lib/utils/auth.utils';
import { IAddress } from '../types/address';
import { HEADERS } from '@/shared/constant/api-header.constants';

export async function getAddresses(): Promise<IAddress[]> {
  const jwt = await getNextAuthToken();
  const token = jwt?.token;


  if (!token) {
    throw new Error('User is not authenticated');
  }

  const response = await fetch(`${getApiBaseUrl()}/addresses`, {
    headers: {
      ...HEADERS.JSON,
      ...HEADERS.AUTH(token),
    },
  });

  const data: IApiResponse<{ addresses: IAddress[] }> = await response.json();

  if (!data.status || !data.payload) {
    throw new Error(data.message || 'Failed to fetch addresses');
  }

  return data.payload.addresses;
}
