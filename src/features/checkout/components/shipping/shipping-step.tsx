import { Suspense } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { AddressList } from '@/features/address/components/address-list';
import AddressStepSkeleton from '@/features/address/skeletons/address-step.skeleton';
import { getAddresses } from '@/features/address/apis/address.api';

async function ShippingStepContent() {
  const addresses = await getAddresses();

  return <AddressList addresses={addresses} />;
}

export function ShippingStep() {
  const t = useTranslations('checkout.shipping');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <div className="py-6" dir={isRTL ? 'rtl' : 'ltr'}>
      <h2 className="text-2xl font-bold mb-4 text-ds-text-plain">{t('title')}</h2>

      <Suspense fallback={<AddressStepSkeleton />}>
        <ShippingStepContent />
      </Suspense>
    </div>
  );
}
