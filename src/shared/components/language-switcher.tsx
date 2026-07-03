'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import { Link, usePathname } from '@/i18n/navigation';

type LanguageSwitcherProps = {
  className?: string;
  ariaLabel?: string;
};

export default function LanguageSwitcher({ className, ariaLabel }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations();

  const searchParams = useSearchParams();
  const queryString = searchParams.toString();

  const nextLocale = locale === 'ar' ? 'en' : 'ar';

  return (
    <Link
      href={`${pathname}${queryString ? `?${queryString}` : ''}`}
      locale={nextLocale}
      prefetch={false}
      className={className}
      aria-label={ariaLabel}
    >
      {t('auth.switchLang')}
    </Link>
  );
}
