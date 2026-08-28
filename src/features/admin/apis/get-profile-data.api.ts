import { HEADERS } from '@/shared/constant/api-header.constants';
import { IApiResponse } from '@/shared/lib/types/api';
import { IUser } from '@/shared/lib/types/user';
import { getApiBaseUrl } from '@/shared/lib/utils/api-url';
import { getNextAuthToken } from '@/shared/lib/utils/auth.utils';

export default async function getProfileData() {
  const jwt = await getNextAuthToken();
  const token = jwt?.token;

  const response = await fetch(`${getApiBaseUrl()}/users/profile`, {
    method: 'GET',
    headers: {
      ...HEADERS.JSON,
      ...HEADERS.AUTH(token || ''),
    },
  });
  const data: IApiResponse<{ user: IUser }> = await response.json();

  if (!response.ok || !data.status || !data.payload) {
    throw new Error(data.message || 'Failed to get profile data');
  }

  return data.payload;
}
