'use client';

import { useTransition } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Star, Trash2, ShoppingCart } from 'lucide-react';
import { removeFromWishlistAction } from '../actions/wishlist.actions';
import { IWishlistItem } from '../types/wishlist';
import { Link, useRouter } from '@/i18n/navigation';
import { Button } from '@/shared/components/ui/button';
import { AddToCartButton } from './add-to-cart-button';
interface WishlistItemCardProps {
    item: IWishlistItem;
}

export function WishlistItemCard({ item }: WishlistItemCardProps) {
    // Translation
    const t = useTranslations();

    // Hooks
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    // Variables
    const { product } = item;
    const isInStock = product.stock > 0;

    // Handlers
    const handleRemove = () => {
        startTransition(async () => {
            await removeFromWishlistAction(item.id);
            router.refresh()
        });
    };

    return (
        <div className="flex items-center gap-4 border-b border-ds-border-subtle py-4">
            <div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-ds-bg-subtle">
                <Image src={product.cover} alt={product.title} fill className="object-cover" sizes="80px" />
            </div>

            <div className="flex flex-1 flex-col gap-1">
                <span
                    className={`text-xs font-medium ${isInStock ? 'text-ds-text-success' : 'text-ds-text-danger'}`}
                >
                    {isInStock ? t('wishlist.inStock') : t('wishlist.outOfStock')}
                </span>

                <h3 className="text-sm font-semibold text-ds-text-default">{product.title}</h3>

                <div className="flex items-center gap-1">
                    <span className="flex items-center gap-0.5 rounded bg-ds-bg-warning px-1.5 py-0.5 text-xs font-semibold text-ds-text-inverse">
                        <Star className="size-3 fill-current" />
                        {product.rating}/5
                    </span>
                    <span className="text-xs text-ds-text-primary">
                        ({t('wishlist.ratingsCount', { count: product.ratings })})
                    </span>
                </div>

                <span className="text-sm font-bold text-ds-text-default">{product.price} EGP</span>
            </div>

            <div className="flex flex-col items-end gap-2">
                <Button
                    size="icon-sm"
                    onClick={handleRemove}
                    isLoading={isPending}
                    aria-label={t('wishlist.remove')}
                    className="group/remove transition-transform hover:scale-110 active:scale-95"
                >
                    <Trash2 className="transition-transform group-hover/remove:rotate-12" />
                </Button>
                {isInStock ? (
                         <AddToCartButton productId={product.id} />
                     ) : (
                    <Link href="/products"
                    >
                        <Button className="rounded-md bg-ds-bg-danger-subtle  hover:bg-ds-bg-danger-fade px-3 py-2 text-xs font-medium text-ds-text-danger hover:scale-110">
                            {t('wishlist.exploreSimilar')}
                        </Button>
                    </Link>
                )}
            </div>
        </div>
    );
}