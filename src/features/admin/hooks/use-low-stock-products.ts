'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

import { getProductStatsApi } from '../apis/admin.client.api';
import { LowStockProduct } from '../types/admin';

const PAGE_SIZE = 10;
const MAX_LIMIT = 50;

interface LowStockPage {
  items: LowStockProduct[];
  limit: number;
}

export function useLowStockProducts(threshold = 20) {
  return useInfiniteQuery({
    queryKey: ['low-stock-products', threshold],
    queryFn: async ({ pageParam }): Promise<LowStockPage> => {
      const res = await getProductStatsApi({
        lowStockLimit: pageParam,
        lowStockThreshold: threshold,
      });

      if (!res.status || !('payload' in res) || !res.payload) {
        throw new Error('message' in res ? res.message : 'Failed to fetch low stock products');
      }

      return {
        items: res.payload.lowStockProducts ?? [],
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
