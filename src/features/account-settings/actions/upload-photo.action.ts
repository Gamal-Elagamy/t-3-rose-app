'use server';
import { HEADERS } from '@/shared/constant/api-header.constants';
import { getApiBaseUrl } from '@/shared/lib/utils/api-url';
import { getNextAuthToken } from '@/shared/lib/utils/auth.utils';
import { IApiResponse } from '@/shared/lib/types/api';

interface UploadPhotoResponse {
  url: string;
}

export default async function uploadPhotoAction(formData: FormData) {
  const jwt = await getNextAuthToken();
  const token = jwt?.token;

  if (!token) throw new Error('Unauthorized');

  const response = await fetch(`${getApiBaseUrl()}/upload`, {
    method: 'POST',
    body: formData,
    headers: {
      ...HEADERS.AUTH(token),
    },
  });

  const data: IApiResponse<UploadPhotoResponse> = await response.json();

  if (!response.ok || !data.status) {
    throw new Error(data.message || 'Failed to upload photo');
  }

  return data;
}
