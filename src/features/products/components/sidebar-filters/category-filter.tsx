'use client';
import { useTranslations } from 'next-intl';
import { useProductFilters } from './hooks/use-product-filters';
import Image from 'next/image';
import { CategoryFilterProps } from '@/features/products/types/category';

export function CategoryFilter({ categories }: CategoryFilterProps) {
  // Translation
  const t = useTranslations();
  // Hooks
  const { filters, setFilter, resetFilter } = useProductFilters();
  // Render
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-ds-text-default">{t('filters.category')}</h3>
        {filters.category && (
          <button
            onClick={() => resetFilter('category')}
            className="text-xs text-ds-text-danger hover:underline"
          >
            {t('filters.reset')}
          </button>
        )}
      </div>

      <div className="flex max-h-[200px] flex-col gap-1 overflow-y-auto pe-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setFilter('category', filters.category === cat.value ? null : cat.value)}
            className={`flex items-center gap-2 shrink-0 rounded-md  overflow-hidden text-start text-sm transition-colors  ${
              filters.category === cat.value
                ? 'bg-ds-bg-primary-fade ring-2 ring-ds-bg-primary'
                : 'bg-ds-bg-subtle  hover:bg-ds-bg-soft'
            }`}
          >
            {/* Icon */}
            <div className="relative size-10 shrink-0 bg-ds-bg-default">
              <Image src={cat.image} alt={cat.label} fill sizes="48px" className="object-cover" />
            </div>

            {/* Label */}
            <span
              className={`text-sm font-medium ${
                filters.category === cat.value ? 'text-ds-text-primary' : 'text-ds-text-default'
              }`}
            >
              {cat.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
