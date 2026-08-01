import { Heart } from 'lucide-react';

interface WishlistButtonProps {
  count?: number;
}

export function WishlistButton({ count = 0 }: WishlistButtonProps) {
  return (
    <button className="relative text-ds-text-default">
      <Heart className="size-5" />
      {count > 0 && (
        <span className="absolute -end-1.5 -top-1.5 flex size-4 items-center justify-center rounded-full bg-ds-bg-primary text-[10px] font-semibold text-ds-text-inverse">
          {count}
        </span>
      )}
    </button>
  );
}
