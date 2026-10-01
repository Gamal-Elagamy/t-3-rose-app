import { getOccasions } from '@/features/occasions/apis/occasions.api';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const data = await getOccasions({
      page: searchParams.get('page') ? Number(searchParams.get('page')) : undefined,
      limit: searchParams.get('limit') ? Number(searchParams.get('limit')) : undefined,
      search: searchParams.get('search') || undefined,
    });

    return NextResponse.json({ status: true, payload: data });
  } catch (error) {
    return NextResponse.json(
      {
        status: false,
        message: error instanceof Error ? error.message : 'Failed to fetch occasions',
      },
      { status: 500 }
    );
  }
}
