'use server';
import { getApiBaseUrl } from '@/shared/lib/utils/api-url';
import { getNextAuthToken } from '@/shared/lib/utils/auth.utils';
import { ProfileFormValues } from '../schemas/profile-form.schema';
import { IApiResponse } from '@/shared/lib/types/api';
import { IUser } from '@/shared/lib/types/user';
import { HEADERS } from '@/shared/constant/api.constant';

export default async function updateProfileAction(values: ProfileFormValues) {
  const jwt = await getNextAuthToken();
  const token = jwt?.token;

  if (!token) throw new Error('Unauthorized');

  const response = await fetch(`${getApiBaseUrl()}/users/profile`, {
    method: 'PATCH',
    body: JSON.stringify(values),
    headers: {
      ...HEADERS.JsonBody,
      ...HEADERS.authorize(token),
    },
  });

  const data: IApiResponse<{ user: IUser }> = await response.json();

  if (!response.ok || !data.status) {
    throw new Error(data.message || 'Failed to update profile');
  }

  return data;
}
