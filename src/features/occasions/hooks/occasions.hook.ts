'use client';

import { useQuery } from '@tanstack/react-query';
import { IOccasion } from '../types/occasions';
import { useDebounce } from '@/shared/lib/utils/use-debounced';

const DEFAULT_LIMIT = 10;

async function fetchOccasions(search: string): Promise<IOccasion[]> {
  const params = new URLSearchParams();

  if (search) {
    params.set('search', search);
  } else {
    params.set('limit', String(DEFAULT_LIMIT));
  }

  const response = await fetch(`/api/occasions?${params.toString()}`);
  const data: { status: boolean; payload?: IOccasion[]; message?: string } = await response.json();

  if (!response.ok || !data.status || !data.payload) {
    throw new Error(data.message || 'Failed to fetch occasions');
  }

  return data.payload;
}

export function useOccasionsQuery(search = '') {
  const debouncedSearch = useDebounce(search, 400);

  return useQuery({
    queryKey: ['occasions', debouncedSearch],
    queryFn: () => fetchOccasions(debouncedSearch),
  });
}
