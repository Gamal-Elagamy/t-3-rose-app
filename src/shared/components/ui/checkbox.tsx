'use client';

import { Checkbox as CheckboxPrimitive } from '@base-ui/react/checkbox';
import { Check } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/lib/utils';

const checkboxVariants = cva(
  [
    'peer relative flex size-5 shrink-0 items-center justify-center',
    'rounded-sm border transition-colors outline-none',

    'data-[checked]:bg-ds-bg-primary',
    'data-[checked]:border-ds-border-primary',
    'data-[checked]:text-ds-text-inverse',
  ],
  {
    variants: {
      status: {
        default: ['bg-ds-bg-plain', 'border-ds-border-primary'],

        focused: ['bg-ds-bg-plain', 'border-ds-border-primary', 'ring-default', 'ring-default'],

        error: ['bg-ds-bg-plain', 'border-ds-border-danger'],
      },
    },

    defaultVariants: {
      status: 'default',
    },
  }
);

type CheckboxProps = CheckboxPrimitive.Root.Props & VariantProps<typeof checkboxVariants>;

function Checkbox({ className, status = 'default', ...props }: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        checkboxVariants({ status }),

        'focus-visible:border-primary',
        'focus-visible:ring-[3px]',
        'focus-visible:ring-primary/40',
        'focus:border-primary',
        'focus:ring-[3px]',
        'focus:ring-primary/40',

        'disabled:cursor-not-allowed',
        'disabled:opacity-50',
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center"
      >
        <Check className="size-3" strokeWidth={3} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
