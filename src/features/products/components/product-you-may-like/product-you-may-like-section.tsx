import SectionTitle from '@/shared/components/section-title';
import { getProducts } from '@/features/products/apis/products.api';
import ProductsErrorBoundary from '@/shared/components/error-boundary';
import { Suspense } from 'react';
import BestSellerCarouselSkeleton from '@/features/products/skeletons/best-seller-carousel.skeleton';
import { BestSellerCarouselSlot } from '@/features/home/components/best-seller/best-seller-section';
import { getTranslations } from 'next-intl/server';
import { IProductId } from '../product/product-reviews/product-reviews';

export default async function ProductYouMayLikeSection({ product }: IProductId) {
  // Translations
  const t = await getTranslations('order-summary');


  

  // Get Related Products by Filter
 const relatedProduct = getProducts({
  categoryId: product?.categoryId,
  minRating: 3,
  limit: 20,
}).then((response) => ({
  data: response.data.filter(
    (item) => item.id !== product?.id,
  ),
}));

  return (
    <div className="p-2.5 flex flex-col gap-4 mt-20 mx-10">
      {/* SectionTitle */}
      <div className="mx-3">
        <SectionTitle title={t('product-you-may-like')} />
      </div>

      {/* Product You May Like Carousel */}
      <div className="related p-2.5 ">
        <ProductsErrorBoundary>
          <Suspense fallback={<BestSellerCarouselSkeleton />}>
            <BestSellerCarouselSlot productsPromise={relatedProduct} variant={'related'} />
          </Suspense>
        </ProductsErrorBoundary>
      </div>
    </div>
  );
}
