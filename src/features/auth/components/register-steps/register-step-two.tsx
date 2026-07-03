'use client';
import { Controller, useFormContext } from 'react-hook-form';
import { RegisterFormValues } from '@/features/auth/register/lib/types/register';
import { useTranslations } from 'next-intl';
import { OtpInput } from '@/shared/components/otp-input';
import { getErrorMessage } from '../../register/lib/utils/field-error';
import { useState, useEffect } from 'react';

// InterFace
interface RegisterStepTwoProps {
  apiError?: { message?: string } | null;
  onResend: () => void;
}

const COUNTDOWN_KEY = 'otp_countdown_end_time';
const COUNTDOWN_DURATION = 60;

const getRemainingSeconds = () => {
  if (typeof window === 'undefined') return 0;
  const endTime = sessionStorage.getItem(COUNTDOWN_KEY);
  if (!endTime) return 0;
  const remaining = Math.round((Number(endTime) - Date.now()) / 1000);
  return remaining > 0 ? remaining : 0;
};

const startCountdown = () => {
  if (typeof window === 'undefined') return COUNTDOWN_DURATION;
  const endTime = Date.now() + COUNTDOWN_DURATION * 1000;
  sessionStorage.setItem(COUNTDOWN_KEY, String(endTime));
  return COUNTDOWN_DURATION;
};

export default function RegisterStepTwo({ apiError, onResend }: RegisterStepTwoProps) {
  // State
  const [countdown, setCountdown] = useState(() => {
    if (typeof window === 'undefined') return COUNTDOWN_DURATION;

    const hasStoredCountdown = sessionStorage.getItem(COUNTDOWN_KEY);

    if (!hasStoredCountdown) {
      return startCountdown();
    }

    return getRemainingSeconds();
  });

  // Form Context
  const { control } = useFormContext<RegisterFormValues>();

  // Translations
  const t = useTranslations('register');

  // Countdown Effect
  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown(getRemainingSeconds());
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  // Resend Handler
  const handleResend = () => {
    onResend();
    setCountdown(startCountdown());
  };

  return (
    <>
      <Controller
        name="otp"
        control={control}
        render={({ field, fieldState }) => {
          const invalid = fieldState.invalid || !!apiError;

          return (
            <>
              <OtpInput
                id="register-step-two"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                invalid={invalid}
                errorMessage={
                  fieldState.error?.message
                    ? getErrorMessage(t, fieldState.error.message)
                    : apiError?.message
                }
              />
              <p className="mt-2 text-sm text-ds-text-plain text-end">
                {countdown > 0 ? (
                  t.rich('resend-code-countdown', { countdown })
                ) : (
                  <button
                    type="button"
                    onClick={handleResend}
                    className="px-5 py-3.5 rounded-xl font-medium text-base text-ds-text-plain block ml-auto cursor-pointer"
                  >
                    {t('send-new-code')}
                  </button>
                )}
              </p>
            </>
          );
        }}
      />
    </>
  );
}
