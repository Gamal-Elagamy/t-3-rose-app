import { Suspense } from 'react';
import Explore from './explore';
import BestSellerCarousel from './best-seller-carousel';
import BestSellerCarouselSkeleton from '@/features/products/skeletons/best-seller-carousel.skeleton';
import { getProductsAction } from '@/features/products/apis/products.api';

export default async function BestSellerSection() {
  const products = await getProductsAction({
    minRating: 3.5,
  });

  return (
    <div className="grid grid-cols-12 gap-9 max-w-10/12 mx-auto">
      {/* left side */}
      <div className="col-span-3">
        <Explore />
      </div>

      {/* right side */}
      <div className="col-span-9">
        <Suspense fallback={<BestSellerCarouselSkeleton />}>
          {!Array.isArray(products) || products.length === 0 ? (
            <div>No products found</div>
          ) : (
            <BestSellerCarousel products={products} />
          )}
        </Suspense>
      </div>
    </div>
  );
}
