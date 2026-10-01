'use client';
import { Button } from '@/shared/components/ui/button';
import Link from 'next/link';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema, ResetPasswordFormData } from '../../schema/reset-password.schema';
import { ResetPasswordPayload } from '@/features/auth/types/reset-password';
import { resetPasswordApi } from '../../api/reset-password.api';
import { useTranslations } from 'next-intl';
import { Input } from '@/shared/components/ui/input';
import { Field, FieldError, FieldLabel } from '@/shared/components/ui/field';
import { useRouter } from 'next/navigation';

type Props = {
  token?: string;
};

export default function Resetpassword({ token }: Props) {
  const router = useRouter();
  const t = useTranslations();
  const { control, handleSubmit } = useForm<ResetPasswordFormData>({
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
    resolver: zodResolver(resetPasswordSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: ResetPasswordPayload) => resetPasswordApi(data),
    onSuccess() {
      router.push('/login');
    },
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
          <h1 className="text-2xl font-semibold text-ds-text-inverse">
            {t('auth.forgotPw.step3.title')}
          </h1>
          <p className="font-normal ">{t('auth.forgotPw.step3.subtitle')}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className=" border-y border-ds-border-muted ">
          <div className="my-7 space-y-3">
            <Controller
              name="newPassword"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="newPassword">
                    {t('auth.forgotPw.step3.newPassword')}
                  </FieldLabel>

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
                    {t('auth.forgotPw.step3.confirmPassword')}
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
            {t('auth.forgotPw.step3.reset')}
          </Button>
        </form>
        <div className="mt-2">
          <p className="text-center text-sm  text-ds-text-inverse">
            {t('auth.forgotPw.contact')}
            <Link href={'/register'}>
              <span className="cursor-pointer ms-1 text-sm font-medium text-ds-text-primary">
                {t('auth.forgotPw.contactLink')}
              </span>
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
