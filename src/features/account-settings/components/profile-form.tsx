'use client';
import { getErrorMessage } from '@/features/auth/register/lib/utils/field-error';
import { Button } from '@/shared/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';
import { PhoneInput } from '@/shared/components/ui/phone';
import { useTranslations } from 'next-intl';

import DeleteAccountConfirmation from './delete-account-confirmation';
import { use, useState } from 'react';
import { useSession } from 'next-auth/react';
import { profileFormSchema, ProfileFormValues } from '../schemas/profile-form.schema';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useUpdateProfile from '../hooks/use-update-profile';
import { toast } from 'sonner';
import ProfilePhoto from './profile-photo';
import getProfileData from '../api/get-profile-data.api';
import { Link } from '@/i18n/navigation';

export default function ProfileForm({
  profileData,
}: {
  profileData: ReturnType<typeof getProfileData>;
}) {
  // Translations
  const t = useTranslations('accountSettings.profile');

  // Query
  const { user } = use(profileData);

  // State
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = useState(false);

  // Context
  const { update, data } = useSession();

  // Mutation
  const { updateProfileAction, isPending } = useUpdateProfile();

  // Form
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      photo: user.photo ?? '',
      firstName: user.firstName ?? '',
      lastName: user.lastName ?? '',
      phone: user.phone ?? '',
    },
  });

  // Submit Changes Function
  async function handleSubmitChanges(values: ProfileFormValues) {
    try {
      await updateProfileAction(values);
    } catch {
      return;
    }

    await update({
      user: {
        ...user,
        ...values,
      },
    });

    // Reset Form
    form.reset(values);

    toast.success(t('update-success'));
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmitChanges)}
        className="relative w-full flex flex-col gap-4 p-5"
      >
        {/* Profile Photo */}
        <ProfilePhoto user={user} />

        {/* Inputs */}
        <div className="inputs flex flex-col gap-2.5">
          {/* First & Last Name */}
          <FieldGroup className="flex flex-row items-center gap-5">
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
            <FieldLabel htmlFor="email">{t('email')}</FieldLabel>
            <Input id="email" type="email" defaultValue={user?.email} readOnly />
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
            <FieldLabel htmlFor="gender">{t('gender')}</FieldLabel>
            <Input id="gender" defaultValue={user?.gender ?? ''} readOnly />
          </Field>
        </div>

        {/* Buttons */}
        <div className="actions flex flex-col-reverse gap-4 pt-8 sm:flex-row sm:items-center sm:justify-between sm:pt-10 md:pt-15">
          <div className="flex flex-col sm:flex-row gap-2.5 items-start sm:items-center">
            {/* Delete Button */}
            <button
              onClick={() => setIsDeleteAccountModalOpen(true)}
              type="button"
              className="cursor-pointer self-start text-sm font-medium text-maroon-500 sm:text-base mx-3"
            >
              {t('delete-account')}
            </button>
            <div>
              {data?.user?.role === 'ADMIN' && (
                <Link
                  href="/admin/account-settings/change-password"
                  type="button"
                  className="cursor-pointer self-start text-sm font-medium hover:text-maroon-500 sm:text-base"
                >
                  {t('change-password')}
                </Link>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <Button
            disabled={isPending || !form.formState.isDirty}
            type="submit"
            className="w-57 cursor-pointer"
          >
            {isPending ? t('saving') : t('submit-changes')}
          </Button>
        </div>

        {/* Delete Modal */}
        {isDeleteAccountModalOpen && (
          <DeleteAccountConfirmation onClose={() => setIsDeleteAccountModalOpen(false)} />
        )}
      </form>
    </FormProvider>
  );
}
