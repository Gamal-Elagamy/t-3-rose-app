import { Button } from '@/shared/components/ui/button';
import { MoveLeft } from 'lucide-react';
import CartBody from '@/features/cart/components/cart-body';
import { Link } from '@/i18n/navigation';
import CartQuantities from './cart-quantities';
import CartButtonClear from './cart-button-clear';
import CartTotalPrise from './cart-total-prise';
import { useTranslations } from 'next-intl';

export default function Cart() {
  // Translations
  const t = useTranslations('cart-list');

  return (
    <>
      {/* Cart Head */}
      <div className="cart-head flex items-center justify-between  ">
        <h1 className="font-bold text-5xl text-ds-text-plain ">
          {t('cart-title')}

          {/* Cart Quantities */}
          <CartQuantities />
        </h1>

        {/* Clear Button */}
        <CartButtonClear />
      </div>

      {/* Cart Total Prise */}
      <CartTotalPrise />

      {/* Cart Body */}
      <CartBody />

      {/* Continue Shoping Button */}
      <Link href={'/products'}>
        <Button className="w-53.25 flex items-center gap-2.5 cursor-pointer mt-6">
          <MoveLeft className="size-5 rtl:rotate-180" /> {t('cart-button')}
        </Button>
      </Link>
    </>
  );
}
