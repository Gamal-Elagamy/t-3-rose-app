'use client';

import { Control, Controller } from 'react-hook-form';
import { useTranslations } from 'next-intl';

import { Button } from '@/shared/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import { PhoneInput } from '@/shared/components/ui/phone';

import { AddressFormValues } from '../types/address';

interface AddressDetailsStepProps {
  control: Control<AddressFormValues>;
  onNext: () => void;
}

export default function AddressDetailsStep({ control, onNext }: AddressDetailsStepProps) {
  const t = useTranslations('address');

  return (
    <div className="flex flex-col gap-5">
      {/* Section Title */}
      <h2 className="text-lg font-semibold  text-ds-text-primary">{t('addressDetails')}</h2>

      {/* City */}
      <Controller
        name="city"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="city" className="text-sm font-medium text-gray-800">
              City
            </FieldLabel>

            <Input
              {...field}
              id="city"
              placeholder="Enter city name"
              aria-invalid={fieldState.invalid}
              className="h-10 rounded-lg border-gray-200 px-3 text-sm shadow-none"
            />

            {fieldState.error?.message && <FieldError>{fieldState.error.message}</FieldError>}
          </Field>
        )}
      />

      {/* Address */}
      <Controller
        name="street"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="street" className="text-sm font-medium text-gray-800">
              Address
            </FieldLabel>

            <Textarea
              {...field}
              id="street"
              placeholder="Enter your full address"
              aria-invalid={fieldState.invalid}
            />

            {fieldState.error?.message && <FieldError>{fieldState.error.message}</FieldError>}
          </Field>
        )}
      />

      {/* Phone */}
      <Controller
        name="phone"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="phone" className="text-sm font-medium text-gray-800">
              Phone
            </FieldLabel>

            <PhoneInput
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              id="phone"
              placeholder="Phone number"
              aria-invalid={fieldState.invalid}
            />

            {fieldState.error?.message && <FieldError>{fieldState.error.message}</FieldError>}
          </Field>
        )}
      />

      {/* Next Button */}
      <Button
        type="button"
        onClick={onNext}
        className="
          mt-2
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
        {t('next')}
      </Button>
    </div>
  );
}
