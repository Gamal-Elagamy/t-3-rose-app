'use client';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Field, FieldLabel, FieldGroup, FieldError } from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { updatePasswordSchema } from '../schemas/update-password.schema';
import { Button } from '@/shared/components/ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { signOut } from 'next-auth/react';
import { UpdatePasswordFormData } from '../types/account';
import useUpdatePassword from '../hooks/use-update-password';
import { useTranslations } from 'next-intl';
import { isAccountSettingsApiError } from '../lib/account-settings-api-error';

function getErrorMessage(t: ReturnType<typeof useTranslations>, key: string): string {
  try {
    const parts = key.split('.');
    const relativeKey = parts.slice(parts.indexOf('validation')).join('.');
    return t(relativeKey as never);
  } catch {
    return key;
  }
}

export default function UpdatePasswordForm() {
  const { mutate: updatePassword, isPending } = useUpdatePassword();
  const t = useTranslations('accountSettings.updatePassword');
  const [backendErrors, setBackendErrors] = useState<Array<{ path: string; message: string }>>([]);

  const form = useForm<UpdatePasswordFormData>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const onSubmit = (data: UpdatePasswordFormData) => {
    setBackendErrors([]);
    updatePassword(data, {
      onSuccess: () => {
        toast.success(t('success'));
        form.reset();
        signOut({ callbackUrl: '/login' });
      },
      onError: (error: unknown) => {
        if (!isAccountSettingsApiError(error)) {
          return;
        }

        if (error.errors?.length) {
          setBackendErrors(error.errors);
          return;
        }

        setBackendErrors([{ path: '', message: error.message }]);
      },
    });
  };

  return (
    <div className="w-full">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col font-geist-mono gap-3 md:gap-4"
      >
        {/* Current Password */}
        <FieldGroup>
          <Controller
            name="currentPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="currentPassword">{t('oldPassword')}</FieldLabel>
                <div className="relative">
                  <Input
                    {...field}
                    id="currentPassword"
                    type="password"
                    placeholder={t('placeholder')}
                    aria-invalid={fieldState.invalid}
                    className={fieldState.invalid ? 'border-destructive pr-10' : 'pr-10'}
                  />
                </div>
                {fieldState.invalid && (
                  <FieldError
                    errors={[
                      {
                        message: getErrorMessage(t, fieldState.error?.message || ''),
                      },
                    ]}
                  />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <hr className="text-zinc-300 my-2" />

        {/* New Password */}
        <FieldGroup>
          <Controller
            name="newPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="newPassword">{t('newPassword')}</FieldLabel>
                <div className="relative">
                  <Input
                    {...field}
                    id="newPassword"
                    type="password"
                    placeholder={t('placeholder')}
                    aria-invalid={fieldState.invalid}
                    className={fieldState.invalid ? 'border-destructive pr-10' : 'pr-10'}
                  />
                </div>
                {fieldState.invalid && (
                  <FieldError
                    errors={[
                      {
                        message: getErrorMessage(t, fieldState.error?.message || ''),
                      },
                    ]}
                  />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        {/* Confirm New Password */}
        <FieldGroup>
          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="confirmPassword">{t('confirmPassword')}</FieldLabel>
                <Input
                  {...field}
                  id="confirmPassword"
                  type="password"
                  placeholder={t('placeholder')}
                  aria-invalid={fieldState.invalid}
                  className={fieldState.invalid ? 'border-destructive pr-10' : 'pr-10'}
                />
                {fieldState.invalid && (
                  <FieldError
                    errors={[
                      {
                        message: getErrorMessage(t, fieldState.error?.message || ''),
                      },
                    ]}
                  />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        {/* Backend Validation Errors */}
        {backendErrors.length > 0 && (
          <div className="mt-4 md:mt-6 bg-ds-bg-danger/10 border border-ds-border-danger/20 rounded-lg p-2 md:p-3">
            {backendErrors.map((err, index) => (
              <p key={index} className="text-sm text-ds-text-danger">
                {err.message}
              </p>
            ))}
          </div>
        )}

        {/* Update Password Button */}
        <Button
          type="submit"
          variant="default"
          className="mt-16 md:mt-19 ml-auto w-full md:w-57 py-3.5 px-4 rounded-xl"
          disabled={isPending || form.formState.isSubmitting || !form.formState.isValid}
        >
          {isPending ? <Loader2 className="w-5 h-5 animate-spin text-white" /> : t('submit')}
        </Button>
      </form>
    </div>
  );
}
