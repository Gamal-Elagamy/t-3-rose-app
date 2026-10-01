'use client';

import { useState, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';

import { IAddress } from '../types/address';

import { AddressCard } from './address-card';

import AddressFormModalButton from '@/features/checkout/components/shipping/form-modal-button';
import AddressNextStepButton from '@/features/checkout/components/shipping/next-step-button';
import { useCheckout } from '@/features/checkout/context/checkout-context';

export function AddressList({ addresses }: { addresses: IAddress[] }) {
  // Translation
  const t = useTranslations('address.list');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  // State
  const initialAddressId = addresses.find((address) => address.isPrimary)?.id ?? addresses[0]?.id;
  const [selectedAddressId, setSelectedAddressId] = useState<string | undefined>(initialAddressId);

  // Checkout context
  const {
    updateCheckout,
  } = useCheckout();

  // Sync initial state to checkout context
  useEffect(() => {
    if (initialAddressId) {
      updateCheckout({ addressId: initialAddressId });
    }
  }, [initialAddressId, updateCheckout]);

  // Functions
  const onSelectAddress = (address: IAddress) => {
    setSelectedAddressId(address.id);
    updateCheckout({ addressId: address.id });
  };

  return (
    <>
      {addresses.length === 0 ? (
        <div className="text-center max-h-88 flex flex-col gap-4 items-center justify-center py-10 text-ds-text-muted">
          <p>{t('noAddresses')}</p>
          <AddressFormModalButton addresses={addresses} />
        </div>
      ) : (
        <>
          {/* Display addresses */}
          <div className="space-y-3 max-h-88 overflow-y-auto">
            {addresses.map((address) => (
              <AddressCard
                key={address.id}
                address={address}
                isSelected={address.id === selectedAddressId}
                onSelect={onSelectAddress}
              />
            ))}
          </div>

          <AddressFormModalButton addresses={addresses} />

          <AddressNextStepButton selectedAddressId={selectedAddressId} />
        </>
      )}
    </>
  );
}

