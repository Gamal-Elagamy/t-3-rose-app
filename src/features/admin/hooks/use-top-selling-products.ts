'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

import { getAdminStatisticsApi } from '../apis/admin.api';
import { TopSellingProduct } from '../types/admin';

const PAGE_SIZE = 10;
const MAX_LIMIT = 50;

interface TopSellingPage {
  items: TopSellingProduct[];
  limit: number;
}

export function useTopSellingProducts() {
  return useInfiniteQuery({
    queryKey: ['top-selling-products'],
    queryFn: async ({ pageParam }): Promise<TopSellingPage> => {
      const res = await getAdminStatisticsApi({ topProductsLimit: pageParam });

      if (!res.status || !('payload' in res) || !res.payload) {
        throw new Error('message' in res ? res.message : 'Failed to fetch top selling products');
      }

      return {
        items: res.payload.topSellingProducts ?? [],
        limit: pageParam,
      };
    },
    initialPageParam: PAGE_SIZE,
    getNextPageParam: (lastPage) => {
      const reachedMax = lastPage.limit >= MAX_LIMIT;
      const noMoreItems = lastPage.items.length < lastPage.limit;

      if (reachedMax || noMoreItems) return undefined;

      return Math.min(lastPage.limit + PAGE_SIZE, MAX_LIMIT);
    },
  });
}
