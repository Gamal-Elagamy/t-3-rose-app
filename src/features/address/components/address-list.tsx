'use client';
import { useState } from 'react';
import { IAddress } from '../types/address';
import { AddressCard } from './address-card';
import AddressFormModalButton from '@/features/checkout/components/shipping/form-modal-button';
import AddressNextStepButton from '@/features/checkout/components/shipping/next-step-button';

export function AddressList({ addresses }: { addresses: IAddress[] }) {
  const [selectedAddressId, setSelectedAddressId] = useState<string | undefined>(
    addresses.find((address) => address.isPrimary)?.id
  );

  const onSelectAddress = (address: IAddress) => {
    setSelectedAddressId(address.id);
  };

  if (addresses.length === 0) {
    return (
      <div className="text-center py-8 text-ds-text-muted">
        No addresses found, please add a new address.
      </div>
    );
  }

  return (
    <>
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

      <div className="flex items-center my-3">
        <div className="flex-1 border-t border-ds-border-muted"></div>
        <span className="px-4 text-md text-ds-text-soft font-medium">OR</span>
        <div className="flex-1 border-t border-ds-border-muted"></div>
      </div>

      <AddressFormModalButton />

      <AddressNextStepButton selectedAddressId={selectedAddressId} />
    </>
  );
}
