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

export async function addItemRequest(resource: string, fields: AddItemsFields) {
  const jwt = await getNextAuthToken();
  const token = jwt?.token;
  if (!token) throw new Error('Unauthorized');

  const body: AddItemsFields = { ...fields };
  if ('image' in body && typeof body.image === 'string' && !body.image.startsWith('http')) {
    body.image = `${getApiBaseUrl()}${body.image}`;
  }

  const response = await fetch(`${getApiBaseUrl()}/${resource}`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { ...HEADERS.JSON, ...HEADERS.AUTH(token) },
  });

  const data: IApiResponse<IAddItemResponse> = await response.json();
  if (!response.ok || !data.status) {
    throw new Error(data.message || `Failed to add ${resource} item`);
  }
  return data;
}

export async function updateItemRequest<TItem, K extends string>(
  resource: string,
  { id, title, description }: { id: string; title: string; description?: string }
) {
  const jwt = await getNextAuthToken();
  const token = jwt?.token;
  if (!token) throw new Error('Unauthorized');

  const response = await fetch(`${getApiBaseUrl()}/${resource}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ title, description }),
    headers: { ...HEADERS.JSON, ...HEADERS.AUTH(token) },
  });

  const data: IApiResponse<Record<K, TItem>> = await response.json();
  if (!response.ok || !data.status) {
    throw new Error(data.message || `Failed to update ${resource} item`);
  }
  return data;
}

export async function deleteItemRequest<TItem, K extends string>(resource: string, id: string) {
  const jwt = await getNextAuthToken();
  const token = jwt?.token;
  if (!token) throw new Error('Unauthorized');

  const response = await fetch(`${getApiBaseUrl()}/${resource}/${id}`, {
    method: 'DELETE',
    headers: { ...HEADERS.JSON, ...HEADERS.AUTH(token) },
  });

  const data: IApiResponse<Record<K, TItem>> = await response.json();
  if (!response.ok || !data.status) {
    throw new Error(data.message || `Failed to delete ${resource} item`);
  }
  return data;
}
