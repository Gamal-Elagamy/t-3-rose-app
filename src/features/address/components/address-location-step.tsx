'use client';

import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/shared/components/ui/button';
import { useTranslations } from 'next-intl';

import { AddressFormValues, IAddress } from '../types/address';
import { useUpdateAddress } from '../hooks/use-update-address';
import { useAddAddress } from '../hooks/use-add-address';
import AddressMap from './map/address-map-wrapper';
import { useRouter } from 'next/navigation';

interface AddressLocationStepProps {
  form: UseFormReturn<AddressFormValues>;
  onBack: () => void;
  onClose: () => void;

  mode?: 'add' | 'edit';
  address?: IAddress | null;
}

export default function AddressLocationStep({
  form,
  onBack,
  onClose,
  mode = 'add',
  address,
}: AddressLocationStepProps) {
  // null = المستخدم لسه ما اختارش موقع
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const addAddressMutation = useAddAddress();
  const updateAddressMutation = useUpdateAddress();

  const router = useRouter();
  const t = useTranslations('address');

  const handleLocationChange = (newLocation: { latitude: number; longitude: number }) => {
    setLocation(newLocation);
  };

  const handleSave = () => {
    // إجبار المستخدم على اختيار موقع
    if (!location) {
      toast.error('Please select a location on the map');
      return;
    }

    const values = form.getValues();

    const body: AddressFormValues & {
      latitude: number;
      longitude: number;
    } = {
      ...values,
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
            toast.success('Address updated successfully');

            router.refresh();

            onClose();
          },

          onError: (error) => {
            toast.error(error.message);
          },
        }
      );

      return;
    }

    addAddressMutation.mutate(body, {
      onSuccess: () => {
        toast.success('Address added successfully');

        router.refresh();

        onClose();
      },

      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Location Header */}
      <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
        {/* Back Button */}
        <button
          type="button"
          onClick={onBack}
          disabled={addAddressMutation.isPending || updateAddressMutation.isPending}
          aria-label={t('back')}
          className="
          cursor-pointer
          flex
          h-8
          w-8
          shrink-0
          items-center
          justify-center
          rounded-full
          bg-maroon-700
          text-white
          transition-colors
          hover:bg-maroon-800
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
        >
          <span className="text-lg leading-none">←</span>
        </button>

        {/* Title */}
        <h2 className="text-[18px] font-medium text-maroon-700">{t('FindYourLocation')}</h2>
      </div>

      {/* Map */}
      <div className="relative overflow-hidden rounded-lg">
        <AddressMap
          latitude={location?.latitude ?? 30.0444}
          longitude={location?.longitude ?? 31.2357}
          onLocationChange={handleLocationChange}
        />
      </div>

      {/* Save Address */}
      <div className="mt-1">
        <Button
          type="button"
          isLoading={addAddressMutation.isPending || updateAddressMutation.isPending}
          disabled={addAddressMutation.isPending || updateAddressMutation.isPending}
          onClick={handleSave}
          className="
          h-10
          w-full
          cursor-pointer
          rounded-lg
          bg-maroon-700
          text-sm
          font-medium
          text-white
          shadow-none
          hover:bg-maroon-800
        "
        >
          {mode === 'edit' ? 'Update Address' : 'Save Address'}
        </Button>
      </div>
    </div>
  );
}
