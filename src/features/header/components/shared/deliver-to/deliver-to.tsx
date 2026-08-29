'use client';

import { useTranslations } from 'next-intl';
import { MapPin } from 'lucide-react';
import { useUserLocation } from './hooks/use-user-location';

export function DeliverTo() {
  // Translation
  const t = useTranslations();

  // Hooks
  const { city, isLoading } = useUserLocation();

  return (
    <button
      type="button"
      className="flex shrink-0 flex-col items-start text-start text-xs outline-none focus-visible:ring-2 focus-visible:ring-ds-bg-primary focus-visible:ring-offset-2"
    >
      <span className="text-ds-text-muted">{t('header.nav.deliverTo')}</span>

      <span className="flex items-center gap-1 font-semibold text-ds-text-default">
        <MapPin className="size-3.5 shrink-0" aria-hidden="true" />

        {isLoading ? t('header.nav.locating') : (city ?? t('header.nav.selectLocation'))}
      </span>
    </button>
  );
}
