import { Suspense } from 'react';
import { ProductsGrid } from '@/features/products/components/products-grid';
import { ProductsGridSkeleton } from '@/features/products/skeletons/products-grid.skeleton';
import { GetProductsParams } from '@/features/products/apis/products.api';
import { SidebarFilters } from '@/features/products/components/sidebar-filters/sidebar-filters';

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<GetProductsParams>;
}) {
  const { page, categoryId, occasionId, minPrice, maxPrice, minRating } = await searchParams;
  const currentPage = Number(page) || 1;

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-[300px_1fr] gap-6">
          <Suspense fallback={<div className="w-72">Loading filters...</div>}>
            <SidebarFilters />
          </Suspense>
          <Suspense key={currentPage} fallback={<ProductsGridSkeleton />}>
            <ProductsGrid
              page={currentPage}
              categoryId={categoryId}
              occasionId={occasionId}
              minPrice={minPrice}
              maxPrice={maxPrice}
              minRating={minRating}
            />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
