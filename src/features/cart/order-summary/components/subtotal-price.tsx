'use client';
import { useCart } from '../../context/cart.context';
import { useTranslations } from 'next-intl';

interface TotalPriceProps {
  currency?: string;
}

export function SubTotalPrice({ currency = 'EGP' }: TotalPriceProps) {
  const t = useTranslations('order-summary');

  const { totalPrice } = useCart();

  return (
    <div className="flex items-center justify-between">
      <span className="text-base font-bold ">{t('sub-total')}</span>

      <span className="text-base font-bold ">
        {totalPrice} {currency}
      </span>
    </div>
  );
}
