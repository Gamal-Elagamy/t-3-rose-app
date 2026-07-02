'use client';
import { Button } from '@/shared/components/ui/button';
Input;
import Link from 'next/link';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema, ResetPasswordFormData } from '../../schema/reset-password.schema';
import { ResetPasswordPayload } from '@/features/auth/lib/type/reset-password';
import { ResetPassword } from '../../lib/api/reset-password.api';
import { useTranslations } from 'next-intl';
import { Input } from '@/shared/components/ui/input';
import { Field, FieldSet, FieldError, FieldLabel } from '@/shared/components/ui/field';

type Props = {
  token?: string;
};

export default function Resetpassword({ token }: Props) {
  const t = useTranslations();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
    resolver: zodResolver(resetPasswordSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: ResetPasswordPayload) => ResetPassword(data),
  });

  const onSubmit: SubmitHandler<ResetPasswordFormData> = (data) => {
    if (!token) return;

    mutation.mutateAsync({
      ...data,
      token,
    });
  };

  return (
    <>
      <section>
        <div className="mb-1">
          <h1 className="text-2xl font-semibold text-ds-bg-inverse">{t('forgotPw.step3.title')}</h1>
          <p className="font-normal ">{t('forgotPw.step3.subtitle')}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className=" border-y border-ds-bg-muted ">
          <div className="my-7 space-y-3">
            <Controller
              name="newPassword"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="newPassword">{t('forgotPw.step3.newPassword')}</FieldLabel>

                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    id="newPassword"
                    type="password"
                    placeholder="********"
                  />

                  {fieldState.error?.message && (
                    <FieldError>{t(fieldState.error.message as never)}</FieldError>
                  )}
                </Field>
              )}
            />
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="confirmPassword">
                    {t('forgotPw.step3.confirmPassword')}
                  </FieldLabel>

                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    id="confirmPassword"
                    type="password"
                    placeholder="********"
                  />

                  {fieldState.error?.message && (
                    <FieldError>{t(fieldState.error.message as never)}</FieldError>
                  )}
                </Field>
              )}
            />
          </div>
          <Button
            isLoading={mutation.isPending}
            disabled={mutation.isPending}
            type="submit"
            className="w-full  mb-7"
          >
            {t('forgotPw.step3.reset')}
          </Button>
        </form>
        <div className="mt-2">
          <p className="text-center text-sm  text-ds-bg-inverse">
            {t('forgotPw.contact')}
            <Link href={'/register'}>
              <span className="cuesor-pointer ms-1 text-sm font-medium text-ds-bg-primary">
                {t('forgotPw.contactLink')}
              </span>
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
