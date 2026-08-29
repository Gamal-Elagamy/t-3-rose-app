'use client';

import { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

import LanguageSwitcher from '@/shared/components/language-switcher';
import { ThemeToggle } from '@/shared/components/theme-toggle';
import AuthSeparator from './auth-separator';

export default function AuthHeader() {
  // Navigation
  const pathname = usePathname();

  // Translation
  const t = useTranslations();

  // Variables
  const title = pathname.endsWith('/login')
    ? t('auth.login.title')
    : pathname.endsWith('/register')
      ? t('auth.register.title')
      : '';

  return (
    <>
      <div className="flex items-center gap-3 justify-end px-2 py-4">
        <ThemeToggle />

        <Suspense fallback={null}>
          <LanguageSwitcher
            className="text-base font-normal leading-none text-ds-text-plain"
            ariaLabel={t('auth.langLabel')}
          />
        </Suspense>
      </div>

      <div className="flex flex-col items-center justify-center gap-10">
        <AuthSeparator className="rotate-180" />

        {title && (
          <h1
            style={{ fontFamily: 'var(--font-dancing)' }}
            className="mx-auto w-3/4 border-b border-ds-border-muted pb-4 text-center text-4xl sm:text-5xl font-normal leading-none text-ds-text-primary dark:border-ds-border-soft"
          >
            {title}
          </h1>
        )}
      </div>
    </>
  );
}
