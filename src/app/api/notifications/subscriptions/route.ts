import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function POST(req: NextRequest) {
  const token = await getToken({ req });
  if (!token) {
    return NextResponse.json({ status: false, message: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();

  const response = await fetch(`${process.env.API_URL}/notifications/subscriptions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token.token}`,
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}

export async function DELETE(req: NextRequest) {
  const token = await getToken({ req });
  if (!token) {
    return NextResponse.json({ status: false, message: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();

  const response = await fetch(`${process.env.API_URL}/notifications/subscriptions`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token.token}`,
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
