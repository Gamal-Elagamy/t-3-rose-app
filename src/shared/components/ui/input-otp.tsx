'use client';

import * as React from 'react';
import { OTPInput, OTPInputContext } from 'input-otp';

import { cn } from '@/shared/lib/utils';
import { MinusIcon } from 'lucide-react';

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string;
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn('cn-input-otp flex items-center', containerClassName)}
      spellCheck={false}
      className={cn('disabled:pointer-events-none', className)}
      {...props}
    />
  );
}

function InputOTPGroup({
  className,
  disabled,
  ...props
}: React.ComponentProps<'div'> & { disabled?: boolean }) {
  return (
    <div
      data-slot="input-otp-group"
      data-disabled={disabled}
      className={cn('group flex items-center gap-2.5', className)}
      {...props}
    />
  );
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<'div'> & {
  index: number;
}) {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        // Base
        'relative flex size-11.25 items-center justify-center bg-ds-bg-plain rounded-lg border p-4 text-base font-normal outline-none transition-all',

        // Default
        'border-ds-border-soft text-ds-text-plain',

        // Hover
        'hover:border-ds-border-default not-disabled:hover:[box-shadow:var(--ring-default)]',

        // Active
        'data-[active=true]:z-10 data-[active=true]:border-ds-border-primary data-[active=true]:[box-shadow:var(--ring-default)]',

        // Disabled
        'group-data-[disabled=true]:border-transparent group-data-[disabled=true]:bg-ds-bg-muted group-data-[disabled=true]:text-ds-text-muted',

        // Invalid from Field
        'not-group-data-[disabled=true]/field:group-data-[invalid=true]/field:border-ds-border-danger',

        // Active + Invalid from Field
        'data-[active=true]:not-group-data-[disabled=true]/field:group-data-[invalid=true]/field:border-ds-border-danger',
        'data-[active=true]:not-group-data-[disabled=true]/field:group-data-[invalid=true]/field:ring-1',
        'data-[active=true]:not-group-data-[disabled=true]/field:group-data-[invalid=true]/field:ring-ds-border-danger',
        'data-[active=true]:not-group-data-[disabled=true]/field:group-data-[invalid=true]/field:[box-shadow:var(--ring-danger)]',

        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  );
}

function InputOTPSeparator({ ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="input-otp-separator"
      className="flex items-center [&_svg:not([class*='size-'])]:size-4"
      role="separator"
      {...props}
    >
      <MinusIcon />
    </div>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
