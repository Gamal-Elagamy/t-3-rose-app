import Image from 'next/image';
import lightSeparator from '@/assets/images/auth/separator-light.png';
import darkSeparator from '@/assets/images/auth/separator-dark.png';

export default function AuthFooter() {
  return (
    <div className="flex items-center justify-center gap-4 py-4">
      <Image
        src={darkSeparator}
        alt="Separator"
        priority
        className="max-h-11 max-w-60 hidden dark:block "
      />
      <Image
        src={lightSeparator}
        alt="Separator"
        priority
        className="max-h-11 max-w-60 block dark:hidden"
      />
    </div>
  );
}
