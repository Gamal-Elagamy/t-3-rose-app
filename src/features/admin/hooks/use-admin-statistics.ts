'use client';

import { useQuery } from '@tanstack/react-query';

import { getAdminStatisticsApi } from '../apis/admin.api';

export function useAdminStatistics(revenuePeriod: 'monthly' | 'week' = 'monthly') {
  return useQuery({
    queryKey: ['admin-statistics', revenuePeriod],
    queryFn: () =>
      getAdminStatisticsApi({
        revenuePeriod,
        topProductsLimit: 5,
        lowStockLimit: 5,
      }),
  });
}
