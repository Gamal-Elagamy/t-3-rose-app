import { ShoppingCart } from 'lucide-react';

interface CartButtonProps {
  count?: number;
}

export function CartButton({ count = 0 }: CartButtonProps) {
  return (
    <button
      type="button"
      aria-label="Shopping cart"
      className="relative text-ds-text-default outline-none focus-visible:ring-2 focus-visible:ring-ds-bg-primary focus-visible:ring-offset-2"
    >
      <ShoppingCart className="size-5" aria-hidden="true" />

      {count > 0 && (
        <span
          aria-hidden="true"
          className="absolute -end-1.5 -top-1.5 flex size-4 items-center justify-center rounded-full bg-ds-bg-primary text-[10px] font-semibold text-ds-text-inverse"
        >
          {count}
        </span>
      )}
    </button>
  );
}
