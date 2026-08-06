'use client';

import { Button } from '@/shared/components/ui/button';
import { BrushCleaning } from 'lucide-react';
import { useCart } from '../context/cart.context';
import { useTranslations } from 'next-intl';

export default function CartButtonClear() {
  // Translations
  const t = useTranslations('cart-list');

  // Cart Context
  const { clearCartItems, isEmpty } = useCart();

  return (
    <Button
      onClick={clearCartItems}
      variant={'secondary'}
      disabled={isEmpty}
      className="w-41.25 flex items-center gap-1.5 cursor-pointer"
    >
      <BrushCleaning className="size-5" /> {t('cart-clear')}
    </Button>
  );
}
