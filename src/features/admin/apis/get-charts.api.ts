import 'server-only';

import { DashboardPayload } from '../types/admin';
import { getAdminStatisticsApi, GetAdminStatisticsParams } from './admin.api';


export async function GetChartsApi(
  revenuePeriod: GetAdminStatisticsParams['revenuePeriod']
): Promise<DashboardPayload> {
  const data = await getAdminStatisticsApi({ revenuePeriod });
  

  if (!data.status) {
    throw new Error(
      data.message || 'Failed to get admin statistics',
    );
  }

  if (!data.payload) {
    throw new Error('Admin statistics payload is empty');
  }

  return data.payload;
}