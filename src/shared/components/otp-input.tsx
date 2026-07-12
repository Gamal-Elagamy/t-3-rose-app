'use client';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/shared/components/ui/input-otp';
import { Field, FieldError } from '@/shared/components/ui/field';
import { REGEXP_ONLY_DIGITS } from 'input-otp';

interface IOtpProps {
  id: string;
  label?: string;
  disabled?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  invalid?: boolean;
  errorMessage?: string;
}

export function OtpInput({
  id,
  disabled,
  value,
  onChange,
  onBlur,
  invalid,
  errorMessage,
}: IOtpProps) {
  return (
    <Field data-invalid={invalid}>
      {/* Otp input */}
      <InputOTP
        id={id}
        maxLength={6}
        disabled={disabled}
        pattern={REGEXP_ONLY_DIGITS}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      >
        <InputOTPGroup disabled={disabled}>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      {invalid && errorMessage && <FieldError errors={[{ message: errorMessage }]} />}
    </Field>
  );
}
