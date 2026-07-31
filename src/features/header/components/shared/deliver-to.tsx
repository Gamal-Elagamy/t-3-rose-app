'use client';

import { useTranslations } from 'next-intl';
import { MapPin } from 'lucide-react';

interface DeliverToProps {
  city: string;
}

export function DeliverTo({ city }: DeliverToProps) {
  // Translation
  const t = useTranslations();

  return (
    <button className="flex shrink-0 flex-col items-start text-start text-xs">
      <span className="text-ds-text-muted">{t('header.nav.deliverTo')}</span>
      <span className="flex items-center gap-1 font-semibold text-ds-text-default">
        <MapPin className="size-3.5" />
        {city}
      </span>
    </button>
  );
}
