'use client';

import { Button } from '@/shared/components/ui/button';
import { useTranslations } from 'next-intl';

interface ProductsErrorProps {
  reset: () => void;
}

export default function ProductsError({ reset }: ProductsErrorProps) {
    const t = useTranslations('dashboard.products.list.error');

  return (
    <div className="flex flex-col items-center gap-4 py-16 text-center">
      <p className="text-sm text-ds-text-danger">{t('message')}</p>
      <Button onClick={reset}>{t('retry')}</Button>
    </div>
  );
}