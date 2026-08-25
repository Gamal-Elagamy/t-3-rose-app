'use server';
import { HEADERS } from '@/shared/constant/api-header.constants';
import { getApiBaseUrl } from '@/shared/lib/utils/api-url';
import { getNextAuthToken } from '@/shared/lib/utils/auth.utils';
import { IApiResponse } from '@/shared/lib/types/api';
import { IOccasion } from '@/features/occasions/types/occasions';

interface GetOccasionsParams {
  page?: number;
  limit?: number;
  search?: string;
}

interface GetOccasionsResult {
  data: IOccasion[];
  metadata: { page: string; limit: string; total: string; totalPages: string };
}

// Get All Occasions
export async function getAllOccasions({
  ...params
}: GetOccasionsParams = {}): Promise<GetOccasionsResult> {
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

  return data.payload;
}

// Get Item Occasion
export default async function getOccasionsItem(id: string) {
  const jwt = await getNextAuthToken();
  const token = jwt?.token;

  if (!token) throw new Error('Unauthorized');

  const response = await fetch(`${getApiBaseUrl()}/occasions/${id}`, {
    method: 'GET',
    headers: {
      ...HEADERS.JSON,
    },
  });

  const data: IApiResponse<{ occasion: IOccasion }> = await response.json();

  if (!response.ok || !data.status) {
    throw new Error(data.message || 'Failed to get occasions item');
  }

  return data.payload?.occasion;
}

// Update Item Occasion
export async function updateOccasionsItem({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description?: string;
}) {
  const jwt = await getNextAuthToken();
  const token = jwt?.token;

  if (!token) throw new Error('Unauthorized');

  const response = await fetch(`${getApiBaseUrl()}/occasions/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ title, description }),
    headers: {
      ...HEADERS.JSON,
      ...HEADERS.AUTH(token),
    },
  });

  const data: IApiResponse<{ occasion: IOccasion }> = await response.json();

  if (!response.ok || !data.status) {
    throw new Error(data.message || 'Failed to update occasion item');
  }

  return data;
}

// Delete Item Occasion
export async function deleteOccasionsItem(id: string) {
  const jwt = await getNextAuthToken();
  const token = jwt?.token;

  if (!token) throw new Error('Unauthorized');

  const response = await fetch(`${getApiBaseUrl()}/occasions/${id}`, {
    method: 'DELETE',
    headers: {
      ...HEADERS.JSON,
      ...HEADERS.AUTH(token),
    },
  });

  const data: IApiResponse<{ occasion: IOccasion }> = await response.json();

  if (!response.ok || !data.status) {
    throw new Error(data.message || 'Failed to delete occasion item');
  }

  return data;
}
