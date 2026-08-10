'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useCart } from '../context/cart.context';
import { formatLocaleNumber } from '@/shared/lib/utils/format-number';

export default function CartTotalPrise() {
  // Translations
  const t = useTranslations('cart-list');

  const locale = useLocale();

  // Cart Context
  const { cartTotal } = useCart();

  if (!cartTotal) return;
  return (
    <div className="cart-total flex items-center justify-between mt-6">
      <span className="font-semibold text-xl text-ds-text-plain">{t('cart-total')}</span>
      <h2 className="font-bold text-2xl text-ds-text-plain">
        {formatLocaleNumber(cartTotal, locale)}
        <span className="font-medium text-base ms-1.5">{t('cart-currency')}</span>
      </h2>
    </div>
  );
}
