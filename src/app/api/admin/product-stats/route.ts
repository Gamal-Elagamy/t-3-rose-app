import { NextRequest, NextResponse } from 'next/server';

import { getApiBaseUrl } from '@/shared/lib/utils/api-url';
import { getNextAuthToken } from '@/shared/lib/utils/auth.utils';
import { IApiResponse } from '@/shared/lib/types/api';
import { DashboardPayload } from '@/features/admin/types/admin';

export async function GET(req: NextRequest) {
  const jwt = await getNextAuthToken();
  const token = jwt?.token;

  if (!token) {
    return NextResponse.json(
      { status: false, code: 401, message: 'Unauthorized' },
      { status: 401 }
    );
  }

  const query = req.nextUrl.searchParams.toString();
  const url = `${getApiBaseUrl()}/admin/statistics${query ? `?${query}` : ''}`;

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const data: IApiResponse<DashboardPayload> = await response.json();

  return NextResponse.json(data, { status: response.status });
}
