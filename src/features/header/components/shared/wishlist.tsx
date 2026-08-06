import { Heart } from 'lucide-react';
import { Link } from '@/i18n/navigation';

export function WishlistButton() {
  return (
      <Link href="/wishlist" className="relative text-ds-text-default">
      <Heart className="size-5" />
    
    </Link>
  );
}
