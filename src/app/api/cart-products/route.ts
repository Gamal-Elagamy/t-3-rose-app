import { getCartProductsData } from '@/features/cart/actions/get-cart-products';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const ids = searchParams.get('ids');

  if (!ids) {
    return NextResponse.json([]);
  }

  const productIds = ids.split(',');
  const products = await getCartProductsData(productIds);

  return NextResponse.json(products);
}
