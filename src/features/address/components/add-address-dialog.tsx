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

const DEFAULT_FORM_VALUES: AddressFormValues = {
  title: 'Home',
  city: '',
  street: '',
  phone: '',
  isPrimary: true,
};

function getFormValues(address?: IAddress | null): AddressFormValues {
  if (!address) {
    return DEFAULT_FORM_VALUES;
  }

  return {
    title: address.title,
    city: address.city,
    street: address.street,
    phone: address.phone,
    isPrimary: address.isPrimary,
  };
}

export default function AddAddressDialog({
  onClose,
  mode = 'add',
  address,
}: AddAddressDialogProps) {
  // State
  const { currentStep, goToStep, goToNextStep, goToPreviousStep } = useAddressStepper();

  // Form
  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: DEFAULT_FORM_VALUES,
  });

  // Functions
  const handleNext = async () => {
    const isValid = await form.trigger(['city', 'street', 'phone']);

    if (!isValid) return;

    goToNextStep();
  };

  const handleBack = () => {
    goToPreviousStep();
  };

  // Effects
  useEffect(() => {
    goToStep(1);
    form.reset(mode === 'edit' ? getFormValues(address) : DEFAULT_FORM_VALUES);
  }, [mode, address, form, goToStep]);

  return (
    <>
      {currentStep === 1 && <AddressDetailsStep control={form.control} onNext={handleNext} />}

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
