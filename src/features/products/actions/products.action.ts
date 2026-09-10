'use server';
import { getApiBaseUrl } from '@/shared/lib/utils/api-url';
import { IApiResponse } from '@/shared/lib/types/api';
import { IProduct } from '../types/products';
import { HEADERS } from '@/shared/constant/api-header.constants';
import { getNextAuthToken } from '@/shared/lib/utils/auth.utils';
import { revalidatePath } from 'next/cache';

export async function createProduct(productData: {
  title: string;
  description: string;
  stock: number;
  price: number;
  discountType: 'PERCENT' | 'FIXED';
  discountValue: number;
  categoryId: string;
  occasionId: string;
  cover: string;
  gallery: string[];
}): Promise<IProduct> {
  const token = await getNextAuthToken();
  if (!token?.token) throw new Error('Unauthorized');

  const response = await fetch(`${getApiBaseUrl()}/products`, {
    method: 'POST',
    headers: {
      ...HEADERS.JSON,
      ...HEADERS.AUTH(token.token),
    },
    body: JSON.stringify(productData),
  });

  const data: IApiResponse<{ product: IProduct }> = await response.json();

  if (!response.ok || !data.status || !data.payload) {
    throw new Error(data.message || 'Failed to create product');
  }

  revalidatePath('/admin/products');
  return data.payload.product;
}

export async function updateProduct(
  id: string,
  productData: Partial<{
    title: string;
    description: string;
    stock: number;
    price: number;
    discountType: 'PERCENT' | 'FIXED';
    discountValue: number;
    categoryId: string;
    occasionId: string;
    cover: string;
    gallery: string[];
  }>
): Promise<IProduct> {
  const token = await getNextAuthToken();
  if (!token?.token) throw new Error('Unauthorized');

  const response = await fetch(`${getApiBaseUrl()}/products/${id}`, {
    method: 'PATCH',
    headers: {
      ...HEADERS.JSON,
      ...HEADERS.AUTH(token.token),
    },
    body: JSON.stringify(productData),
  });

  const data: IApiResponse<{ product: IProduct }> = await response.json();

  if (!response.ok || !data.status || !data.payload) {
    throw new Error(data.message || 'Failed to update product');
  }

  revalidatePath('/admin/products');
  return data.payload.product;
}
