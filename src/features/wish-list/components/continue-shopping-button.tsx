import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowLeft } from 'lucide-react';

export function ContinueShoppingButton() {
  const t = useTranslations();

  return (
    <Link
      href="/products"
      className="mt-2 flex w-fit items-center gap-2 rounded-lg bg-ds-bg-primary px-4 py-2 text-sm font-semibold text-ds-text-inverse"
    >
      <ArrowLeft className="size-4" />
      {t('wishlist.continueShopping')}
    </Link>
  );
}
