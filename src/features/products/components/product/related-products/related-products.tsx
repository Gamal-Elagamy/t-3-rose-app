import SectionTitle from '@/shared/components/section-title';
import { getProducts } from '@/features/products/apis/products.api';
import ProductsErrorBoundary from '@/shared/components/error-boundary';
import { Suspense } from 'react';
import BestSellerCarouselSkeleton from '@/features/products/skeletons/best-seller-carousel.skeleton';
import { BestSellerCarouselSlot } from '@/features/home/components/best-seller/best-seller-section';
import { getTranslations } from 'next-intl/server';
import { IProductId } from '../product-reviews/product-reviews';

export default async function RelatedProducts({ product }: IProductId) {
  // Translations
  const t = await getTranslations('product');

  const productCategoryId = product?.categoryId;

  // Get Related Products by Filter
  const relatedProduct = getProducts({
    categoryId: productCategoryId,
    minRating: 3,
    limit: 20,
  }).then((products) => ({ data: products.data.filter((p) => p.id !== product?.id) }));

  return (
    <div className="p-2.5 flex flex-col gap-4">
      {/* SectionTitle */}
      <SectionTitle title={t('related-product')} />

      {/* Related Products Carousel */}
      <div className="related p-2.5">
        <ProductsErrorBoundary>
          <Suspense fallback={<BestSellerCarouselSkeleton />}>
            <BestSellerCarouselSlot productsPromise={relatedProduct} variant={'related'} />
          </Suspense>
        </ProductsErrorBoundary>
      </div>
    </div>
  );
}
