import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/shared/ui/input-otp';
import { Field, FieldLabel } from '@/shared/ui/field';

interface IOtpProps {
  label?: string;
  disabled?: boolean;
}

export function OtpInput({ label, disabled }: IOtpProps) {
  return (
    <Field
      className="w-full max-w-xs"
      disabled={disabled}
      //  data-invalid
    >
      {/* Label */}
      <FieldLabel htmlFor={label}>{label}</FieldLabel>

      {/* Otp input */}
      <InputOTP id={label} maxLength={6} disabled={disabled}>
        <InputOTPGroup disabled={disabled}>
          <InputOTPSlot
            index={0}
            // aria-invalid
          />
          <InputOTPSlot
            index={1}
            // aria-invalid
          />
          <InputOTPSlot
            index={2}
            // aria-invalid
          />
          <InputOTPSlot
            index={3}
            // aria-invalid
          />
          <InputOTPSlot
            index={4}
            // aria-invalid
          />
          <InputOTPSlot
            index={5}
            // aria-invalid
          />
        </InputOTPGroup>
      </InputOTP>
    </Field>
  );
}
