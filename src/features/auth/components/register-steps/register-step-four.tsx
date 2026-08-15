import { Controller, useFormContext } from 'react-hook-form';
import { RegisterFormValues } from '@/features/auth/register/lib/types/register';
import { useTranslations } from 'next-intl';
import { Field, FieldError, FieldLabel } from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';
import { getErrorMessage } from '@/features/auth/register/lib/utils/field-error';
import { StepProps } from '@/features/auth/register/lib/types/step-props';

export default function RegisterStepFour({ apiError }: StepProps) {
  // Form Context
  const { control } = useFormContext<RegisterFormValues>();

  // Translations
  const t = useTranslations('auth.register');
  return (
    <>
      {/* Password */}
      <Controller
        name="password"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="pt-5">
            <FieldLabel htmlFor="password">{t('fields.password')}</FieldLabel>
            <Input
              {...field}
              id="password"
              placeholder="********"
              type="password"
              autoComplete="new-password"
              aria-invalid={fieldState.invalid}
            />
            {fieldState.invalid && fieldState.error?.message && (
              <FieldError
                errors={[
                  {
                    message: getErrorMessage(t, fieldState.error.message),
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
            {fieldState.invalid && fieldState.error?.message && (
              <FieldError
                errors={[
                  {
                    message: getErrorMessage(t, fieldState.error.message),
                  },
                ]}
              />
            )}
          </Field>
        )}
      />

      {/* General Submit Error */}
      {apiError?.message && (
        <p role="alert" className="text-ds-text-danger text-sm mt-2 text-center">
          {apiError.message}
        </p>
      )}
    </>
  );
}
