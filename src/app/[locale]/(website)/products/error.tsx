'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('product.error');
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h2>{t('errorPageTitle')}</h2>
      <p>{t('errorPageDescription')}</p>

      <button
        onClick={() => {
          reset();
          router.refresh();
        }}
        className="rounded-md bg-ds-bg-primary px-4 py-2"
      >
        {t('tryAgain')}
      </button>
    </div>
  );
}
