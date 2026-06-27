'use client';

import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const locale = useLocale();

  const searchParams = useSearchParams();
  const queryString = searchParams.toString();

  const nextLocale = locale === 'ar' ? 'en' : 'ar';
  const language = locale === 'ar' ? 'English' : 'العربية';

  return (
    <div>
      <Link
        href={`${pathname}${queryString ? `?${queryString}` : ''}`}
        locale={nextLocale}
        prefetch={false}
      >
        {language}
      </Link>
    </div>
  );
}
