'use client';

import { useLocale } from 'next-intl';
import { usePathname, Link } from '@/i18n/navigation';
import { startTransition, useEffect, useState } from 'react';
export default function LanguageSwitcher() {
  const pathname = usePathname();
  const locale = useLocale();

  const [searchParams, setSearchParams] = useState('');

  const nextLocale = locale === 'ar' ? 'en' : 'ar';
  const language = locale === 'ar' ? 'English' : 'العربية';

  useEffect(() => {
    startTransition(() => setSearchParams(location.search));
  }, [searchParams]);

  return (
    //this bg just for testing
    <div className="bg-blue-600 h-10">
      <Link href={pathname + searchParams} locale={nextLocale} prefetch={false}>
        {language}
      </Link>
    </div>
  );
}
