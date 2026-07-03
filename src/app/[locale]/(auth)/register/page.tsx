'use client';
import { FormProvider, useForm } from 'react-hook-form';
import { Button } from '@/shared/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import useRegister from '@/features/auth/register/hooks/use-register';
import { RegisterFormValues } from '@/features/auth/register/lib/types/register';
import { registerSchema } from '@/features/auth/register/lib/schemas/register.schema';
import { Link } from '@/i18n/navigation';
import RegisterStepOne from '@/features/auth/components/register-steps/register-step-one';
import { useState, useEffect } from 'react';
import { MoveRight } from 'lucide-react';
import useRegisterStepOne from '@/features/auth/register/hooks/use-register-step-one';
import RegisterStepTwo from '@/features/auth/components/register-steps/register-step-two';
import useRegisterStepTwo from '@/features/auth/register/hooks/use-register-step-two';
import RegisterStepThree from '@/features/auth/components/register-steps/register-step-three';
import RegisterStepFour from '@/features/auth/components/register-steps/register-step-four';
import Stepper from '@/features/auth/components/register-steps/stepper';

// Step & Email Key
const STEP_KEY = 'register_step';
const EMAIL_KEY = 'register_email';

// Get Stored Step Data
const getStoredStep = () => {
  if (typeof window === 'undefined') return 1;
  const savedStep = sessionStorage.getItem(STEP_KEY);
  const savedEmail = sessionStorage.getItem(EMAIL_KEY);

  const step = savedStep ? Number(savedStep) : 1;

  if (step > 1 && !savedEmail) return 1;

  if (step === 3 || step === 4) {
    sessionStorage.removeItem(STEP_KEY);
    sessionStorage.removeItem(EMAIL_KEY);
    sessionStorage.removeItem('otp_countdown_end_time');
    return 1;
  }

  return step;
};

// Get Stored Email Data
const getStoredEmail = () => {
  if (typeof window === 'undefined') return '';
  return sessionStorage.getItem(EMAIL_KEY) || '';
};

export default function RegisterPage() {
  // State
  const [step, setStep] = useState(getStoredStep);
  const [emailValue, setEmailValue] = useState(getStoredEmail);

  const t = useTranslations('register');

  // Hooks
  // Submit All Fields
  const { error, isPending, registerAPI } = useRegister();

  // Verify Email
  const {
    error: stepOneError,
    isPending: stepOnePending,
    emailVerificationApi,
  } = useRegisterStepOne();

  // Confirm Email Verification
  const {
    error: stepTwoError,
    isPending: stepTwoPending,
    confirmEmailVerificationApi,
  } = useRegisterStepTwo();

  // Error Handling
  const ApiError = error || stepOneError || stepTwoError;

  // Form
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      phone: '',
      otp: '',
      gender: undefined,
      password: '',
      confirmPassword: '',
    },
  });

  // Handel Submit All fields Fun
  const onSubmit = (values: RegisterFormValues) => {
    console.log(values);
    const { email, password, confirmPassword, firstName, lastName, username, gender } = values;
    registerAPI(
      { email, password, confirmPassword, firstName, lastName, username, gender },
      {
        onSuccess: (data) => {
          console.log(data);
          sessionStorage.removeItem(STEP_KEY);
          sessionStorage.removeItem(EMAIL_KEY);
          sessionStorage.removeItem('otp_countdown_end_time');
        },
      }
    );
  };

  // Handel Click Next Button Fun
  const handleClick = async (e: React.FormEvent) => {
    e.preventDefault();
    // Step One: Verify Email
    if (step === 1) {
      const isValid = await form.trigger('email');
      if (!isValid) return;

      if (form.getValues('email')) {
        emailVerificationApi(form.getValues('email'), {
          onSuccess: () => {
            setEmailValue(form.getValues('email'));
            form.setValue('otp', '');
            sessionStorage.removeItem('otp_countdown_end_time');
            setStep((prev) => prev + 1);
          },
        });
      }
    }

    // Step Two: Confim Email Verification
    if (step === 2) {
      const isValid = await form.trigger('otp');
      if (!isValid) return;

      if (emailValue) {
        confirmEmailVerificationApi(
          { email: emailValue, code: form.getValues('otp') },
          {
            onSuccess: () => {
              setStep((prev) => prev + 1);
            },
          }
        );
      }
    }

    // Step Three: Validate Personal Info
    if (step === 3) {
      const isValid = await form.trigger(['firstName', 'lastName', 'username', 'phone', 'gender']);
      if (!isValid) return;

      setStep((prev) => prev + 1);
    }
  };

  // Handel Edit Email Fun
  const handleEditEmail = () => {
    setStep(1);
  };

  // Effect State
  useEffect(() => {
    sessionStorage.setItem(STEP_KEY, String(step));
  }, [step]);

  useEffect(() => {
    if (emailValue) sessionStorage.setItem(EMAIL_KEY, emailValue);
  }, [emailValue]);

  return (
    <div className="mx-auto w-full max-w-xl mt-6">
      <FormProvider {...form}>
        {/* Form */}
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          {/* Step one verify Email */}
          {step === 1 && <RegisterStepOne apiError={stepOneError} />}

          {/* Stepper */}
          {step > 1 && <Stepper currentStep={step} totalSteps={4} />}

          {/* Step Two & Three & Four Confirm Email Header */}
          {step > 1 && step < 5 && (
            <div className="pb-4 border-b border-ds-border-muted mt-9 mb-6">
              {/* Header 1 */}
              <h1 className="font-bold text-3xl text-ds-text-plain mb-4">{t('header.title')}</h1>

              {/* Header 2 */}
              <h2 className="font-semibold text-xl text-ds-text-primary m-0">
                {step === 2 && t('header.title-description-step-2')}
                {step === 3 && t('header.title-description-step-3')}
                {step === 4 && t('header.title-description-step-4')}
              </h2>

              {/* Des */}
              <>
                {step === 2 && (
                  <p className="font-normal text-base text-ds-text-plain m-0">
                    {t.rich('header.description-step-2', {
                      email: emailValue,
                      button: (chunk) => (
                        <button
                          type="button"
                          onClick={handleEditEmail}
                          className="font-medium text-base underline text-blue-700 cursor-pointer"
                        >
                          {chunk}
                        </button>
                      ),
                    })}
                  </p>
                )}
                {step === 3 && (
                  <p className="font-normal text-base text-ds-text-plain m-0">
                    {t('header.description-step-3')}
                  </p>
                )}
                {step === 4 && (
                  <p className="font-normal text-base text-ds-text-plain m-0">
                    {t('header.description-step-4')}
                  </p>
                )}
              </>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <RegisterStepTwo
              apiError={stepTwoError}
              onResend={() => emailVerificationApi(emailValue)}
            />
          )}

          {/* Step 3 */}
          {step === 3 && <RegisterStepThree apiError={stepTwoError} />}

          {/* Step 4 */}
          {step === 4 && <RegisterStepFour apiError={ApiError} />}

          {/* Api Errors */}
          {ApiError && <p className="text-ds-text-danger">{ApiError?.message}</p>}

          {/* Button Submit */}
          <Button
            type="submit"
            isLoading={stepOnePending || stepTwoPending || isPending}
            onClick={(e) => {
              if (step === 1 || step === 2 || step === 3) {
                handleClick(e);
              }
            }}
            variant="default"
            className={'w-full cursor-pointer mt-5'}
          >
            {step === 2 ? t('button.step-2') : t('button.step-1')}
            <MoveRight size={18} />
          </Button>
        </form>
      </FormProvider>

      {/* Navigation Link To login page */}
      {step === 1 && (
        <p className="text-center font-medium text-sm text-ds-text-plain mt-9 pt-5 border-t border-ds-border-muted">
          {t.rich('register-support.step-1', {
            a: (chunk) => (
              <Link href={'/login'} className="font-bold text-ds-text-primary">
                {chunk}
              </Link>
            ),
          })}
        </p>
      )}

      {step > 1 && (
        <p className="text-center font-medium text-sm text-ds-text-plain mt-9 pt-5 border-t border-ds-border-muted">
          {t.rich('register-support.step-2', {
            a: (chunk) => (
              <Link href={'/login'} className="font-bold text-ds-text-primary">
                {chunk}
              </Link>
            ),
          })}
        </p>
      )}
    </div>
  );
}
