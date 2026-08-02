import { getApiBaseUrl } from '@/shared/lib/utils/api-url';
import { ProductResponse } from '../types/product-details';
import { IApiResponse } from '@/shared/lib/types/api';

export default async function getProductDetails(productId?: string) {
  // Get Product Data
  const response = await fetch(`${getApiBaseUrl()}/products/${productId}`);

  const data: IApiResponse<ProductResponse> = await response.json();

  if (!response.ok || !data.status) {
    throw new Error(data.message ?? 'Failed to fetch Product Details');
  }

  return data.payload?.product;
}
