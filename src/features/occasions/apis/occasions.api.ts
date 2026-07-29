import { getApiBaseUrl } from '@/shared/lib/utils/api-url';
import { IOccasion } from '../types/occasions';
import { IApiResponse } from '@/shared/lib/types/api';

interface GetOccasionsParams {
  page?: number;
  limit?: number;
}

export async function getOccasions({ ...params }: GetOccasionsParams): Promise<IOccasion[]> {
  const response = await fetch(
    `${getApiBaseUrl()}/occasions?${new URLSearchParams(params as Record<string, string>).toString()}`
  );
  const data: IApiResponse<{
    data: IOccasion[];
    metadata: { page: string; limit: string; total: string; totalPages: string };
  }> = await response.json();

  if (!response.ok || !data.status || !data.payload) {
    throw new Error(data.message || 'Failed to fetch occasions');
  }

  return data.payload.data;
}
