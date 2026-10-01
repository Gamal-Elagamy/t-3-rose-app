'use client';

import { useState, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';

import { IAddress } from '../types/address';

import { AddressCard } from './address-card';
import AddressModalItem from './address-modal-item';

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

  if (!addresses.length) {
    return (
      <div
        className="py-10 text-center text-ds-text-muted"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {t('list.noAddresses')}
      </div>
    );
  }

  return (
    <>
      {addresses.length === 0 ? (
        <>
          <div className="text-center max-h-88 flex items-center justify-center text-ds-text-muted">
            {t('noAddresses')}
          </div>
        </>
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

