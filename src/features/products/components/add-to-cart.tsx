'use client';
import { useAddToCart } from '@/features/cart/hooks/use-add-to-cart';
import { Button } from '@/shared/components/ui/button';
import { Package, ShoppingCart } from 'lucide-react';
import { useTranslations } from 'next-intl';

type AddToCartVariant = 'card' | 'details' | 'wishlist';

interface AddToCartProps {
  variant?: AddToCartVariant;
  stock?: number;
  productId: string;
}

export default function AddToCart({ variant = 'card', stock, productId }: AddToCartProps) {
  const t = useTranslations('product');
  const isOutOfStock = stock === 0;
  const { mutate, isPending } = useAddToCart();

  if ((variant === 'details' || variant === 'wishlist') && isOutOfStock) {
    return (
      <div className="flex items-center justify-center gap-2 rounded-xl bg-ds-bg-primary-fade px-4 py-2 text-sm ">
        <Package className="size-4" />
        <span className="font-medium ">{t('outOfStock')}</span>
      </div>
    );
  }
  if (variant === 'wishlist') {
    return (
      <Button
        onClick={() => mutate({ productId, quantity: 1 })}
        isLoading={isPending}
        className="h-auto gap-1.5 rounded-md px-2 py-2 text-xs font-semibold"
      >
        <ShoppingCart className="size-3.5" />
        {t('addToCart')}
      </Button>
    );
  }

  if (variant === 'details') {
    return (
      <Button
        onClick={() => mutate({ productId, quantity: 1 })}
        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-ds-bg-primary px-4 py-3.5 text-ds-text-inverse hover:bg-ds-bg-primary-saturated cursor-pointer"
        disabled={isPending}
      >
        <ShoppingCart className="size-5" />
        <span className="font-semibold">{t('addToCart')}</span>
      </Button>
    );
  }

  return (
    <Button
      onClick={() => mutate({ productId, quantity: 1 })}
      className="w-10.5 h-10.5 rounded-full bg-ds-bg-primary text-ds-bg-subtle hover:bg-ds-bg-primary cursor-pointer flex items-center justify-center"
      disabled={isPending}
    >
      <ShoppingCart className="w-6 h-6" />
    </Button>
  );
}
