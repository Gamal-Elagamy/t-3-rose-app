import { Controller, useFormContext } from 'react-hook-form';
import { RegisterFormValues } from '@/features/auth/register/lib/types/register';
import { useTranslations } from 'next-intl';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';
import { IRegisterStepOneProps } from './register-step-one';
import { getErrorMessage } from '@/features/auth/register/lib/utils/field-error';
import Select from '@/shared/components/Select/select';
import { PhoneInput } from '@/shared/components/ui/phone';

// Select Array Items
const genderItems = [
  { label: 'Male', value: 'MALE' },
  { label: 'Female', value: 'FEMALE' },
];

export default function RegisterStepThree({ apiError }: IRegisterStepOneProps) {
  // Form Context
  const { control } = useFormContext<RegisterFormValues>();

  // Translations
  const t = useTranslations('register');
  return (
    <>
      <FieldGroup className="grid grid-cols-2 gap-5 pt-5">
        {/* First Name */}
        <Controller
          name="firstName"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid || !!apiError}>
              <FieldLabel htmlFor="firstName">{t('fields.firstName')}</FieldLabel>
              <Input
                {...field}
                id="firstName"
                placeholder="Jonathan"
                autoComplete="given-name"
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

        {/* Last Name */}
        <Controller
          name="lastName"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="lastName">{t('fields.lastName')}</FieldLabel>
              <Input
                {...field}
                id="lastName"
                placeholder="Adrian"
                autoComplete="family-name"
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
      </FieldGroup>

      {/* UserName */}
      <Controller
        name="username"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="username">{t('fields.username')}</FieldLabel>
            <Input
              {...field}
              id="username"
              placeholder="Adrian"
              autoComplete="user-name"
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

      {/* Phone */}
      <Controller
        name="phone"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="phone">{t('fields.phone')}</FieldLabel>
            <PhoneInput
              {...field}
              id="phone"
              type="tel"
              autoComplete="tel"
              defaultCountry="EG"
              placeholder="Phone number"
              aria-invalid={fieldState.invalid}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              ref={field.ref}
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

      {/* Select Gender */}
      <Controller
        name="gender"
        control={control}
        render={({ field, fieldState }) => (
          <Select
            label={t('fields.gender')}
            placeholder={t('fields.placeholder-gender')}
            options={genderItems.map((item) => ({
              value: item.value,
              label: t(`${item.value.toLowerCase()}` as never),
            }))}
            value={field.value}
            onChange={field.onChange}
            // error={fieldState.error?.message}
            error={
              fieldState.error?.message ? getErrorMessage(t, fieldState.error.message) : undefined
            }
          />
        )}
      />
    </>
  );
}
