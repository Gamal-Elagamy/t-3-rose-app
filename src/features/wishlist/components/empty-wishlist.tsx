import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Heart } from 'lucide-react';

export function EmptyWishlist() {
  const t = useTranslations();

  return (
    <div className="flex flex-col items-center gap-3 py-16 text-center">
      <Heart className="size-10 text-ds-text-muted" />
      <p className="text-sm text-ds-text-muted">{t('wishlist.empty')}</p>
      <Link
        href="/products"
        className="mt-2 rounded-lg bg-ds-bg-primary px-4 py-2 text-sm font-semibold text-ds-text-inverse"
      >
        {t('wishlist.continueShopping')}
      </Link>
    </div>
  );
}