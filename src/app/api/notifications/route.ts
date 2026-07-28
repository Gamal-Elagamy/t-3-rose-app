import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function GET(req: NextRequest) {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({ status: false, message: 'Unauthorized' }, { status: 401 });
  }

  const response = await fetch(`${process.env.API_URL}/notifications`, {
    headers: { Authorization: `Bearer ${token.token}` },
  });

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
