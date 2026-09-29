'use client';

import { Control, Controller } from 'react-hook-form';
import { useTranslations } from 'next-intl';

import { Button } from '@/shared/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import { PhoneInput } from '@/shared/components/ui/phone';

import { AddressFormValues } from '../types/address';
import { AddressValidationKey } from '../schemas/address.schema';

interface AddressDetailsStepProps {
  control: Control<AddressFormValues>;
  onNext: () => void;
  mode?: 'add' | 'edit';
}

function getValidationMessage(
  message: string | undefined,
  translate: (key: AddressValidationKey) => string
) {
  if (!message) return undefined;

  return translate(message as AddressValidationKey);
}

export default function AddressDetailsStep({
  control,
  onNext,
  mode = 'add',
}: AddressDetailsStepProps) {
  // Translation
  const t = useTranslations('address');

  // Variables
  const title = mode === 'edit' ? t('edit') : t('addressDetails');

  return (
    <div className="flex flex-col gap-5">
      {/* Section Title */}
      <h2
        className="
          pb-3
          text-lg
          font-semibold
          text-ds-bg-primary
          border-b border-ds-border-soft
        "
      >
        {title}
      </h2>

      {/* City */}
      <Controller
        name="city"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="city" className="text-sm font-medium text-ds-text-default">
              {t('city')}
            </FieldLabel>

            <Input
              {...field}
              id="city"
              placeholder={t('city')}
              aria-invalid={fieldState.invalid}
              className="
                h-10
                rounded-lg
                border-ds-border-soft
                px-3
                text-sm
                shadow-none
              "
            />

            {fieldState.error?.message && (
              <FieldError>{getValidationMessage(fieldState.error.message, t)}</FieldError>
            )}
          </Field>
        )}
      />

      {/* Address */}
      <Controller
        name="street"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="street" className="text-sm font-medium text-ds-text-default">
              {t('details')}
            </FieldLabel>

            <Textarea
              {...field}
              id="street"
              placeholder={t('details')}
              aria-invalid={fieldState.invalid}
            />

            {fieldState.error?.message && (
              <FieldError>{getValidationMessage(fieldState.error.message, t)}</FieldError>
            )}
          </Field>
        )}
      />

      {/* Phone */}
      <Controller
        name="phone"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="phone" className="text-sm font-medium text-ds-text-default">
              {t('phone')}
            </FieldLabel>

            <PhoneInput
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              id="phone"
              placeholder={t('phone')}
              aria-invalid={fieldState.invalid}
            />

            {fieldState.error?.message && (
              <FieldError>{getValidationMessage(fieldState.error.message, t)}</FieldError>
            )}
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
          bg-ds-bg-primary
          text-sm
          font-medium
          text-ds-text-inverse
          shadow-none
          hover:bg-ds-bg-primary-saturated
        "
      >
        {t('next')}
      </Button>
    </div>
  );
}
