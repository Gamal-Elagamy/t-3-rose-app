import { IApiResponse } from '@/shared/lib/types/api';
import IProductReviews, { IMetadata } from '../types/product-reviews';
import { getApiBaseUrl } from '@/shared/lib/utils/api-url';

export default async function getProductReviews(productId?: string) {
  // Get reviews Data
  const response = await fetch(`${getApiBaseUrl()}/reviews?productId=${productId}`);

  const data: IApiResponse<{ data: IProductReviews[]; metadata: IMetadata }> =
    await response.json();

  if (!response.ok || !data.status) {
    throw new Error(data.message ?? 'Failed to fetch Product reviews');
  }

  return data.payload;
}
