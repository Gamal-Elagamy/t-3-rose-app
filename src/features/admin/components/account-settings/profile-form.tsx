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
import { profileFormSchema, ProfileFormValues } from '../../schemas/profile-form.schema';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useUpdateProfile from '../../hooks/account-settings/use-update-profile';
import { toast } from 'sonner';
import ProfilePhoto from './profile-photo';
import getProfileData from '../../apis/get-profile-data.api';
import { Card } from '@/shared/components/ui/card';

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
  const { update } = useSession();

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
  <div className="relative w-full space-y-4 p-4 sm:space-y-5 sm:p-6 md:p-8 lg:space-y-6 lg:p-10">
    <h1 className="w-full text-xl font-semibold sm:text-2xl">
      {t('account-settings-dashoard')}
    </h1>

    <Card className="w-full rounded-2xl bg-white p-4 sm:p-5">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitChanges)} className="w-full">
          {/* Profile Photo */}
          <ProfilePhoto user={user} />

          {/* Inputs */}
          <div className="inputs mt-5 flex flex-col gap-3 sm:gap-2.5">
            {/* First & Last Name */}
            <FieldGroup className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-5">
              {/* First Name */}
              <Controller
                name="firstName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="min-w-0 flex-1"
                  >
                    <FieldLabel htmlFor="firstName">
                      {t('firstName')}
                    </FieldLabel>

                    <Input
                      {...field}
                      id="firstName"
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                      className="w-full"
                    />

                    {fieldState.invalid && fieldState.error?.message && (
                      <FieldError
                        errors={[
                          {
                            message: getErrorMessage(
                              t,
                              fieldState.error.message
                            ),
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
                  <Field
                    data-invalid={fieldState.invalid}
                    className="min-w-0 flex-1"
                  >
                    <FieldLabel htmlFor="lastName">
                      {t('lastName')}
                    </FieldLabel>

                    <Input
                      {...field}
                      id="lastName"
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                      className="w-full"
                    />

                    {fieldState.invalid && fieldState.error?.message && (
                      <FieldError
                        errors={[
                          {
                            message: getErrorMessage(
                              t,
                              fieldState.error.message
                            ),
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
              <FieldLabel htmlFor="email">
                {t('email')}
              </FieldLabel>

              <Input
                id="email"
                type="email"
                defaultValue={user?.email}
                readOnly
                className="w-full"
              />
            </Field>

            {/* Phone */}
            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="phone">
                    {t('phone')}
                  </FieldLabel>

                  <PhoneInput
                    value={field.value}
                    onChange={field.onChange}
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    aria-invalid={fieldState.invalid}
                    onBlur={field.onBlur}
                    ref={field.ref}
                    className="w-full"
                  />

                  {fieldState.invalid && fieldState.error?.message && (
                    <FieldError
                      errors={[
                        {
                          message: getErrorMessage(
                            t,
                            fieldState.error.message
                          ),
                        },
                      ]}
                    />
                  )}
                </Field>
              )}
            />

            {/* Gender */}
            <Field disabled>
              <FieldLabel htmlFor="gender">
                {t('gender')}
              </FieldLabel>

              <Input
                id="gender"
                className="w-full bg-zinc-100"
                defaultValue={user?.gender ?? ''}
                readOnly
              />
            </Field>
          </div>

          {/* Buttons */}
          <div className="actions flex flex-col-reverse gap-4 pt-8 sm:flex-row sm:items-center sm:justify-between sm:pt-10 md:pt-15">
            {/* Delete Button */}
            <button
              onClick={() => setIsDeleteAccountModalOpen(true)}
              type="button"
              className="cursor-pointer self-start text-sm font-medium text-maroon-500 sm:text-base"
            >
              {t('delete-account')}
            </button>

            {/* Submit Button */}
            <Button
              disabled={isPending || !form.formState.isDirty}
              type="submit"
              className="w-full cursor-pointer sm:w-57"
            >
              {isPending ? t('saving') : t('submit-changes')}
            </Button>
          </div>

          {/* Delete Modal */}
          {isDeleteAccountModalOpen && (
            <DeleteAccountConfirmation
              onClose={() => setIsDeleteAccountModalOpen(false)}
            />
          )}
        </form>
      </FormProvider>
    </Card>
  </div>
);
}
