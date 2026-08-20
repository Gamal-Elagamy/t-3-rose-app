'use client';

import { useTranslations } from 'next-intl';
import { useCart } from '../context/cart.context';

export default function CartQuantities() {
  // Translations
  const t = useTranslations('cart-list');

  // Cart Context
  const { cartDataProducts } = useCart();

  // Items Count
  const itemsCount =  cartDataProducts.length ;

  return (
    <span className="font-medium text-base text-ds-text-muted ms-2.5">
      {t('cart-count', { count: itemsCount })}
    </span>
  );
}
