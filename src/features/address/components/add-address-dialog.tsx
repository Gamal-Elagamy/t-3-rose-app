'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { addressSchema } from '../schemas/address.schema';
import { AddressFormValues, IAddress } from '../types/address';

import AddressDetailsStep from './address-details-step';
import AddressLocationStep from './address-location-step';
import { useAddressStepper } from './address-stepper';

interface AddAddressDialogProps {
  onClose: () => void;
  mode?: 'add' | 'edit';
  address?: IAddress | null;
}

export default function AddAddressDialog({
  onClose,
  mode = 'add',
  address,
}: AddAddressDialogProps) {
  const { currentStep, goToStep, goToNextStep, goToPreviousStep } = useAddressStepper();

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      title: 'Home',
      city: '',
      street: '',
      phone: '',
      isPrimary: true,
    },
  });

  useEffect(() => {
    goToStep(1);

    if (mode === 'edit' && address) {
      form.reset({
        title: address.title,
        city: address.city,
        street: address.street,
        phone: address.phone,
        isPrimary: address.isPrimary,
      });
    }

    if (mode === 'add') {
      form.reset({
        title: 'Home',
        city: '',
        street: '',
        phone: '',
        isPrimary: true,
      });
    }
  }, [mode, address, form, goToStep]);

  const handleNext = async () => {
    const isValid = await form.trigger(['city', 'street', 'phone']);

    if (!isValid) return;

    goToNextStep();
  };

  const handleBack = () => {
    goToPreviousStep();
  };

  return (
    <>
      {currentStep === 1 && (
        <AddressDetailsStep
          control={form.control}
          onNext={handleNext}
        />
      )}

      {currentStep === 2 && (
        <AddressLocationStep
          form={form}
          onBack={handleBack}
          onClose={onClose}
          mode={mode}
          address={address}
        />
      )}
    </>
  );
}
