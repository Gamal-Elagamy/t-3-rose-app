'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

import LanguageSwitcher from '@/shared/components/language-switcher';
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
      <div className="flex justify-end px-2 py-4">
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

        {/* Add  w-3/4 text-center*/}
        {title && (
          <h1 className="text-5xl font-normal leading-none text-ds-text-primary pb-4 border-b border-ds-border-muted w-3/4 text-center">
            {title}
          </h1>
        )}
      </div>
    </>
  );
}
