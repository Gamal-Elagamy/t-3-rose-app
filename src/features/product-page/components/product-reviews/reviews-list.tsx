'use client';
import { Star } from 'lucide-react';
import getProductReviews from '../../api/get-product-reviews.api';
import { cn } from '@/shared/lib/utils/tailwind-cn';
import { IProductId } from './product-reviews';
import { useTranslations } from 'next-intl';
import { useQuery } from '@tanstack/react-query';
export function ReviewsList({ productId }: IProductId) {
  const t = useTranslations('product-reviews');

  // Get Product Reviews Function
  const { data: pReviews, isLoading } = useQuery({
    queryKey: ['reviews', productId],
    queryFn: () => getProductReviews(productId),
  });

  if (isLoading) return <div>{t('loading')}</div>;

  // When no reviews
  if (pReviews?.data.length === 0) return <h1>{t('no-reviews')}</h1>;

  return (
    <>
      {/* Review Item */}
      {pReviews?.data.map((review) => (
        <div
          key={review.id}
          className="review-item flex flex-col gap-2.5 pb-4 border-b border-b-ds-border-muted"
        >
          {/* User Review */}
          <div className="user-review flex items-center gap-2.5">
            {/* Avatar */}
            <div className="avatar w-11.25 h-11.25 font-semibold text-xl flex items-center justify-center rounded-full bg-ds-bg-primary text-ds-text-inverse dark:text-ds-text-plain">
              {review.user.firstName.charAt(0)}
            </div>

            {/* User Details */}
            <div className="details">
              <h1 className="text-ds-text-plain font-semibold text-base">
                {review.user.firstName}
              </h1>
              <p className="font-medium text-sm text-ds-text-muted">
                {new Date(review.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>

          {/* Review Rating */}
          <div className="flex items-center gap-1">
            <span className="review-rating flex items-center">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  className={cn(
                    'size-5',
                    i < review.rating ? 'text-orange-500 fill-orange-500' : 'text-orange-500'
                  )}
                />
              ))}
            </span>

            <p className="font-semibold text-base text-ds-text-plain">
              ({review.rating.toFixed(1)})
            </p>
          </div>

          {/* Review Description */}
          <div className="review-description font-semibold text-base text-black dark:text-white">
            {review.headline ?? ''}
            <p className="mt-1.5 font-normal text-ds-text-default leading-tight">
              {review.content ?? ''}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}
