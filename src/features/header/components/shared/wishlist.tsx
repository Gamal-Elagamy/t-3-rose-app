'use client';
import { Heart } from 'lucide-react';
import { Link } from '@/i18n/navigation';

import { useSession } from 'next-auth/react';
import { useGuestWishlistCount } from '@/features/wish-list/hooks/use-guest-wishlist-count';

interface WishlistButtonProps {
  authenticatedCount: number;
}

export function WishlistButton({ authenticatedCount }: WishlistButtonProps) {
  // Hooks
  const { data: session } = useSession();

  // State
 const guestCount = useGuestWishlistCount();


  // Variables
  const count = session?.user ? authenticatedCount : guestCount;
  return (
    <Link href="/wishlist" className="relative text-ds-text-default">
      <Heart className="size-5" />
      {count > 0 && (
        <span className="absolute -end-1.5 -top-1.5 flex size-4 items-center justify-center rounded-full bg-ds-bg-primary text-[10px] font-semibold text-ds-text-inverse">
          {count}
        </span>
      )}
    </Link>
  );
}
