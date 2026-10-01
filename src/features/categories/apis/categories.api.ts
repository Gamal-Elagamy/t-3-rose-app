import { getApiBaseUrl } from '@/shared/lib/utils/api-url';
import { ICategory } from '../types/categories';
import { IApiResponse } from '@/shared/lib/types/api';

interface GetCategoriesParams {
  page?: number;
  limit?: number;
  search?: string;
}

export async function getCategories({ ...params }: GetCategoriesParams = {}): Promise<ICategory[]> {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value));
    }
  });

  const response = await fetch(`${getApiBaseUrl()}/categories?${searchParams.toString()}`);

  const data: IApiResponse<{
    data: ICategory[];
    metadata: { page: string; limit: string; total: string; totalPages: string };
  }> = await response.json();

  if (!response.ok || !data.status || !data.payload) {
    throw new Error(data.message || 'Failed to fetch categories');
  }

  return data.payload.data;
}
