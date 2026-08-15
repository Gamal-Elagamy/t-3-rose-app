'use client';

import { useTranslations } from 'next-intl';
import { useProductFilters } from './hooks/use-product-filters';

export function RatingFilter() {
  // Translation
  const t = useTranslations();

  // Hooks
  const { filters, setFilter, resetFilter } = useProductFilters();

  // Variables
  const currentRating = filters.minRating ? parseInt(filters.minRating) : 0;

  return (
    <div className="flex flex-col gap-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-ds-text-default">{t('filters.rating')}</h3>

        {filters.minRating && (
          <button
            type="button"
            onClick={() => resetFilter('minRating')}
            className="text-xs text-ds-text-danger hover:underline"
          >
            {t('filters.reset')}
          </button>
        )}
      </div>

      {/* Stars */}
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setFilter('minRating', currentRating === star ? null : star.toString())}
            className="text-2xl transition-transform hover:scale-110"
            aria-label={`${star} stars`}
            aria-pressed={currentRating === star}
          >
            <span
              className={star <= currentRating ? 'text-yellow-400' : 'text-ds-text-muted'}
              aria-hidden="true"
            >
              ★
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
