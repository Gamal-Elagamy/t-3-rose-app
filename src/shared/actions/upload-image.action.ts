'use server';

import { getApiBaseUrl } from '@/shared/lib/utils/api-url';
import { IApiResponse } from '@/shared/lib/types/api';
import { getNextAuthToken } from '@/shared/lib/utils/auth.utils';

export async function uploadImage(file: File): Promise<string> {
  const jwt = await getNextAuthToken();
  const token = jwt?.token;

  if (!token) {
    throw new Error('User is not authenticated');
  }

  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch(`${getApiBaseUrl()}/upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data: IApiResponse<{ url: string }> = await response.json();

  if (!response.ok || !data.status || !data.payload) {
    throw new Error(data.message || 'Failed to upload image');
  }

  return data.payload.url;
}
