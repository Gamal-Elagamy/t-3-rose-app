import { Star } from 'lucide-react';
import ReviewsItem from './reviews';
import SectionTitle from '@/shared/components/section-title';
import { getTranslations } from 'next-intl/server';
import getProductReviews from '../../api/get-product-reviews.api';
import getProductDetails from '../../api/get-single-product.api';

export interface IProductId {
  productId: string;
}

export default async function ProductReviews({ productId }: IProductId) {
  // Translations
  const t = await getTranslations('product-reviews');

  // Get Product Details Function
  const productDetails = await getProductDetails(productId);

  // Get Reviews Data
  const reviewsData = await getProductReviews(productId);

  return (
    <div className="max-w-11/12 mx-auto mt-2.5 mb-12.5 flex flex-col gap-4">
      {/* Section Title */}
      <SectionTitle title={t('title')} />

      {/* General Rating */}
      <div className="general-rating flex flex-col gap-1 pb-4 border-b border-ds-border-muted">
        {/* Header */}
        <h1 className="font-semibold text-xl text-ds-text-plain">{t('general-rating')}</h1>

        {/* Rate */}
        <h2 className="font-bold text-2xl text-ds-text-plain">
          {/* Product Rating Number */}
          {productDetails?.rating.toFixed(1)} {/* Product Rating Icon */}
          <span className="font-medium text-sm text-ds-text-soft">
            (
            {(productDetails?.ratings ?? 0) > 0
              ? `${productDetails?.ratings} ${t('ratings')}`
              : t('no-ratings')}
            )
          </span>
        </h2>

        {/* Star Icon */}
        <span className="flex items-center">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              size={20}
              className={
                i < (productDetails?.rating ?? 0)
                  ? 'fill-orange-500 text-orange-500'
                  : 'text-orange-500'
              }
            />
          ))}
        </span>
      </div>

      {/* Reviews */}
      <ReviewsItem productId={productId} reviews={reviewsData?.data} />
    </div>
  );
}
