'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useProductFilters } from './hooks/use-product-filters';
import { OccasionFilterProps } from '@/features/products/types/occasions';

export function OccasionFilter({ occasions }: OccasionFilterProps) {
  const t = useTranslations();
  const { filters, setFilter, resetFilter } = useProductFilters();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-ds-text-default">{t('filters.occasion')}</h3>
        {filters.occasion && (
          <button
            onClick={() => resetFilter('occasion')}
            className="text-xs text-ds-text-danger hover:underline"
          >
            {t('filters.reset')}
          </button>
        )}
      </div>

      <div className="grid max-h-[280px] grid-cols-2 gap-2 overflow-y-auto pe-1">
        {occasions.map((occ) => (
          <button
            key={occ.value}
            onClick={() => setFilter('occasion', filters.occasion === occ.value ? null : occ.value)}
            className={`relative aspect-[4/3] shrink-0 overflow-hidden rounded-lg ${
              filters.occasion === occ.value ? 'ring-2 ring-ds-bg-primary' : ''
            }`}
          >
            <Image src={occ.imageUrl} alt={occ.label} fill className="object-cover" />
            <div className="absolute inset-0 bg-black/40" />
            <span className="absolute inset-0 flex items-center justify-center px-1 text-center text-sm font-semibold text-white">
              {occ.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
