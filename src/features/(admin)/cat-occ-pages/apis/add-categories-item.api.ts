'use server';
import { HEADERS } from '@/shared/constant/api-header.constants';
import { getApiBaseUrl } from '@/shared/lib/utils/api-url';
import { getNextAuthToken } from '@/shared/lib/utils/auth.utils';
import { IApiResponse } from '@/shared/lib/types/api';
import { AddItemsFields } from '../schema/add-categories.schema';

export interface IAddItemResponse {
  status: boolean;
  code: number;
  message: string;
  payload: [];
}

// Add Categorie Item
export default async function addCategoriesItemApi(fields: AddItemsFields) {
  const jwt = await getNextAuthToken();
  const token = jwt?.token;

  if (!token) throw new Error('Unauthorized');

  const response = await fetch(`${getApiBaseUrl()}/categories`, {
    method: 'POST',
    body: JSON.stringify(fields),
    headers: {
      ...HEADERS.JSON,
      ...HEADERS.AUTH(token),
    },
  });

  const data: IApiResponse<IAddItemResponse> = await response.json();

  if (!response.ok || !data.status) {
    throw new Error(data.message || 'Failed to add categorie item');
  }

  return data;
}
