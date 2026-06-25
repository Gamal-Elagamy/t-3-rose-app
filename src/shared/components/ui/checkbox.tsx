'use client';

import { Checkbox as CheckboxPrimitive } from '@base-ui/react/checkbox';
import { CheckIcon } from '@phosphor-icons/react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/lib/utils';

const checkboxVariants = cva(
  [
    'peer relative flex size-5 shrink-0 items-center justify-center',
    'rounded-sm border transition-colors outline-none',
  ],
  {
    variants: {
      status: {
        default: ['bg-white', 'border-primary'],

        checked: ['bg-primary', 'border-primary', 'text-white'],

        focused: [
          'bg-white',
          'border-primary',
          'ring-[3px]',
          'ring-primary/40',
        ],

        error: ['bg-white', 'border-destructive'],
      },
    },

    defaultVariants: {
      status: 'default',
    },
  }
);

type CheckboxProps = CheckboxPrimitive.Root.Props &
  VariantProps<typeof checkboxVariants>;

function Checkbox({ className, status = 'default', ...props }: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      checked={status === 'checked' ? true : props.checked}
      className={cn(
        checkboxVariants({ status }),

        'focus-visible:border-primary',
        'focus-visible:ring-[3px]',
        'focus-visible:ring-primary/40',

        'disabled:cursor-not-allowed',
        'disabled:opacity-50',

        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center [&>svg]:size-3"
      >
        <CheckIcon weight="bold" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
