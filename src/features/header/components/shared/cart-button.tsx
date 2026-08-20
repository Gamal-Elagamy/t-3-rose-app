import { Link } from '@/i18n/navigation';
import { ShoppingCart } from 'lucide-react';

interface CartButtonProps {
  count?: number;
}

export function CartButton({ count = 0 }: CartButtonProps) {
  return (
    <Link href={'/cart'}>
      <button className="relative text-ds-text-default cursor-pointer">
        <ShoppingCart className="size-5" />
        {count > 0 && (
          <span className="absolute -end-1.5 -top-1.5 flex size-4 items-center justify-center rounded-full bg-ds-bg-primary text-[10px] font-semibold text-ds-text-inverse">
            {count}
          </span>
        )}
      </button>
    </Link>
  );
}
