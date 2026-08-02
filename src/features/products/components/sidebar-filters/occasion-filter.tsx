'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useProductFilters } from './hooks/use-product-filters';
import { OccasionFilterProps } from '@/features/products/types/occasions';

export function OccasionFilter({ occasions }: OccasionFilterProps) {
  // Translation
  const t = useTranslations();
  // Hooks
  const { filters, setFilter, resetFilter } = useProductFilters();
  // Render
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-ds-text-default">{t('filters.occasion')}</h3>
        {filters.occasionId && (
          <button
            onClick={() => resetFilter('occasionId')}
            className="text-xs text-ds-text-danger hover:underline"
          >
            {t('filters.reset')}
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2 h-60 overflow-y-auto pr-1 pt-1 scrollbar-none">
        {occasions.map((occ) => (
          <button
            key={occ.value}
            onClick={() =>
              setFilter('occasionId', filters.occasionId === occ.value ? null : occ.value)
            }
            className={`relative aspect-square shrink-0 h-18.75 w-full overflow-hidden rounded-xl  transition-transform duration-00 hover:scale-105 ${
              filters.occasionId === occ.value ? 'ring-2 ring-ds-bg-primary' : ''
            }`}
          >
            <Image
              src={occ.imageUrl}
              alt={occ.label}
              fill
              sizes="(max-width: 768px) 50vw, 140px "
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40" />
            <span className="absolute inset-0 flex items-center justify-center px-1 text-center text-sm font-semibold text-white drop-shadow-md">
              {occ.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
