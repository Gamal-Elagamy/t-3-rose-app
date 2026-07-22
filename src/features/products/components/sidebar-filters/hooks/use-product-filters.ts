'use client';

import { useCallback } from 'react';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';

export function useProductFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const category = searchParams.get('category');
  const occasion = searchParams.get('occasion');
  const rating = searchParams.get('rating');
  const priceFrom = searchParams.get('priceFrom');
  const priceTo = searchParams.get('priceTo');

  const setFilter = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value === null || value === '') {
        params.delete(key);
      } else {
        params.set(key, value);
      }

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, router, pathname]
  );

  const resetFilter = useCallback(
    (key: string) => {
      setFilter(key, null);
    },
    [setFilter]
  );

  const resetAll = useCallback(() => {
    router.push(pathname, { scroll: false });
  }, [router, pathname]);

  return {
    filters: { category, occasion, rating, priceFrom, priceTo },
    setFilter,
    resetFilter,
    resetAll,
  };
}
