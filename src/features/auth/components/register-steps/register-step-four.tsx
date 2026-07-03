import { Controller, useFormContext } from 'react-hook-form';
import { RegisterFormValues } from '@/features/auth/register/lib/types/register';
import { useTranslations } from 'next-intl';
import { Field, FieldError, FieldLabel } from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';
import { IRegisterStepOneProps } from './register-step-one';
import { getErrorMessage } from '@/features/auth/register/lib/utils/field-error';

export default function RegisterStepFour({ apiError }: IRegisterStepOneProps) {
  // Form Context
  const { control } = useFormContext<RegisterFormValues>();

  // Translations
  const t = useTranslations('register');
  return (
    <>
      {/* Password */}
      <Controller
        name="password"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid || !!apiError} className="pt-5">
            <FieldLabel htmlFor="password">{t('fields.password')}</FieldLabel>
            <Input
              {...field}
              id="password"
              placeholder="********"
              type="password"
              autoComplete="new-password"
              aria-invalid={fieldState.invalid}
            />
            {fieldState.invalid && (fieldState.error?.message || apiError?.message) && (
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

      {/* Confirm Password */}
      <Controller
        name="confirmPassword"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="confirmPassword">{t('fields.confirmPassword')}</FieldLabel>
            <Input
              {...field}
              id="confirmPassword"
              placeholder="********"
              type="password"
              autoComplete="new-password"
              aria-invalid={fieldState.invalid}
            />
            {fieldState.invalid && (fieldState.error?.message || apiError?.message) && (
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
