'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useProductsFilters } from '@/features/products/hooks/use-products-filters';
import { useTranslations } from 'next-intl';

export function ProductsSearch() {
  const t = useTranslations('dashboard.products.list');
  const { search, setSearch } = useProductsFilters();
  const [value, setValue] = useState(search);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (value !== search) {
        setSearch(value);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [value, search, setSearch]);

  return (
    <div className="flex items-center gap-2 rounded-lg border border-ds-border-default mx-2 px-3 py-2">
      <Search className="size-4 text-ds-text-muted" />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={t('searchPlaceholder')}
        className="w-full bg-transparent text-sm text-ds-text-default outline-none placeholder:text-ds-text-muted"
      />
    </div>
  );
}