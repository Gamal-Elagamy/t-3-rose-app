'use client';
import { getErrorMessage } from '@/features/auth/register/lib/utils/field-error';
import { Button } from '@/shared/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';
import { PhoneInput } from '@/shared/components/ui/phone';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import DeleteAccountConfirmation from './delete-account-confirmation';
import { useEffect, useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';
import ProfileFormSkeleton from '@/shared/components/ui/delete-account-skeleton';
import { profileFormSchema, ProfileFormValues } from '../schemas/profile-form.schema';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useUpdateProfile from '../hooks/use-update-profile';
import { toast } from 'sonner';
import ProfilePhoto from './profile-photo';

export default function ProfileForm() {
  // Translations
  const t = useTranslations('accountSettings.profile');

  // State
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = useState(false);

  // Session
  const { data: user, update } = useSession();

  // Mutation
  const { updateProfileAction, isPending } = useUpdateProfile();

  // Variables
  const userDate = useMemo(() => user?.user, [user]);

  // Form
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      photo: undefined,
      firstName: '',
      lastName: '',
      phone: '',
    },
  });

  // Submit Changes Function
  async function handlesubmitChanges(values: ProfileFormValues) {
    try {
      await updateProfileAction(values);

      await update({
        user: {
          ...userDate,
          ...values,
        },
      });

      // Reset Form
      form.reset(values);

      toast.success(t('update-success'));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('update-failed'));
    }
  }
  // console.log(userDate);

  // Effect State
  useEffect(() => {
    if (userDate) {
      form.reset({
        photo: userDate.photo ?? '',
        firstName: userDate.firstName ?? '',
        lastName: userDate.lastName ?? '',
        phone: userDate.phone ?? '',
      });
    }
  }, [userDate]);

  // Skeleton
  if (!user) {
    return <ProfileFormSkeleton />;
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(handlesubmitChanges)}
        className="relative w-full flex flex-col gap-4 p-5"
      >
        {/* Profile Photo */}
        <ProfilePhoto />

        {/* Inputs */}
        <div className="inputs flex flex-col gap-2.5">
          {/* First & Last Name */}
          <FieldGroup className="flex flex-row item-center gap-5">
            {/* First Name */}
            <Controller
              name="firstName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="firstName">{t('firstName')}</FieldLabel>
                  <Input
                    {...field}
                    id="firstName"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
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

            {/* Last Name */}
            <Controller
              name="lastName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="lastName">{t('lastName')}</FieldLabel>
                  <Input
                    {...field}
                    id="lastName"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
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
          </FieldGroup>

          {/* Email */}
          <Field>
            <FieldLabel>{t('email')}</FieldLabel>
            <Input type="email" defaultValue={userDate?.email} readOnly />
          </Field>

          {/* Phone */}
          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="phone">{t('phone')}</FieldLabel>
                <PhoneInput
                  value={field.value}
                  onChange={field.onChange}
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  aria-invalid={fieldState.invalid}
                  onBlur={field.onBlur}
                  ref={field.ref}
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

          {/* Gender */}
          <Field disabled>
            <FieldLabel>{t('gender')}</FieldLabel>
            <Input defaultValue={userDate?.gender ?? ''} disabled />
          </Field>
        </div>

        {/* Buttons */}
        <div className="actions pt-15 flex item-center justify-between">
          {/* Delete Button */}
          <button
            onClick={() => setIsDeleteAccountModalOpen(true)}
            type="button"
            className="font-medium text-base text-maroon-500 cursor-pointer"
          >
            {t('delete-account')}
          </button>

          {/* Submit Button */}
          <Button
            disabled={isPending || !form.formState.isDirty}
            type="submit"
            className="w-57 cursor-pointer"
          >
            {isPending ? t('saving') : t('submit-changes')}
          </Button>
        </div>

        {/* Delet Model */}
        {isDeleteAccountModalOpen && (
          <DeleteAccountConfirmation onClose={() => setIsDeleteAccountModalOpen(false)} />
        )}
      </form>
    </FormProvider>
  );
}
