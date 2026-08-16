import Image from 'next/image';
import CartEmptyImage from '@/assets/images/cart/no-cart.png';
import { useTranslations } from 'next-intl';

export default function CartEmpty() {
  // Translations
  const t = useTranslations('cart-list');

  return (
    <div className="w-full h-100 p-5 mt-6 border border-ds-border-muted rounded-lg flex flex-col gap-4 items-center justify-center">
      <Image src={CartEmptyImage} alt="cart is empty" className="w-62.5 h-53.5 object-cover" />
      <p className="font-normal text-xl text-ds-text-muted">{t('cart-empty')}</p>
    </div>
  );
}
