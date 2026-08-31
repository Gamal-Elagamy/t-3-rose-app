import 'server-only';

import { getApiBaseUrl } from '@/shared/lib/utils/api-url';
import { getNextAuthToken } from '@/shared/lib/utils/auth.utils';
import { IApiResponse } from '@/shared/lib/types/api';
import { DashboardPayload } from '../types/admin';

export async function getAdminStatisticsServer(): Promise<IApiResponse<DashboardPayload>> {
  const jwt = await getNextAuthToken();
  const token = jwt?.token;

  if (!token) {
    return { status: false, code: 401, message: 'Unauthorized' };
  }

  const response = await fetch(`${getApiBaseUrl()}/admin/statistics`, {
    headers: { Authorization: `Bearer ${token}` },
    next: { tags: ['admin-statistics'] },
  });

  const data: IApiResponse<DashboardPayload> = await response.json();

  if (!response.ok || !data.status) {
    throw new Error(data.message || 'Failed to fetch admin statistics');
  }

  return data;
}