'use client';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/shared/components/ui/input-otp';
import { Field, FieldLabel } from '@/shared/components/ui/field';
import { REGEXP_ONLY_DIGITS } from 'input-otp';

interface IOtpProps {
  id: string;
  label?: string;
  disabled?: boolean;
}

export function OtpInput({ id, label, disabled }: IOtpProps) {
  return (
    <Field className="w-full max-w-xs" disabled={disabled}>
      {/* Label */}
      <FieldLabel htmlFor={id}>{label}</FieldLabel>

      {/* Otp input */}
      <InputOTP id={id} maxLength={6} disabled={disabled} pattern={REGEXP_ONLY_DIGITS}>
        <InputOTPGroup disabled={disabled}>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </Field>
  );
}
