import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all select-none disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/80',

        outline:
          'border border-border bg-background text-foreground hover:bg-muted',

        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',

        ghost: 'text-foreground hover:bg-muted',

        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/80',

        link: 'text-primary underline underline-offset-4',
      },

      size: {
        default:
          'h-11 min-w-[181px] rounded-[10px] px-4 gap-2.5 text-sm font-medium',
      },
    },

    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);
export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
