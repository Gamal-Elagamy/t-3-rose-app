import 'server-only';

import { IApiResponse } from '../../../shared/lib/types/api';
import { TestimonialsPayload } from '../types/testimonials';

export async function getTestimonials() {
  const response = await fetch(`${process.env.API_URL}/testimonials?page=1&limit=20`);

  if (!response.ok) {
    throw new Error('Failed to fetch testimonials');
  }

  const data: IApiResponse<TestimonialsPayload> = await response.json();

  if (!data.status) {
    throw new Error('Failed to fetch testimonials');
  }

  return data.payload;
}
