'use client';

import { useQuery } from '@tanstack/react-query';

import { ApiResponse } from '@/features/shared/types/api';

import { PaginatedCategories, CategoryOption } from '@/features/products/types/category';

async function fetchPublicApi<T>(path: string): Promise<T> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`);
  const data: ApiResponse<T> = await response.json();

  if (!data.status) {
    throw new Error(data.message || 'Request failed');
  }

  return data.payload as T;
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const result = await fetchPublicApi<PaginatedCategories>('/categories');

      return result.data.map(
        (cat): CategoryOption => ({
          value: cat.id,
          label: cat.title,
        })
      );
    },
    staleTime: 60 * 60 * 1000,
  });
}
