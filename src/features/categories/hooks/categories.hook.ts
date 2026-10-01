'use client';

import { useQuery } from '@tanstack/react-query';
import { ICategory } from '../types/categories';
import { useDebounce } from '@/shared/lib/utils/use-debounced';

const DEFAULT_LIMIT = 10;

async function fetchCategories(search: string): Promise<ICategory[]> {
  const params = new URLSearchParams();

  if (search) {
    params.set('search', search);
  } else {
    params.set('limit', String(DEFAULT_LIMIT));
  }

  const response = await fetch(`/api/categories?${params.toString()}`);
  const data: { status: boolean; payload?: ICategory[]; message?: string } = await response.json();

  if (!response.ok || !data.status || !data.payload) {
    throw new Error(data.message || 'Failed to fetch categories');
  }

  return data.payload;
}

export function useCategoriesQuery(search = '') {
  const debouncedSearch = useDebounce(search, 400);

  return useQuery({
    queryKey: ['categories', debouncedSearch],
    queryFn: () => fetchCategories(debouncedSearch),
  });
}
