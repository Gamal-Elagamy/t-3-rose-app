import Image from 'next/image';

import lightSeparator from '@/assets/images/auth/separator-light.png';
import darkSeparator from '@/assets/images/auth/separator-dark.png';
import { cn } from '@/shared/lib/utils/tailwind-cn';

interface AuthSeparatorProps {
  className?: string;
}

export default function AuthSeparator({ className }: AuthSeparatorProps) {
  return (
    <>
      <Image
        src={darkSeparator}
        alt="Separator"
        priority
        className={cn('hidden dark:block max-w-68', className)}
      />

      <Image
        src={lightSeparator}
        alt="Separator"
        priority
        className={cn('block dark:hidden max-w-60', className)}
      />
    </>
  );
}
