'use server';
import { getApiBaseUrl } from '@/shared/lib/utils/api-url';
import { getNextAuthToken } from '@/shared/lib/utils/auth.utils';
import { IApiResponse } from '@/shared/lib/types/api';
import { HEADERS } from '@/shared/constant/api.constant';

export default async function deleteAccountAction() {
  const jwt = await getNextAuthToken();
  const token = jwt?.token;

  if (!token) throw new Error('Unauthorized');

  const response = await fetch(`${getApiBaseUrl()}/users/account`, {
    method: 'DELETE',
    headers: {
      ...HEADERS.JsonBody,
      ...HEADERS.authorize(token),
    },
  });

  const data: IApiResponse<{ message: string }> = await response.json();

  if (!response.ok || !data.status) {
    throw new Error(data.message || 'Failed to delete account');
  }

  return data;
}
