'use client';
import { useLocale, useTranslations } from 'next-intl';
import { IProductId } from './product-reviews';
import { RatingStars } from './rating-stars';
import { useQuery } from '@tanstack/react-query';
import GetProductReview from '../../api/get-product-review.api';

export function ReviewCard({ productId }: IProductId) {
  // Translate
  const t = useTranslations('product-reviews');

  // Locale Language
  const locale = useLocale();

  // Fetch reviews
  const { data: productReviews, isLoading } = useQuery({
    queryKey: ['reviews', productId],
    queryFn: () => GetProductReview(productId),
  });

  // Loading state
  if (isLoading) return <div>{t('loading')}</div>;

  // Empty state
  if (productReviews?.data.length === 0)
    return <div className="dark:text-white w-200">{t('no-reviews')}</div>;

  return (
    // Reviews list
    <div className="max-h-95 overflow-y-auto w-200">
      {productReviews?.data.map((review) => (
        // Review item
        <div
          className=" my-4  border-b border-b-ds-border-muted dark:border-b-ds-border-soft"
          key={review.user.id}
        >
          {/* User info */}
          <div className="flex gap-2">
            {/* User avatar */}
            <div className="w-11 h-11 rounded-full bg-maroon-600 text-white flex items-center justify-center p-1">
              {review.user.firstName.charAt(0)}
            </div>

            {/* User details */}
            <div>
              <h1 className="dark:text-white">{review.user.firstName}</h1>

              <p className="text-zinc-400 dark:text-zinc-300">
                {new Date(review.createdAt).toLocaleDateString(
                  locale === 'ar' ? 'ar-EG' : 'en-US',
                  {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  }
                )}
              </p>
            </div>
          </div>

          {/* Rating */}
          <div className="my-2 flex">
            <span className="flex items-center">
              <RatingStars rating={review.rating} />
            </span>

            {/* Rating value */}
            <p className="px-2 dark:text-white">({review.rating.toFixed(1)})</p>
          </div>

          {/* Review content */}
          <div className="review-description w-full min-w-0">
            {/* Headline */}
            <h3 className="text-base font-semibold text-black dark:text-white">
              {review.headline ?? 'Awesome Bouquet!'}
            </h3>

            {/* Description */}
            <p className="my-2 flex-1 overflow-y-auto whitespace-normal wrap-break-word text-ds-text-default leading-6 font-normal">
              {review.content ?? ''}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
