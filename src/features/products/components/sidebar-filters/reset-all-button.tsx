'use client';

import { RotateCcw } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/shared/components/ui/button';
import { useProductFilters } from './hooks/use-product-filters';

export function ResetAllButton() {
  // Translation
  const t = useTranslations();

  // Hooks
  const { filters,resetAll } = useProductFilters();
// Variables
  const hasActiveFilters = Object.values(filters).some((value) => value !== null);
  return (
    <Button type="button" variant="secondary" onClick={resetAll} className="w-full" disabled={!hasActiveFilters}>
      <RotateCcw className="size-4" aria-hidden="true" />
      {t('filters.resetAll')}
    </Button>
  );
}
