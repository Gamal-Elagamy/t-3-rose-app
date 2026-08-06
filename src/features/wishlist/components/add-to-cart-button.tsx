'use client';

import { useTransition } from 'react';
import { useTranslations } from 'next-intl';
import { ShoppingCart } from 'lucide-react';
import { useRouter } from '@/i18n/navigation';
import { Button } from '@/shared/components/ui/button';
import { addToCart } from '@/features/cart/actions/add-to-cart';

interface AddToCartButtonProps {
    productId: string;
}

export function AddToCartButton({ productId }: AddToCartButtonProps) {
    const t = useTranslations();
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleAddToCart = () => {
        startTransition(async () => {
            try {
                await addToCart({ productId, quantity: 1 });
                router.refresh();
            } catch (error) {
                
                console.error(error);
            }
        });
    };

    return (
        <Button
            onClick={handleAddToCart}
            isLoading={isPending}
            className="flex items-center gap-1.5 rounded-md bg-ds-bg-primary px-3 py-2 text-xs font-semibold text-ds-text-inverse"
        >
            <ShoppingCart className="size-3.5" />
            {t('wishlist.addToCart')}
        </Button>
    );
}