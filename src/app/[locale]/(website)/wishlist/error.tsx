// app/[locale]/wishlist/error.tsx
'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/shared/components/ui/button';

interface WishlistErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function WishlistError({ reset }: WishlistErrorProps) {
  const t = useTranslations();

  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 py-16 text-center">
      <p className="text-sm text-ds-text-danger">{t('wishlist.loadError')}</p>
      <Button onClick={reset}>{t('wishlist.retry')}</Button>
    </div>
  );
}
