import Image from 'next/image';
import imageUrl from '@/assets/images/auth/separator-1.png';

export default function AuthFooter() {
  return (
    <div className="flex items-center justify-center">
      <Image
        src={imageUrl}
        alt="Separator"
        priority
        className="dark:text-ds-text-primary max-h-11 max-w-60 rotate-180"
      />
    </div>
  );
}
