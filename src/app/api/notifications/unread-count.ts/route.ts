import { NextRequest, NextResponse } from 'next/server';
import { getNextAuthToken } from '@/shared/lib/utils/auth.utils';
import { getApiBaseUrl } from '@/shared/lib/utils/api-url';

export async function GET(req: NextRequest) {
  const jwt = await getNextAuthToken();
  const token = jwt?.token;

  if (!token) {
    return NextResponse.json({ status: false, message: 'Unauthorized' }, { status: 401 });
  }

  const response = await fetch(`${getApiBaseUrl()}/notifications/unread-count`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}