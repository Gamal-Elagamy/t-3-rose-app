'use server';
import { getApiBaseUrl } from '@/shared/lib/utils/api-url';
import { IProduct } from '../types/products';
import { SortBy, SortOrder } from '../constants/sort.constants';
import { IApiResponse } from '@/shared/lib/types/api';

export interface GetProductsParams {
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
  search?: string;
}

export interface GetProductsResponse {
  payload: IProduct[];
  metadata: { page: string; limit: string; total: string; totalPages: string };
}

export async function getProducts({ ...params }: GetProductsParams) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });
  const response = await fetch(`${getApiBaseUrl()}/products?${searchParams.toString()}`);
  const data: IApiResponse<{
    data: IProduct[];
    metadata: {
      page: string;
      limit: string;
      total: string;
      totalPages: string;
    };
  }> = await response.json();

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
