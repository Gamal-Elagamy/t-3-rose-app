'use client';

import { useState } from 'react';

import Emailform from './Email-form';
import CheckEmailStep from './checkemailstep';

type Step = 'email' | 'check-email';

export default function ForgotPassword() {
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
