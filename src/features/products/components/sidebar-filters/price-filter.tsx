'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useProductFilters } from './hooks/use-product-filters';

export function PriceFilter() {
  // Translation
  const t = useTranslations();

  // Hooks
  const { filters, setFilter, resetFilter } = useProductFilters();

  // Variables
  const minPrice = filters.minPrice ?? '0';
  const maxPrice = filters.maxPrice ?? '1000000';

  const [localPriceFrom, setLocalPriceFrom] = useState(minPrice);
  const [localPriceTo, setLocalPriceTo] = useState(maxPrice);

  const hasFilter = filters.minPrice || filters.maxPrice;

  // Functions
  const handlePriceFromChange = (value: string) => {
    setLocalPriceFrom(value);
    setFilter('minPrice', value === '0' ? null : value);
  };

  const handlePriceToChange = (value: string) => {
    setLocalPriceTo(value);
    setFilter('maxPrice', value === '1000000' ? null : value);
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-ds-text-default">{t('filters.price')}</h3>
        {hasFilter && (
          <button
            onClick={() => {
              resetFilter('minPrice');
              resetFilter('maxPrice');
              setLocalPriceFrom('0');
              setLocalPriceTo('1000000');
            }}
            className="text-xs text-ds-text-danger hover:underline"
          >
            {t('filters.reset')}
          </button>
        )}
      </div>

      {/* Inputs */}
      <div className="flex items-center gap-2">
        <div className="flex flex-col gap-1 flex-1">
          <span className="text-xs text-ds-text-muted">{t('filters.from')}</span>
          <input
            type="number"
            value={localPriceFrom}
            onChange={(e) => handlePriceFromChange(e.target.value)}
            min={0}
            className="w-full rounded-lg border border-ds-border-soft bg-ds-bg-plain px-3 py-2 text-sm text-ds-text-plain outline-none focus:border-ds-border-primary"
          />
        </div>

        <div className="flex flex-col gap-1 flex-1">
          <span className="text-xs text-ds-text-muted">{t('filters.to')}</span>
          <input
            type="number"
            value={localPriceTo}
            onChange={(e) => handlePriceToChange(e.target.value)}
            min={0}
            className="w-full rounded-lg border border-ds-border-soft bg-ds-bg-plain px-3 py-2 text-sm text-ds-text-plain outline-none focus:border-ds-border-primary"
          />
        </div>
      </div>
    </div>
  );
}
