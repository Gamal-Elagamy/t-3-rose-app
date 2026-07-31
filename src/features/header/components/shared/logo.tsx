import { Link } from '@/i18n/navigation';
import Image from 'next/image';

export function Logo() {
  return (
    <Link href="/" className="flex shrink-0 items-center">
      <Image src="/logo.png" alt="Rose" width={48} height={48} priority />
    </Link>
  );
}
