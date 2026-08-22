'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';

import { IAddress } from '../types/address';

import { AddressCard } from './address-card';
import AddressModalItem from './address-modal-item';

import AddressFormModalButton from '@/features/checkout/components/shipping/form-modal-button';
import AddressNextStepButton from '@/features/checkout/components/shipping/next-step-button';
import { useCheckout } from '@/features/checkout/context/checkout-context';

interface AddressListProps {
  addresses: IAddress[];

  variant?: 'checkout' | 'modal';

  onAdd?: () => void;
  onEdit?: (address: IAddress) => void;
  onDelete?: (address: IAddress) => void;
}

export function AddressList({
  addresses,
  variant = 'checkout',
  onEdit,
  onDelete,
}: AddressListProps) {
  const t = useTranslations('address');

  const locale = useLocale();

  const isRTL = locale === 'ar';

  const [selectedAddressId, setSelectedAddressId] = useState(
    addresses.find((address) => address.isPrimary)?.id
  );

  // Checkout context
  const { updateCheckout } = useCheckout();

  // Functions
  const onSelectAddress = (address: IAddress) => {
    setSelectedAddressId(address.id);
    updateCheckout({ addressId: address.id });
  };

  if (!addresses.length) {
    return (
      <div className="py-10 text-center text-ds-text-muted" dir={isRTL ? 'rtl' : 'ltr'}>
        {t('list.noAddresses')}
      </div>
    );
  }

  return (
    <>
      {/* Address items only */}
      <div
        className={
          variant === 'modal'
            ? 'h-105 space-y-4 overflow-y-auto pr-1'
            : 'max-h-105 space-y-4 overflow-y-auto'
        }
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {addresses.map((address) =>
          variant === 'checkout' ? (
            <AddressCard
              key={address.id}
              address={address}
              isSelected={selectedAddressId === address.id}
              onSelect={onSelectAddress}
            />
          ) : (
            <AddressModalItem
              key={address.id}
              address={address}
              isSelected={selectedAddressId === address.id}
              onSelect={onSelectAddress}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          )
        )}
      </div>

      {/* Checkout actions only */}
      {variant === 'checkout' && (
        <>
          <div className="my-3 flex items-center" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="flex-1 border-t border-ds-border-muted" />

            <span className="px-4 text-md font-medium text-ds-text-soft">{t('list.or')}</span>
            <div className="flex-1 border-t border-ds-border-muted" />
          </div>

          <AddressFormModalButton addresses={addresses} />

          {/* Show next step button only if addresses exist */}
          {addresses.length !== 0 && (
            <AddressNextStepButton selectedAddressId={selectedAddressId} />
          )}
        </>
      )}
    </>
  );
}
