import { getProducts } from '../apis/products.api';
import PaginationProducts from './pagination-products';
import ProductCard from './product-card';
import { getTranslations } from 'next-intl/server';

export async function ProductsGrid({ page }: { page: number }) {
  const t = await getTranslations('product');
  const products = await getProducts({ page, limit: 12 });

  if (!products) {
    return (
      <div className="flex justify-center items-center text-xl text-red-500 font-semibold h-screen">
        <p>{t('errorPage')}</p>
      </div>
    );
  }

  const totalPages = Number(products.metadata.totalPages);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.data.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
      <div className="h-px bg-zinc-100 dark:bg-zinc-700 w-full mt-5 "></div>
      <PaginationProducts page={page} totalPages={totalPages} />
    </div>
  );
}
