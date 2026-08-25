'use server';
import { HEADERS } from '@/shared/constant/api-header.constants';
import { getApiBaseUrl } from '@/shared/lib/utils/api-url';
import { getNextAuthToken } from '@/shared/lib/utils/auth.utils';
import { IApiResponse } from '@/shared/lib/types/api';
import { AddItemsFields } from '../schema/add-categories.schema';
import { IAddItemResponse } from './add-categories-item.api';

// Add Occasion Item
export default async function addOccasionItemApi(fields: AddItemsFields) {
  const jwt = await getNextAuthToken();
  const token = jwt?.token;

  if (!token) throw new Error('Unauthorized');

  const payload = {
    ...fields,
    image: fields.image.startsWith('http') ? fields.image : `${getApiBaseUrl()}${fields.image}`,
  };

  const response = await fetch(`${getApiBaseUrl()}/occasions`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      ...HEADERS.JSON,
      ...HEADERS.AUTH(token),
    },
  });

  const data: IApiResponse<IAddItemResponse> = await response.json();

  if (!response.ok || !data.status) {
    throw new Error(data.message || 'Failed to add occasion item');
  }

  return data;
}
