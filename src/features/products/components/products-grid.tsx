import { PRODUCTS_PER_PAGE } from '@/shared/constant/products.constants';
import { getProducts, GetProductsParams } from '../apis/products.api';
import EmptyState from './empty-state';
import PaginationProducts from './pagination-products';
import ProductCard from './product-card';
import { getTranslations } from 'next-intl/server';

export async function ProductsGrid({
  page,
  categoryId,
  subCategoryId,
  occasionId,
  minPrice,
  maxPrice,
  minRating,
}: GetProductsParams) {
  // Translation
  const t = await getTranslations('product');
  const products = await getProducts({
    page,
    limit: PRODUCTS_PER_PAGE,
    categoryId,
    subCategoryId,
    occasionId,
    minPrice,
    maxPrice,
    minRating,
  });

  if (products.data.length === 0) {
    return <EmptyState message={t('noProductsFound')} />;
  }
  // Variables
  const totalPages = Number(products.metadata.totalPages ?? 1);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.data.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
      {totalPages > 1 && (
        <>
          <div className="h-px bg-zinc-100 dark:bg-zinc-700 w-full mt-5 "></div>
          <PaginationProducts page={page!} totalPages={totalPages} />
        </>
      )}
    </div>
  );
}
