import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import Explore from './explore';
import BestSellerCarousel from './best-seller-carousel';
import BestSellerCarouselSkeleton from '@/features/products/skeletons/best-seller-carousel.skeleton';
import ProductsErrorBoundary from '@/shared/components/error-boundary';
import { getProductsAction } from '@/features/products/apis/products.api';

export default async function BestSellerSection() {
  const t = await getTranslations('home');
  const products = await getProductsAction({
    minRating: 3.5,
  });

  return (
    <div className="grid grid-cols-12 gap-9 max-w-10/12 mx-auto mt-27">
      {/* left side */}
      <div className="col-span-3">
        <Explore />
      </div>

      {/* right side */}
      <div className="col-span-9">
        <ProductsErrorBoundary>
          <Suspense fallback={<BestSellerCarouselSkeleton />}>
            {!Array.isArray(products) || products.length === 0 ? (
              <div>{t('noProductsFound')}</div>
            ) : (
              <BestSellerCarousel products={products} />
            )}
          </Suspense>
        </ProductsErrorBoundary>
      </div>
    </div>
  );
}
