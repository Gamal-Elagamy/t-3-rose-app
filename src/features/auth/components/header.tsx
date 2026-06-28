import Image from 'next/image';

import { ThemeToggle } from '@/shared/components/theme-toggle';
import LanguageSwitcher from '../../../shared/components/language-switcher';
import imageUrl from '@/assets/images/auth/separator-1.png';

export default function AuthHeader() {
  return (
    <>
      <div className="flex justify-evenly gap-4 px-5 py-3">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
      <Image
        src={imageUrl}
        alt="Separator"
        priority
        className="dark:text-ds-text-primary max-h-11 max-w-60"
      />
      <div className="flex items-center justify-center">
        <div>
          <h1 className="text-3xl font-bold">Welcome Back</h1>
        </div>
      </div>
    </>
  );
}
