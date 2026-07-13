'use client';

import { useState } from 'react';

import CheckEmailStep from './check-email-step';
import Emailform from './Email-form';

type Step = 'email' | 'check-email';

export default function ForgetPassword() {
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');

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
