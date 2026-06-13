import * as React from 'react';
import { Input as InputPrimitive } from '@base-ui/react/input';

import { cn } from '@/shared/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        'h-12.25 w-full min-w-0 rounded-lg border border-zinc-300 hover:border-zinc-400 bg-transparent p-4 font-normal text-sm text-zinc-800 transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-zinc-400 focus-visible:border-marron-600 disabled:bg-zinc-100 disabled:text-zinc-400 disabled:border-0 disabled:pointer-events-none disabled:cursor-not-allowed aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-red-600 md:text-sm dark:text-zinc-50 dark:bg-zinc-700 dark:border-zinc-600 dark:hover:border-zinc-500 dark:focus-visible:border-pink-400 dark:disabled:text-zinc-600 dark:disabled:bg-zinc-800 dark:disabled:border dark:disabled:border-zinc-700 dark:disabled:placeholder:text-zinc-600 dark:aria-invalid:border-red-500 dark:aria-invalid:ring-destructive/40',
        className
      )}
      {...props}
    />
  );
}

export { Input };
