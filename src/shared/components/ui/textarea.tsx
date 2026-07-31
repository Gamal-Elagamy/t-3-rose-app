import * as React from 'react';

import { cn } from '@/shared/lib/utils/tailwind-cn';

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        // Base
        'flex field-sizing-content h-37.5 w-full rounded-lg border p-4 outline-none',

        // Default
        'border-ds-border-soft bg-ds-bg-plain text-sm font-normal text-ds-text-plain placeholder:text-ds-text-muted resize-none overflow-y-auto',

        // Hover
        'hover:border-ds-border-default not-disabled:hover:[box-shadow:var(--ring-default)]',

        // Focus
        'focus-visible:border-ds-border-primary focus-visible:[box-shadow:var(--ring-default)]',

        // Disabled
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-ds-bg-muted disabled:text-ds-text-muted disabled:border-transparent',

        // Invalid
        'aria-invalid:not-disabled:border-ds-border-danger aria-invalid:not-disabled:[box-shadow:var(--ring-danger)]',
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
