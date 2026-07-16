import { IApiResponse, TestimonialsPayload } from '../types/testimonials';

export async function getTestimonials() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/testimonials?page=1&limit=20`);

  if (!response.ok) {
    throw new Error('Failed to fetch testimonials');
  }

  const data: IApiResponse<TestimonialsPayload> = await response.json();

  return data.payload;
}
