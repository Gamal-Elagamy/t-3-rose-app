'use server';
import { HEADERS } from '@/shared/constant/api-header.constants';
import { getApiBaseUrl } from '@/shared/lib/utils/api-url';
import { getNextAuthToken } from '@/shared/lib/utils/auth.utils';
import { IApiResponse } from '@/shared/lib/types/api';
import { Category } from '@/features/products/types/product-details';
import { ICategory } from '@/features/categories/types/categories';

interface GetCategoriesParams {
  page?: number;
  limit?: number;
  search?: string;
}

interface GetCategoriesResult {
  data: ICategory[];
  metadata: { page: string; limit: string; total: string; totalPages: string };
}

// Get All Categories
export async function getAllCategories({
  ...params
}: GetCategoriesParams = {}): Promise<GetCategoriesResult> {
  const response = await fetch(
    `${getApiBaseUrl()}/categories?${new URLSearchParams(params as Record<string, string>).toString()}`
  );

  const data: IApiResponse<{
    data: ICategory[];
    metadata: { page: string; limit: string; total: string; totalPages: string };
  }> = await response.json();

  if (!response.ok || !data.status || !data.payload) {
    throw new Error(data.message || 'Failed to fetch categories');
  }

  return data.payload;
}

// Get Item
export default async function getCategoriesItem(id: string) {
  const jwt = await getNextAuthToken();
  const token = jwt?.token;

  if (!token) throw new Error('Unauthorized');

  const response = await fetch(`${getApiBaseUrl()}/categories/${id}`, {
    method: 'GET',
    headers: {
      ...HEADERS.JSON,
    },
  });

  const data: IApiResponse<{ category: Category }> = await response.json();

  if (!response.ok || !data.status) {
    throw new Error(data.message || 'Failed to get categorie item');
  }

  return data.payload?.category;
}

// Update Item
export async function updateCategoriesItem({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description?: string;
}) {
  const jwt = await getNextAuthToken();
  const token = jwt?.token;

  if (!token) throw new Error('Unauthorized');

  const response = await fetch(`${getApiBaseUrl()}/categories/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ title, description }),
    headers: {
      ...HEADERS.JSON,
      ...HEADERS.AUTH(token),
    },
  });

  const data: IApiResponse<{ category: Category }> = await response.json();

  if (!response.ok || !data.status) {
    throw new Error(data.message || 'Failed to update categorie item');
  }

  return data;
}

// Delete Item
export async function deleteCategoriesItem(id: string) {
  const jwt = await getNextAuthToken();
  const token = jwt?.token;

  if (!token) throw new Error('Unauthorized');

  const response = await fetch(`${getApiBaseUrl()}/categories/${id}`, {
    method: 'DELETE',
    headers: {
      ...HEADERS.JSON,
      ...HEADERS.AUTH(token),
    },
  });

  const data: IApiResponse<{ category: Category }> = await response.json();

  if (!response.ok || !data.status) {
    throw new Error(data.message || 'Failed to delete categorie item');
  }

  return data;
}
