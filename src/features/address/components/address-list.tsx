'use client';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { IAddress } from '../types/address';
import { AddressCard } from './address-card';
import AddressFormModalButton from '@/features/checkout/components/shipping/form-modal-button';
import AddressNextStepButton from '@/features/checkout/components/shipping/next-step-button';
import { useCheckout } from '@/features/checkout/context/checkout-context';

export function AddressList({ addresses }: { addresses: IAddress[] }) {
  // Translation
  const t = useTranslations('address.list');

  // Checkout context
  const { checkout, updateCheckout } = useCheckout();
  const selectedAddressId = checkout.addressId;

  useEffect(() => {
    if (!selectedAddressId && addresses.length > 0) {
      const defaultAddress = addresses.find((a) => a.isPrimary) || addresses[0];
      if (defaultAddress) {
        updateCheckout({ addressId: defaultAddress.id });
      }
    }
  }, [selectedAddressId, addresses, updateCheckout]);

  // Functions
  const onSelectAddress = (address: IAddress) => {
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
