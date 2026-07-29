import 'server-only';

import { IApiResponse } from '../../../shared/lib/types/api';
import { TestimonialsPayload } from '../types/testimonials';
import { getApiBaseUrl } from '@/shared/lib/utils/api-url';

export async function getTestimonials() {
  const response = await fetch(`${getApiBaseUrl()}/testimonials?page=1&limit=20`);

  if (!response.ok) {
    throw new Error('Failed to fetch testimonials');
  }

  const data: IApiResponse<TestimonialsPayload> = await response.json();

  if (!data.status) {
    throw new Error('Failed to fetch testimonials');
  }

  return data.payload;
}
