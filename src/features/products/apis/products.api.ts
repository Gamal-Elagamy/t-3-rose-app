'use server';
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

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Get products action
export async function getProductsAction({ ...params }: GetProductsParams) {
  const response = await fetch(
    `${API_BASE_URL}/products?${new URLSearchParams(params as Record<string, string>).toString()}`
  );
  const data: IApiResponse<{
    data: IProduct[];
    metadata: { page: string; limit: string; total: string; totalPages: string };
  }> = await response.json();

  if (!data.status || !data.payload) {
    return {
      status: data.status,
      code: data.code,
      message: data.message,
      payload: {
        data: [],
      },
    };
  }

  return data.payload.data;
}
