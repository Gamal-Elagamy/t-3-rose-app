'use client';

import { useAddToCart } from '@/features/cart/hooks/use-add-to-cart';
import { Button } from '@/shared/components/ui/button';
import { Package, ShoppingCart } from 'lucide-react';
import { useTranslations } from 'next-intl';

type AddToCartVariant = 'card' | 'details';

interface AddToCartProps {
  variant?: AddToCartVariant;
  stock?: number;
  productId: string;
}

export default function AddToCart({ variant = 'card', stock, productId }: AddToCartProps) {
  const t = useTranslations('product');
  const isOutOfStock = stock === 0;
  const { mutate, isPending } = useAddToCart();

  if (variant === 'details' && isOutOfStock) {
    return (
      <div className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-maroon-50 px-4 py-3.5 text-maroon-600">
        <Package className="size-5" aria-hidden="true" />
        <span className="font-medium">{t('outOfStock')}</span>
      </div>
    );
  }

  if (variant === 'details') {
    return (
      <Button
        onClick={() => mutate({ productId, quantity: 1 })}
        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-ds-bg-primary px-4 py-3.5 text-ds-text-inverse hover:bg-ds-bg-primary-saturated cursor-pointer"
        disabled={isPending}
      >
        <ShoppingCart className="size-5" aria-hidden="true" />
        <span className="font-semibold">{t('addToCart')}</span>
      </Button>
    );
  }

  return (
    <Button
      onClick={() => mutate({ productId, quantity: 1 })}
      className="w-10.5 h-10.5 rounded-full bg-ds-bg-primary text-ds-bg-subtle hover:bg-ds-bg-primary cursor-pointer flex items-center justify-center"
      disabled={isPending}
      aria-label={t('addToCart')}
    >
      <ShoppingCart className="w-6 h-6" aria-hidden="true" />
    </Button>
  );
}
