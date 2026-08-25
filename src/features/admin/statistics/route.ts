import { NextRequest, NextResponse } from 'next/server';

import { getAdminStatistics } from '@/features/admin/apis/get-admin-statistics';

export async function GET(request: NextRequest) {
  try {
    const revenuePeriod =
      request.nextUrl.searchParams.get('revenuePeriod') || 'monthly';

    if (
      revenuePeriod !== 'monthly' &&
      revenuePeriod !== 'week'
    ) {
      return NextResponse.json(
        {
          status: false,
          code: 400,
          message: 'Invalid revenue period',
        },
        { status: 400 },
      );
    }

    const data = await getAdminStatistics(revenuePeriod);

    return NextResponse.json({
      status: true,
      payload: data,
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: false,
        code: 500,
        message:
          error instanceof Error
            ? error.message
            : 'Failed to get admin statistics',
      },
      { status: 500 },
    );
  }
}