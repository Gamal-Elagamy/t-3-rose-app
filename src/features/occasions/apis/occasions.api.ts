'use server';

import { IOccasion } from '../types/occasions';

interface GetOccasionsParams {
  page?: number;
  limit?: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getOccasionsAction({ ...params }: GetOccasionsParams) {
  const response = await fetch(
    `${API_BASE_URL}/occasions?${new URLSearchParams(params as Record<string, string>).toString()}`
  );
  const data: IApiResponse<{
    data: IOccasion[];
    metadata: { page: string; limit: string; total: string; totalPages: string };
  }> = await response.json();

  if (!data.status || !data.payload) {
    return [];
  }

  return data.payload.data;
}
