import { useTranslations } from 'next-intl';
import { useProductFilters } from './hooks/use-product-filters';

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

      <div className="flex max-h-[200px] flex-col gap-1 overflow-y-auto pe-1">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setFilter('category', filters.category === cat.value ? null : cat.value)}
            className={`shrink-0 rounded-md px-3 py-2 text-start text-sm transition-colors ${
              filters.category === cat.value
                ? 'bg-ds-bg-primary text-ds-text-inverse'
                : 'bg-ds-bg-subtle text-ds-text-default hover:bg-ds-bg-subtle/70'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}
