'use client';

import { useTranslations } from 'next-intl';
import { usePushNotifications } from '@/features/header/components/authenticated-state/notifications/hooks/use-push-notifications';
import { useSyncGuestCart } from '@/features/cart/hooks/use-sync-guest-cart';
import { useSyncGuestWishlist } from '@/features/wish-list/hooks/use-sync-guest-wishlist';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { Input } from '@/shared/components/ui/input';
import { Link } from '@/i18n/navigation';
import { Button } from '@/shared/components/ui/button';

import { LoginPopoverFormValues } from '../../types/login-popover.types';
import { loginPopoverSchema } from '../../schema/login-popover-schema';

type LoginPopoverFormProps = {
  onSuccess?: () => void;
};

export function LoginPopoverForm({ onSuccess }: LoginPopoverFormProps) {
  const t = useTranslations();

  const { subscribeToPush } = usePushNotifications();

  const { mutateAsync: syncGuestCart } = useSyncGuestCart();
  const { mutateAsync: syncGuestWishlist } = useSyncGuestWishlist();
  const [rememberMe, setRememberMe] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginPopoverFormValues>({
    resolver: zodResolver(loginPopoverSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginPopoverFormValues) => {
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
        return;
      }

      subscribeToPush();

      await syncGuestCart();
      await syncGuestWishlist();

      onSuccess?.();
    } catch {
      setGeneralError(t('login.networkError'));
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-4 p-3 sm:gap-5 sm:p-4 md:p-5"
    >
      {/* Username */}
      <div className="flex w-full flex-col gap-1.5">
        <label
          htmlFor="login-popover-username"
          className="text-sm font-medium text-ds-text-default"
        >
          {t('login.username')}
        </label>

        <Input
          id="login-popover-username"
          type="text"
          placeholder="johndoe"
          disabled={isSubmitting}
          aria-invalid={!!errors.username}
          className="h-10 w-full sm:h-11"
          {...register('username')}
        />

        {errors.username && (
          <p className="text-xs text-ds-text-danger">
            {t(errors.username.message as Parameters<typeof t>[0])}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="flex w-full flex-col gap-1.5">
        <label
          htmlFor="login-popover-password"
          className="text-sm font-medium text-ds-text-default"
        >
          {t('login.password')}
        </label>

        <div className="relative w-full">
          <Input
            id="login-popover-password"
            type={'password'}
            placeholder="••••••••"
            disabled={isSubmitting}
            aria-invalid={!!errors.password}
            className="h-10 w-full pr-11 sm:h-11"
            {...register('password')}
          />
        </div>

        {errors.password && (
          <p className="text-xs text-ds-text-danger">{t('login.passwordRequired')}</p>
        )}

        {/* Forgot Password */}
        <Link
          href="/forget-password"
          className="self-end text-xs font-medium text-ds-text-primary hover:underline sm:text-sm"
        >
          {t('login.forgotPassword')}
        </Link>
      </div>

      {/* Remember Me */}
      <label className="flex cursor-pointer items-center gap-2 text-xs text-ds-text-default sm:gap-3 sm:text-sm">
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={(event) => setRememberMe(event.target.checked)}
          disabled={isSubmitting}
          className="size-4 rounded border-ds-border-soft accent-ds-bg-primary sm:size-5"
        />

        <span>{t('login.rememberMe')}</span>
      </label>

      {/* General Error */}
      {generalError && (
        <p className="text-center text-xs text-ds-text-danger sm:text-sm">{generalError}</p>
      )}

      {/* Login Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-10 w-full rounded-lg bg-ds-bg-primary px-3 text-sm font-medium text-ds-text-inverse hover:bg-ds-bg-primary-saturated sm:h-11 sm:text-base"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <span className="size-4 animate-spin rounded-full border-2 border-ds-text-inverse border-t-transparent" />
            {t('login.button')}
          </span>
        ) : (
          t('login.button')
        )}
      </Button>
    </form>
  );
}
