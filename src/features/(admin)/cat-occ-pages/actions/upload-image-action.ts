'use server';
import { HEADERS } from '@/shared/constant/api-header.constants';
import { getApiBaseUrl } from '@/shared/lib/utils/api-url';
import { getNextAuthToken } from '@/shared/lib/utils/auth.utils';
import { IApiResponse } from '@/shared/lib/types/api';
import { UploadImageFields } from '../schema/add-categories.schema';

interface UploadPhotoResponse {
  url: string;
}

export default async function uploadImageAction(fields: UploadImageFields) {
  const jwt = await getNextAuthToken();
  const token = jwt?.token;

  const formData = new FormData();
  formData.append('image', fields.image as File);

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
    throw new Error(data.message || 'Failed to upload image');
  }

  return data;
}
