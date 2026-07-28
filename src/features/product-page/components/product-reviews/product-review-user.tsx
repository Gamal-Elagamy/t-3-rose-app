import { IProductId } from './product-reviews';
import SectionTitle from '@/shared/components/section-title';
import { ReviewCard } from './review-card';
import GetProductDetails from '../../api/get-product-details.api';
import { RatingStars } from './rating-stars';
import FormReview from './form-review';
import { getTranslations } from 'next-intl/server';

export default async function ProductReviewUser({ productId }: IProductId) {
  // server translations
  const t = await getTranslations('product-reviews');

  // Fetch product details
  const productDetails = await GetProductDetails(productId);

  return (
    <>
      {/* Reviews section */}
      <div className="mx-20 my-4 max-w-full border-b border-b-ds-border-muted dark:border-b-ds-border-soft">
        {/* Section title */}
        <SectionTitle title={t('title')} />

        {/* Rating summary */}
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Overall rating */}
          <div className="flex-1 ">
            <h1 className="py-3 text-xl font-semibold text-zinc-800 dark:text-white">
              {t('general-rating')}
            </h1>

            {/* Rating value */}
            <h2 className="text-2xl font-bold text-ds-text-plain">
              {productDetails?.rating.toFixed(1)}

              <span className="mx-1 text-sm font-medium text-ds-text-soft ">
                (
                {(productDetails?.ratings ?? 0) > 0
                  ? `${productDetails?.ratings} ${t('ratings')}`
                  : `${t('no-ratings')}`}
                )
              </span>
            </h2>

            {/* Rating stars */}
            <span className="flex my-1 items-center border-b border-b-ds-border-muted pb-3 dark:border-b-ds-border-soft">
              <RatingStars rating={productDetails?.rating ?? 0} />
            </span>
          </div>
        </div>

        {/* Reviews */}
        <div className="m-5 flex ">
          {/* Reviews Card */}
          <ReviewCard productId={productId} />

          {/* Review form */}
          <FormReview productId={productId} />
        </div>
      </div>
    </>
  );
}
