import 'server-only';

import { DashboardPayload } from '../types/admin';
import { getAdminStatisticsServer, RevenuePeriod } from './admin.server.api';
import { GetProductStatsParams } from './admin.client.api';

export async function GetChartsApi(revenuePeriod: RevenuePeriod): Promise<DashboardPayload> {
  const data = await getAdminStatisticsServer(revenuePeriod);

  if (!data.status) {
    throw new Error(data.message || 'Failed to get admin statistics');
  }

  if (!data.payload) {
    throw new Error('Admin statistics payload is empty');
  }

  return data.payload;
}
