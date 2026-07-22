'use client';

import { useQuery } from '@tanstack/react-query';

import { Occasion, PaginatedOccasions, OccasionOption } from '@/features/products/types/occasions';
import { ApiResponse } from '@/features/shared/types/api';

async function fetchPublicApi<T>(path: string): Promise<T> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`);
  const data: ApiResponse<T> = await response.json();

  if (!data.status) {
    throw new Error(data.message || 'Request failed');
  }

  return data.payload as T;
}

export function useOccasions() {
  return useQuery({
    queryKey: ['occasions'],
    queryFn: async () => {
      const result = await fetchPublicApi<PaginatedOccasions>('/occasions');

      return result.data.map(
        (occ): OccasionOption => ({
          value: occ.id,
          label: occ.title,
          imageUrl: occ.image,
        })
      );
    },
    staleTime: 60 * 60 * 1000,
  });
}
