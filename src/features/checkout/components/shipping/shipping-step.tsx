import { Suspense } from 'react';
import { AddressList } from '@/features/address/components/address-list';
import AddressStepSkeleton from '@/features/address/skeletons/address-step.skeleton';
import { getAddresses } from '@/features/address/apis/address.api';

export async function ShippingStep() {
  const addresses = await getAddresses();

  return (
    <div className="py-6">
      <h2 className="text-2xl font-bold mb-4 text-ds-text-plain">Shipping Address</h2>

      <Suspense fallback={<AddressStepSkeleton />}>
        <AddressList addresses={addresses} />
      </Suspense>
    </div>
  );
}
