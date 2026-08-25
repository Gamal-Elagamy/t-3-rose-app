import { HEADERS } from '@/shared/constant/api-header.constants';
import { RESPONSES } from '@/shared/constant/api.responses';
import { IApiResponse } from '@/shared/lib/types/api';
import { getNextAuthToken } from '@/shared/lib/utils/auth.utils';
import { DashboardPayload } from '../types/admin';
import { getApiBaseUrl } from '@/shared/lib/utils/api-url';

export type RevenuePeriod = 'monthly' | 'week';

export async function getAdminStatisticsApi(
  revenuePeriod: RevenuePeriod = 'monthly',
): Promise<IApiResponse<DashboardPayload>> {
  const token = await getNextAuthToken();

  if (!token?.token) {
    return RESPONSES.unauthorized;
  }

  const url = new URL(`${getApiBaseUrl()}/admin/statistics`);

  url.searchParams.set('revenuePeriod', revenuePeriod);

  const response = await fetch(url.toString(), {
    headers: {
      ...HEADERS.JSON,
      ...HEADERS.AUTH(token.token),
    },
  });

  if (!response.ok) {
    return {
      status: false,
      code: response.status,
      message: `Failed to fetch admin statistics (${response.status})`,
    };
  }

  const data: IApiResponse<DashboardPayload> = await response.json();

  if (!data.status) {
    return {
      status: false,
      code: data.code,
      message: data.message || 'Failed to get admin statistics',
    };
  }

  return data;
}