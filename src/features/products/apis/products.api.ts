import { getApiBaseUrl } from '@/shared/lib/utils/api-url';
import { IProduct } from '../types/products';
import { SortBy, SortOrder } from '../constants/sort.constants';
import { IApiResponse } from '@/shared/lib/types/api';

interface GetProductsParams {
  page?: number;
  limit?: number;
  categoryId?: string;
  subCategoryId?: string;
  occasionId?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  sortBy?: SortBy;
  sortOrder?: SortOrder;
}

interface GetProductsResponse {
  data: IProduct[];
  metadata: { page: string; limit: string; total: string; totalPages: string };
}

export async function getProducts({ ...params }: GetProductsParams): Promise<GetProductsResponse> {
  const response = await fetch(
    `${getApiBaseUrl()}/products?${new URLSearchParams(params as Record<string, string>).toString()}`
  );
  const data: IApiResponse<GetProductsResponse> = await response.json();

  if (!response.ok || !data.status || !data.payload) {
    throw new Error(data.message || 'Failed to fetch products');
  }

  return data.payload;
}

export async function getProduct(id: string): Promise<IProduct> {
  const response = await fetch(`${getApiBaseUrl()}/products/${id}`);
  const data: IApiResponse<{ product: IProduct }> = await response.json();

  if (!response.ok || !data.status || !data.payload) {
    throw new Error(data.message || 'Failed to fetch product');
  }

  return data.payload.product;
}
