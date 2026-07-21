import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import Explore from './explore';
import BestSellerCarousel from './best-seller-carousel';
import BestSellerCarouselSkeleton from '@/features/products/skeletons/best-seller-carousel.skeleton';
import ProductsErrorBoundary from '@/shared/components/error-boundary';
import { getProducts } from '@/features/products/apis/products.api';
import { IProduct } from '@/features/products/types/products';

async function BestSellerCarouselSlot({
  productsPromise,
}: {
  productsPromise: Promise<IProduct[]>;
}) {
  const t = await getTranslations('home');
  const products = await productsPromise;

  if (products.length === 0) {
    return <div>{t('noProductsFound')}</div>;
  }

  return <BestSellerCarousel products={products} />;
}

export default async function BestSellerSection() {
  const productsPromise = getProducts({
    sortBy: 'bestSelling',
  });

  return (
    <div className="grid grid-cols-12 gap-9 max-w-11/12 mx-auto mt-27">
      <div className="col-span-3">
        <Explore />
      </div>

      <div className="col-span-9">
        <ProductsErrorBoundary>
          <Suspense fallback={<BestSellerCarouselSkeleton />}>
            <BestSellerCarouselSlot productsPromise={productsPromise} />
          </Suspense>
        </ProductsErrorBoundary>
      </div>
    </div>
  );
}
