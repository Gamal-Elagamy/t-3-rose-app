import { getApiBaseUrl } from '@/shared/lib/utils/api-url';
import { IProduct } from '../types/products';

interface GetProductsParams {
  page?: number;
  limit?: number;
  categoryId?: string;
  subCategoryId?: string;
  occasionId?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
}

export async function getProducts({ ...params }: GetProductsParams): Promise<IProduct[]> {
  const response = await fetch(
    `${getApiBaseUrl()}/products?${new URLSearchParams(params as Record<string, string>).toString()}`
  );
  const data: IApiResponse<{
    data: IProduct[];
    metadata: { page: string; limit: string; total: string; totalPages: string };
  }> = await response.json();

  if (!response.ok || !data.status || !data.payload) {
    throw new Error(data.message || 'Failed to fetch products');
  }

  return data.payload.data;
}
