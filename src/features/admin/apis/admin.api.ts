'use server';

import { HEADERS } from '@/shared/constant/api-header.constants';
import { RESPONSES } from '@/shared/constant/api.responses';
import { IApiResponse } from '@/shared/lib/types/api';
import { getApiBaseUrl } from '@/shared/lib/utils/api-url';
import { getNextAuthToken } from '@/shared/lib/utils/auth.utils';
import { DashboardPayload } from '../types/admin';

export interface GetAdminStatisticsParams {
  revenuePeriod?: 'monthly' | 'week';
  lowStockThreshold?: number;
  topProductsLimit?: number;
  lowStockLimit?: number;
}

export async function getAdminStatisticsApi(params: GetAdminStatisticsParams = {}) {
  const token = await getNextAuthToken();
  if (!token?.token) return RESPONSES.unauthorized;

  const searchParams = new URLSearchParams();

  if (params.revenuePeriod) searchParams.set('revenuePeriod', params.revenuePeriod);
  if (params.lowStockThreshold !== undefined)
    searchParams.set('lowStockThreshold', String(params.lowStockThreshold));
  if (params.topProductsLimit !== undefined)
    searchParams.set('topProductsLimit', String(params.topProductsLimit));
  if (params.lowStockLimit !== undefined)
    searchParams.set('lowStockLimit', String(params.lowStockLimit));

  const query = searchParams.toString();
  const url = `${getApiBaseUrl()}/admin/statistics${query ? `?${query}` : ''}`;

  const response = await fetch(url, {
    headers: {
      ...HEADERS.JSON,
      ...HEADERS.AUTH(token.token),
    },
  });

  const data: IApiResponse<DashboardPayload> = await response.json();

  if (!data.status) {
    throw new Error(data.message || 'Failed to get admin statistics');
  }

  return data;
}
