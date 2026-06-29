'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { ThemeToggle } from '@/shared/components/theme-toggle';
import LanguageSwitcher from '@/shared/components/language-switcher';
import imageUrl from '@/assets/images/auth/separator-1.png';

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
      <div className="flex justify-evenly gap-4 px-2 py-4">
        <ThemeToggle />

        <LanguageSwitcher
          className="font-zain text-[16px] font-normal leading-none text-ds-text-plain"
          ariaLabel={t('auth.langLabel')}
        />
      </div>

      <div className="flex flex-col items-center justify-center gap-4">
        <Image src={imageUrl} alt="Separator" priority className="max-h-11 max-w-60" />

        {title && (
          <h1 className="text-[48px] font-normal leading-none text-ds-text-primary">{title}</h1>
        )}
      </div>
    </>
  );
}
