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
      containerClassName={cn(
        'cn-input-otp flex items-center',
        containerClassName
      )}
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
        'relative flex size-11.25 p-4 items-center justify-center border border-zinc-300 hover:border-zinc-400 font-normal text-base text-zinc-800 transition-all outline-none rounded-lg aria-invalid:border-destructive data-[active=true]:z-10 data-[active=true]:border-marron-600 data-[active=true]:aria-invalid:border-destructive data-[active=true]:aria-invalid:ring-1 data-[active=true]:aria-invalid:ring-red-600 dark:text-zinc-50 dark:bg-zinc-700 dark:border-zinc-600 dark:hover:border-zinc-500 dark:data-[active=true]:border-pink-600 dark:data-[active=true]:aria-invalid:ring-1 dark:data-[active=true]:aria-invalid:ring-red-500 group-data-[disabled=true]:bg-zinc-100 group-data-[disabled=true]:border-transparent group-data-[disabled=true]:text-zinc-400 dark:group-data-[disabled=true]:bg-zinc-800 dark:group-data-[disabled=true]:text-zinc-600 dark:group-data-[disabled=true]:border-zinc-700 dark:group-hover:border-zinc-500',
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
