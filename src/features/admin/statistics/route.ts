import { NextRequest, NextResponse } from 'next/server';
import { GetChartsApi } from '../apis/get-charts.api';


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

    const data = await GetChartsApi(revenuePeriod);

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