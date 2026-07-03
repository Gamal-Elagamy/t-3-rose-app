'use client';
import { Controller, useFormContext } from 'react-hook-form';

import { Field, FieldError, FieldLabel } from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';
import { RegisterFormValues } from '@/features/auth/register/lib/types/register';
import { getErrorMessage } from '@/features/auth/register/lib/utils/field-error';
import { useTranslations } from 'next-intl';

export interface IRegisterStepOneProps {
  apiError?: { message?: string } | null;
}

export default function RegisterStepOne({ apiError }: IRegisterStepOneProps) {
  // Form Context
  const { control } = useFormContext<RegisterFormValues>();

  // Translations
  const t = useTranslations('register');

  return (
    <>
      {/* Email */}
      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid || !!apiError}>
            {/* Label */}
            <FieldLabel htmlFor="email">{t('fields.email')}</FieldLabel>

            {/* Input */}
            <Input
              {...field}
              id="email"
              type="email"
              placeholder="user@example.com"
              autoComplete="email"
              aria-invalid={fieldState.invalid || !!apiError}
            />
            {fieldState.invalid && (fieldState.error?.message || apiError?.message) && (
              // Error Message
              <FieldError
                errors={[
                  {
                    message: fieldState.error?.message
                      ? getErrorMessage(t, fieldState.error.message)
                      : apiError?.message,
                  },
                ]}
              />
            )}
          </Field>
        )}
      />
    </>
  );
}
