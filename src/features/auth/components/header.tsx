'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

import LanguageSwitcher from '@/shared/components/language-switcher';
import { ThemeToggle } from '@/shared/components/theme-toggle';
import lightSeparator from '@/assets/images/auth/separator-light.png';
import darkSeparator from '@/assets/images/auth/separator-dark.png';

export default function AuthHeader() {
  const pathname = usePathname();
  const t = useTranslations();

  let title = '';

  if (pathname.endsWith('/login')) {
    title = t('auth.login.title');
  } else if (pathname.endsWith('/register')) {
    title = t('auth.register.title');
  }

  return (
    <>
      <div className="flex items-center gap-3 justify-end px-2 py-4">
        <ThemeToggle />

        <LanguageSwitcher
          className="text-base font-normal leading-none text-ds-text-plain"
          ariaLabel={t('auth.langLabel')}
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-10">
        <Image
          src={darkSeparator}
          alt="Separator"
          priority
          className="max-h-11 max-w-60 rotate-180 hidden dark:block "
        />
        <Image
          src={lightSeparator}
          alt="Separator"
          priority
          className="max-h-11 max-w-60 rotate-180 block dark:hidden"
        />

        {title && (
          <h1
            style={{ fontFamily: 'var(--font-dancing)' }}
            className="text-5xl font-normal leading-none text-ds-text-primary pb-4 border-b border-ds-border-muted dark:border-ds-border-soft"
          >
            {title}
          </h1>
        )}
      </div>
    </>
  );
}
