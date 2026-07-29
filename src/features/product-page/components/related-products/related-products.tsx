import SectionTitle from '@/shared/components/section-title';
import getProductDetails from '../../api/get-single-product.api';
import { getProducts } from '@/features/products/apis/products.api';
import ProductsErrorBoundary from '@/shared/components/error-boundary';
import { Suspense } from 'react';
import BestSellerCarouselSkeleton from '@/features/products/skeletons/best-seller-carousel.skeleton';
import { BestSellerCarouselSlot } from '@/features/home/components/best-seller/best-seller-section';
import { getTranslations } from 'next-intl/server';
import { IProductId } from '../product-reviews/product-reviews';

export default async function RelatedProducts({ productId }: IProductId) {
  // Translations
  const t = await getTranslations();

  // Get Product Details Function
  const product = await getProductDetails(productId);

  const productCategoryId = product?.categoryId;
  const productrating = product?.rating;

  // Get Related Products by Filter
  const relatedProduct = getProducts({
    categoryId: productCategoryId,
    minRating: 0,
    limit: 20,
  }).then((products) => products.filter((p) => p.id !== productId));

  return (
    <div className="max-w-11/12 mx-auto p-2.5 flex flex-col gap-4">
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
