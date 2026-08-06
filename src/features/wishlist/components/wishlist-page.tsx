
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Heart, ArrowLeft } from 'lucide-react';
import { ClearWishlistButton } from './clear-wishlist-button';
import { EmptyWishlist } from './empty-wishlist';
import { getWishlist } from '../api/wishlist.api';
import { WishlistItemCard } from './wishlist-item-card';

export async function WishlistPage() {
  // Translation
  const t = await getTranslations();

  // Data fetching
  const items = await getWishlist();

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Heart className="size-6" />
          <h1 className="text-2xl font-bold text-ds-text-default">{t('wishlist.title')}</h1>
          <span className="text-sm text-ds-text-muted">
            {t('wishlist.itemsCount', { count: items.length })}
          </span>
        </div>

        {items.length > 0 && <ClearWishlistButton />}
      </div>

      {items.length === 0 ? (
        <EmptyWishlist />
      ) : (
        <>
          <div className="mt-6 flex flex-col">
            {items.map((item) => (
              <WishlistItemCard key={item.id} item={item} />
            ))}
          </div>

          <Link
            href="/products"
            className="mt-6 flex w-fit items-center gap-2 rounded-lg border border-ds-border-default bg-ds-bg-danger-subtle px-4 py-2 text-sm font-semibold text-ds-text-danger"
          >
            <ArrowLeft className="size-4" />
            {t('wishlist.continueShopping')}
          </Link>
        </>
      )}
    </div>
  );
}