'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/shared/components/ui/input';
import { signIn } from 'next-auth/react';

const loginSchema = z.object({
  username: z.string().min(1, 'usernameRequired'),
  password: z.string().min(1, 'passwordRequired'),
});
type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const t = useTranslations();

  const [rememberMe, setRememberMe] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setGeneralError(null);

    try {
      const result = await signIn('credentials', {
        username: data.username,
        password: data.password,
        rememberMe: rememberMe.toString(),
        redirect: false,
      });

      if (result?.error) {
        setGeneralError(t('login.invalidCredentials'));
      } else {
        router.push('/');
      }
    } catch (err) {
      setGeneralError(t('login.networkError'));
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex w-full flex-col justify-center px-8 lg:w-1/2 lg:px-16">
        <div className="mx-auto w-full max-w-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            {/* username */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="username">{t('login.username')}</label>

              <Input id="username" type="text" placeholder="johndoe" {...register('username')} />
              {errors.username && (
                <p className="text-xs text-ds-text-danger">{t(`login.usernameRequired`)}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-sm font-medium text-ds-text-default">
                {t('login.password')}
              </label>
              {/* Eye icon toggle */}
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                aria-invalid={!!errors.password}
                disabled={isSubmitting}
                {...register('password')}
              />
              {errors.password && (
                <p className="text-xs text-ds-text-danger">{t(`login.passwordRequired`)}</p>
              )}

              {/* Forgot password  */}
              <Link
                href="/forgot-password"
                className="text-end text-xs text-ds-text-primary hover:underline"
              >
                {t('login.forgotPassword')}
              </Link>
            </div>

            {/* Remember me */}
            <label className="flex items-center gap-2 text-sm text-ds-text-default">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={isSubmitting}
                className="size-4 rounded border-ds-border-soft accent-ds-bg-primary"
              />
              {t('login.rememberMe')}
            </label>

            {/* General error */}
            {generalError && (
              <p className="text-center text-sm text-ds-text-danger">{generalError}</p>
            )}

            {/* Login button  */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-ds-bg-primary py-3 text-sm font-semibold text-ds-text-inverse transition-colors hover:bg-ds-bg-primary-saturated disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="size-4 animate-spin rounded-full border-2 border-ds-text-inverse border-t-transparent" />
                  {t('login.button')}
                </span>
              ) : (
                t('login.button')
              )}
            </button>

            {/* Register footer link */}
            <p className="text-center text-sm text-ds-text-muted">
              {t('login.noAccount')}{' '}
              <Link href="/register" className="font-medium text-ds-text-primary hover:underline">
                {t('login.register')}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
