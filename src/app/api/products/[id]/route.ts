import { NextRequest, NextResponse } from 'next/server';
import { getProduct } from '@/features/products/apis/products.api';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const product = await getProduct(id);

    return NextResponse.json({
      status: true,
      code: 200,
      payload: { product },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { status: false, message: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}