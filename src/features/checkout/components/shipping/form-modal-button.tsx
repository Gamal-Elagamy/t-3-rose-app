'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { Button } from '@/shared/components/ui/button';

import AddressesModal from '@/features/address/components/addresses-modal';
import { IAddress } from '@/features/address/types/address';

interface AddressFormModalButtonProps {
  addresses: IAddress[];
}

export default function AddressFormModalButton({ addresses }: AddressFormModalButtonProps) {
  const t = useTranslations('checkout.shipping');

  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        className="mb-6 w-full border-none bg-ds-bg-primary-fade text-ds-text-primary"
        onClick={() => setOpen(true)}
      >
        {t('addNewAddress')}
      </Button>

      <AddressesModal open={open} onOpenChange={setOpen} addresses={addresses} />
    </>
  );
}
