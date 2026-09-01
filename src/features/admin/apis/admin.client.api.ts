'use client';

import { IApiResponse } from '@/shared/lib/types/api';
import { DashboardPayload } from '../types/admin';

export interface GetProductStatsParams {
  topProductsLimit?: number;
  lowStockLimit?: number;
  lowStockThreshold?: number;
}

export async function getProductStatsApi(params: GetProductStatsParams = {}) {
  const searchParams = new URLSearchParams();

  if (params.topProductsLimit !== undefined)
    searchParams.set('topProductsLimit', String(params.topProductsLimit));
  if (params.lowStockLimit !== undefined)
    searchParams.set('lowStockLimit', String(params.lowStockLimit));
  if (params.lowStockThreshold !== undefined)
    searchParams.set('lowStockThreshold', String(params.lowStockThreshold));

  const query = searchParams.toString();
  const url = `/api/admin/product-stats${query ? `?${query}` : ''}`;

  const response = await fetch(url);
  const data: IApiResponse<DashboardPayload> = await response.json();

  if (!data.status) {
    throw new Error(data.message || 'Failed to get product stats');
  }

  return data;
}
