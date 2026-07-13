'use client';
import { Button } from '@/shared/components/ui/button';
import Link from 'next/link';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { emailSchema, EmailFormData } from '../../schema/forget-password.schema';
import { forgotPasswordApi } from '../../api/forget-password.api';
import { useTranslations } from 'next-intl';
import { Input } from '@/shared/components/ui/input';
import { Field, FieldError, FieldLabel } from '@/shared/components/ui/field';

type Props = {
  setEmail: (val: string) => void;
  onSuccess: () => void;
};

export default function Emailform({ setEmail, onSuccess }: Props) {
  const t = useTranslations();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EmailFormData>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(emailSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: EmailFormData) => forgotPasswordApi(data),
    onSuccess,
  });

  const onSubmit: SubmitHandler<EmailFormData> = (data: EmailFormData) => {
    mutation.mutate(data);
    setEmail(data.email);
  };

  return (
    <>
      <section>
        <div className="mb-1">
          <h1 className="text-2xl font-semibold text-ds-text-inverse">
            {t('auth.forgotPw.step1.title')}
          </h1>
          <p className="font-normal ">{t('auth.forgotPw.step1.subtitle')}</p>
        </div>

        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className=" border-y border-ds-border-muted "
        >
          <div className="my-7">
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="email"
                    aria-invalid={fieldState.invalid}
                    type="email"
                    placeholder="user@example.com"
                  />
                  {errors.email && <FieldError>{t(errors.email.message as never)}</FieldError>}
                </Field>
              )}
            />
          </div>

          <Button
            type="submit"
            isLoading={mutation.isPending}
            disabled={mutation.isPending}
            className="w-full  mb-7"
          >
            {t('auth.forgotPw.step1.continue')}
          </Button>
        </form>
        <div className="mt-2">
          <p className="text-center text-sm  text-ds-text-inverse">
            {t('auth.forgotPw.step1.noAccountPrompt')}
            <Link href={'/register'}>
              <span className="cursor-pointer ms-1 text-sm font-medium text-ds-text-primary">
                {t('auth.forgotPw.step1.createAccount')}
              </span>
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
