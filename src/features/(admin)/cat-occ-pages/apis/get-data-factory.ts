import { HEADERS } from '@/shared/constant/api-header.constants';
import { IApiResponse } from '@/shared/lib/types/api';
import { getApiBaseUrl } from '@/shared/lib/utils/api-url';

interface GetItemsParams {
  page?: number;
  limit?: number;
  search?: string;
}

interface GetItemsResult<TListItem> {
  data: TListItem[];
  metadata: { page: string; limit: string; total: string; totalPages: string };
}

export function getItemFactoryApi<TListItem, K extends string, TSingleItem = TListItem>(
  resource: string,
  entityKey: K
) {
  async function getAllItems(params: GetItemsParams = {}): Promise<GetItemsResult<TListItem>> {
    const query = new URLSearchParams(params as Record<string, string>).toString();

    const response = await fetch(`${getApiBaseUrl()}/${resource}?${query}`);
    const data: IApiResponse<GetItemsResult<TListItem>> = await response.json();

    if (!response.ok || !data.status || !data.payload) {
      throw new Error(data.message || `Failed to fetch ${resource}`);
    }

    return data.payload;
  }

  async function getItem(id: string): Promise<TSingleItem | undefined> {
    const response = await fetch(`${getApiBaseUrl()}/${resource}/${id}`, {
      method: 'GET',
      headers: { ...HEADERS.JSON },
    });

    const data: IApiResponse<Record<K, TSingleItem>> = await response.json();

    if (!response.ok || !data.status) {
      throw new Error(data.message || `Failed to get ${resource} item`);
    }

    return data.payload?.[entityKey];
  }

  return { getAllItems, getItem };
}
