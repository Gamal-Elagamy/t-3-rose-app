'use client';

import { useEffect, useState } from 'react';

import Emailform from './Email-form';
import CheckEmailStep from './checkemailstep';

type Step = 'email' | 'check-email';

export default function ForgotPassword() {
  const [step, setStep] = useState<Step>(() => {
    if (typeof window === 'undefined') return 'email';

    return (localStorage.getItem('forgot-password-step') as Step | null) ?? 'email';
  });

  const [email, setEmail] = useState(() => {
    if (typeof window === 'undefined') return '';

    return localStorage.getItem('forgot-password-email') ?? '';
  });

  useEffect(() => {
    localStorage.setItem('forgot-password-step', step);
  }, [step]);

  useEffect(() => {
    if (email) {
      localStorage.setItem('forgot-password-email', email);
    }
  }, [email]);

  const handleSuccess = () => {
    setStep('check-email');
  };

  const handleBack = () => {
    setStep('email');
  };

  return (
    <div>
      {step === 'email' && <Emailform setEmail={setEmail} onSuccess={handleSuccess} />}

      {step === 'check-email' && <CheckEmailStep email={email} onBack={handleBack} />}
    </div>
  );
}
