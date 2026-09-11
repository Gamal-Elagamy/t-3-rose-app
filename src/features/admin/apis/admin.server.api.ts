import 'server-only';

import { getApiBaseUrl } from '@/shared/lib/utils/api-url';
import { getNextAuthToken } from '@/shared/lib/utils/auth.utils';
import { IApiResponse } from '@/shared/lib/types/api';
import { DashboardPayload } from '../types/admin';

export type RevenuePeriod = 'monthly' | 'week';

export async function getAdminStatisticsServer(
  revenuePeriod: RevenuePeriod = 'monthly'
): Promise<IApiResponse<DashboardPayload>> {
  const jwt = await getNextAuthToken();
  const token = jwt?.token;

  if (!token) {
    return {
      status: false,
      code: 401,
      message: 'Unauthorized',
    };
  }

  // Build API URL
  const url = new URL(`${getApiBaseUrl()}/admin/statistics`);

  // Add revenue period BEFORE fetch
  url.searchParams.set('revenuePeriod', revenuePeriod);

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });

  const data: IApiResponse<DashboardPayload> = await response.json();

  if (!response.ok || !data.status) {
    throw new Error(data.message || 'Failed to fetch admin statistics');
  }

  return data;
}
