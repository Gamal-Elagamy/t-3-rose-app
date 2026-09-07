'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { IAddress } from '../types/address';
import { AddressCard } from './address-card';
import AddressFormModalButton from '@/features/checkout/components/shipping/form-modal-button';
import AddressNextStepButton from '@/features/checkout/components/shipping/next-step-button';
import { useCheckout } from '@/features/checkout/context/checkout-context';

export function AddressList({ addresses }: { addresses: IAddress[] }) {
  // Translation
  const t = useTranslations('address.list');

  // State
  const [selectedAddressId, setSelectedAddressId] = useState<string | undefined>(
    addresses.find((address) => address.isPrimary)?.id
  );

  // Checkout context
  const { updateCheckout } = useCheckout();

  // Functions
  const onSelectAddress = (address: IAddress) => {
    setSelectedAddressId(address.id);
    updateCheckout({ addressId: address.id });
  };

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
        </>
      )}

      <div className="flex items-center justify-center my-3 before:flex-1 before:border-t before:border-ds-border-muted after:flex-1 after:border-t after:border-ds-border-muted">
        <span className="px-4 text-md text-ds-text-soft font-medium">{t('or')}</span>
      </div>

      <AddressFormModalButton />

      {/* Show next step button only if addresses exist */}
      {addresses.length !== 0 && <AddressNextStepButton selectedAddressId={selectedAddressId} />}
    </>
  );
}
