'use client';

import { useQuery } from '@tanstack/react-query';
import { getTestimonials } from '../apis/testimonials';

export function useTestimonials() {
  return useQuery({
    queryKey: ['testimonials'],
    queryFn: getTestimonials,
  });
}
