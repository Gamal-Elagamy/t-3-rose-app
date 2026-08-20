import { Link } from '@/i18n/navigation';
import Image from 'next/image';

export function Logo({ className , href ="/" , width = 48 , height = 48 }: { className?: string , href?: string , width?: number , height?: number }) {
  return (
    <Link href={href} className={`flex shrink-0 items-center ${className}`}>
      <Image src="/logo.png" alt="Rose" width={width} height={height} priority />
    </Link>
  );
}
