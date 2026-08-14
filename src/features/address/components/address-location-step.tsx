'use client';

import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Button } from '@/shared/components/ui/button';

import { AddressFormValues, IAddress } from '../types/address';
import { useUpdateAddress } from '../hooks/use-update-address';
import { useAddAddress } from '../hooks/use-add-address';

import AddressMap from './map/address-map-wrapper';

interface AddressLocationStepProps {
  form: UseFormReturn<AddressFormValues>;
  onBack: () => void;
  onClose: () => void;
  mode?: 'add' | 'edit';
  address?: IAddress | null;
}

interface Location {
  latitude: number;
  longitude: number;
}

const DEFAULT_LOCATION: Location = {
  latitude: 30.0444,
  longitude: 31.2357,
};

export default function AddressLocationStep({
  form,
  onBack,
  onClose,
  mode = 'add',
  address,
}: AddressLocationStepProps) {
  // Translation
  const t = useTranslations('address');

  // Navigation
  const router = useRouter();

  // State
  const [location, setLocation] = useState<Location | null>(
    address?.latitude && address?.longitude
      ? {
          latitude: Number(address.latitude),
          longitude: Number(address.longitude),
        }
      : null
  );

  // Mutation
  const addAddressMutation = useAddAddress();
  const updateAddressMutation = useUpdateAddress();

  // Variables
  const isSaving = addAddressMutation.isPending || updateAddressMutation.isPending;

  const mapLocation = location ?? DEFAULT_LOCATION;

  // Functions
  const handleLocationChange = (newLocation: Location) => {
    setLocation(newLocation);
  };

  const handleSaveSuccess = (message: string) => {
    toast.success(message);
    router.refresh();
    onClose();
  };

  const handleSaveError = (error: Error) => {
    toast.error(error.message);
  };

  const handleSave = () => {
    if (!location) {
      toast.error(t('locationRequired'));
      return;
    }

    const body = {
      ...form.getValues(),
      latitude: location.latitude,
      longitude: location.longitude,
    };

    if (mode === 'edit' && address) {
      updateAddressMutation.mutate(
        {
          id: address.id,
          body,
        },
        {
          onSuccess: () => {
            handleSaveSuccess(t('updated'));
          },
          onError: handleSaveError,
        }
      );

      return;
    }

    addAddressMutation.mutate(body, {
      onSuccess: () => {
        handleSaveSuccess(t('added'));
      },
      onError: handleSaveError,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Location Header */}
      <div
        className="
          flex
          items-center
          gap-3
          border-b
          border-ds-border-soft
          pb-3
        "
      >
        {/* Back Button */}
        <button
          type="button"
          onClick={onBack}
          disabled={isSaving}
          aria-label={t('back')}
          className="
            flex
            h-8
            w-8
            shrink-0
            cursor-pointer
            items-center
            justify-center
            rounded-full
            bg-ds-bg-primary
            text-white
            transition-colors
            hover:bg-ds-bg-primary-saturated
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          <span className="text-lg leading-none">←</span>
        </button>

        {/* Location Title */}
        <h2
          className="
            text-lg
            font-semibold
            text-ds-bg-primary
          "
        >
          {t('FindYourLocation')}
        </h2>
      </div>

      {/* Map */}
      <div className="relative overflow-hidden rounded-lg">
        <AddressMap
          latitude={mapLocation.latitude}
          longitude={mapLocation.longitude}
          onLocationChange={handleLocationChange}
        />
      </div>

      {/* Save Address */}
      <div className="mt-1">
        <Button
          type="button"
          isLoading={isSaving}
          disabled={isSaving}
          onClick={handleSave}
          className="
            h-10
            w-full
            cursor-pointer
            rounded-lg
            bg-ds-bg-primary
            text-sm
            font-medium
            text-ds-text-inverse
            shadow-none
            hover:bg-ds-bg-primary-saturated
          "
        >
          {mode === 'edit' ? t('update') : t('save')}
        </Button>
      </div>
    </div>
  );
}
