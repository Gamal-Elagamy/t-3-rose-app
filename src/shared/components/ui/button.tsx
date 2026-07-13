'use client';
import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';

import { LoaderCircle } from 'lucide-react';
import { cn } from '@/shared/lib/utils/tailwind-cn';
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center  justify-center rounded-4xl border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: 'bg-ds-bg-primary text-ds-text-inverse hover:bg-ds-bg-primary-saturated',
        outline:
          'border-ds-border-primary text-ds-text-primary bg-ds-bg-plain hover:bg-ds-bg-primary-fade',
        secondary: 'bg-ds-bg-primary-fade text-ds-text-primary hover:bg-ds-bg-primary-faint',
        ghost: 'bg-ds-bg-plain text-ds-text-plain hover:bg-ds-bg-soft',
        destructive: 'text-ds-text-inverse bg-ds-bg-danger hover:bg-ds-bg-danger-saturated',
        subtle: 'border-ds-border-soft bg-ds-bg-muted text-ds-text-plain hover:bg-ds-bg-soft',
        disabled: 'bg-ds-bg-soft text-ds-text-muted',
        loading: 'bg-ds-bg-soft text-ds-text-muted',
      },
      size: {
        default: 'gap-[10px] px-4 py-[14px] rounded-[var(--radius-lg)]',
        'icon-sm': 'size-7 rounded-[var(--radius-md)]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

interface ButtonProps extends ButtonPrimitive.Props, VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  loadingText?: string;
}

function Button({
  isLoading = false,
  loadingText = 'Loading...',
  children,
  className,
  variant = 'default',
  size = 'default',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      disabled={disabled || isLoading}
      className={cn(
        buttonVariants({
          variant: isLoading ? 'loading' : variant,
          size,
          className,
        })
      )}
      {...props}
    >
      <span className="inline-flex items-center gap-2">
        {isLoading && <LoaderCircle className="animate-spin" />}
        {isLoading ? loadingText : children}
      </span>
    </ButtonPrimitive>
  );
}
export { Button, buttonVariants };
