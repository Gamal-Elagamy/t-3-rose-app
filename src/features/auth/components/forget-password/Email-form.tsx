'use client';
import { Button } from '@/shared/components/ui/button';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { emailSchema, EmailFormData } from '../../schema/forget-password.schema';
import { ForgetPassword } from '../../lib/api/forget-password.api';
import { useTranslations } from 'next-intl';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
type Props = {
  setEmail: (val: string) => void;
  onSuccess: () => void;
};

export default function Emailform({ setEmail, onSuccess }: Props) {
  const t = useTranslations();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailFormData>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(emailSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: EmailFormData) => ForgetPassword(data),
    onSuccess,
  });

  const onSubmit: SubmitHandler<EmailFormData> = (data: EmailFormData) => {
    mutation.mutateAsync(data);
    setEmail(data.email);
  };

  return (
    <>
      <section>
        <div className="mb-1">
          <h1 className="text-2xl font-semibold text-ds-bg-inverse">{t('forgotPw.step1.title')}</h1>
          <p className="font-normal ">{t('forgotPw.step1.subtitle')}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className=" border-y border-ds-bg-muted ">
          <div className="my-7">
            <Label className="mb-2" htmlFor="email">
              Email
            </Label>
            <Input
              {...register('email')}
              id="email"
              type="email"
              placeholder="user@example.com"
              className="w-full   rounded-md border px-3 py-2"
            />
            {errors.email?.message && <p>{t(errors.email.message as never)}</p>}
          </div>

          <Button
            type="submit"
            isLoading={mutation.isPending}
            disabled={mutation.isPending}
            className="w-full  mb-7"
          >
            {t('forgotPw.step1.continue')}
          </Button>
        </form>
        <div className="mt-2">
          <p className="text-center text-sm  text-ds-bg-inverse">
            {t('forgotPw.step1.noAccountPrompt')}
            <Link href={'/register'}>
              <span className="cuesor-pointer ms-1 text-sm font-medium text-ds-bg-primary">
                {t('forgotPw.step1.createAccount')}
              </span>
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
