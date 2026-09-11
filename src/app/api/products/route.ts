import { getProducts } from '@/features/products/apis/products.api';
import { SortBy, SortOrder } from '@/features/products/constants/sort.constants';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const data = await getProducts({
      page: Number(searchParams.get('page')) || 1,
      limit: Number(searchParams.get('limit')) || 10,
      search: searchParams.get('search') || undefined,
      categoryId: searchParams.get('categoryId') || undefined,
      subCategoryId: searchParams.get('subCategoryId') || undefined,
      occasionId: searchParams.get('occasionId') || undefined,
      minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
      maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
      minRating: searchParams.get('minRating') ? Number(searchParams.get('minRating')) : undefined,
      sortBy: searchParams.get('sortBy') as SortBy,
      sortOrder: searchParams.get('sortOrder') as SortOrder,
    });

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { status: false, message: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
