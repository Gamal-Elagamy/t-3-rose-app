import { IApiResponse } from '@/shared/lib/types/api';
import { getApiBaseUrl } from '@/shared/lib/utils/api-url';
import { getNextAuthToken } from '@/shared/lib/utils/auth.utils';
import { IAddress } from '../types/address';
import { redirect } from '@/i18n/navigation';
import { HEADERS } from '@/shared/constant/api.constant';

export async function getAddresses(locale: 'en' | 'ar'): Promise<IAddress[]> {
  const jwt = await getNextAuthToken();
  const token = jwt?.token;

  if (!token) {
    redirect({ href: '/login', locale });
  }
 console.log(token) 

  const response = await fetch(`${getApiBaseUrl()}/addresses`, {
    headers: {
      ...HEADERS.JsonBody,
      ...HEADERS.authorize(token!),
    },
  });

  if (response.status === 401) {
    redirect({ href: '/login', locale });
  }

  const data: IApiResponse<{ addresses: IAddress[] }> = await response.json();

  if (!data.status || !data.payload) {
    throw new Error(data.message || 'Failed to fetch addresses');
  }

  return data.payload.addresses;
}
