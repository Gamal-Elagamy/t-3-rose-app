import { getApiBaseUrl } from '@/shared/lib/utils/api-url';
import { getNextAuthToken } from '@/shared/lib/utils/auth.utils';

interface IReviewData {
  productId: string;
  headline: string;
  content: string;
  rating: number;
}

export default async function addProductReview(reviewData: IReviewData) {
  // Get Token
  const jwt = await getNextAuthToken();

  // Get reviews Data
  const response = await fetch(`${getApiBaseUrl()}/reviews`, {
    body: JSON.stringify(reviewData),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt?.token}`,
    },
  });

  const data = await response.json();

  if (!response.ok || !data.status) {
    throw new Error(data.message ?? 'Failed to fetch Product reviews');
  }

  return data;
}
