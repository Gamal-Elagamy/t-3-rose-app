import { Suspense } from 'react';
import { ProductsGrid } from '@/features/products/components/products-grid';
import { ProductsGridSkeleton } from '@/features/products/skeletons/products-grid-skeleton';

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-[300px_1fr] gap-6">
          <div></div>
          <Suspense key={currentPage} fallback={<ProductsGridSkeleton />}>
            <ProductsGrid page={currentPage} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
