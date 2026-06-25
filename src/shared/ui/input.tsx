'use client';
import * as React from 'react';
import { useState } from 'react';
import { Input as InputPrimitive } from '@base-ui/react/input';

import { cn } from '@/shared/lib/utils';
import { Eye, EyeOff, Search, Upload } from 'lucide-react';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  // State to toggle password
  const [showPassword, setShowPassword] = useState(false);

  // Get File Name
  const [fileName, setFileName] = useState<string | null>(null);

  // Condition Password Input
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  // Condition Search Input
  const isSearch = type === 'search';

  // Condition File Input
  const isFile = type === 'file';

  return (
    <div className="relative">
      <InputPrimitive
        type={inputType}
        data-slot="input"
        onChange={(e) => {
          if (isFile) {
            setFileName(e.target.files?.[0]?.name ?? null);
          }
          props.onChange?.(e);
        }}
        className={cn(
          // Base
          'h-12.25 w-full min-w-0 rounded-lg border bg-ds-bg-plain p-4 font-normal text-sm transition-colors outline-none',

          // Arrow
          '[&::-webkit-inner-spin-button]:opacity-100 [&::-webkit-outer-spin-button]:opacity-100',

          // Default
          'border-ds-border-soft text-ds-text-plain placeholder:text-ds-text-muted',

          // Hover
          'hover:border-ds-border-default not-disabled:hover:[box-shadow:var(--ring-default)]',

          // Focus
          'focus-visible:border-ds-border-primary focus-visible:[box-shadow:var(--ring-default)]',

          // Disabled
          'disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-ds-bg-muted disabled:text-ds-text-muted disabled:border-transparent',

          // Invalid
          'not-disabled:aria-invalid:border-ds-border-danger not-disabled:aria-invalid:[box-shadow:var(--ring-danger)]',

          // Invalid Arrow
          'disabled:[&::-webkit-inner-spin-button]:opacity-0 disabled:[&::-webkit-outer-spin-button]:opacity-0',

          // File
          isFile && 'cursor-pointer file:hidden',

          // Search - padding start
          isSearch && 'ps-10',
          className
        )}
        {...props}
      />

      {/* Search Icon */}
      {isSearch && (
        <Search
          size={18}
          strokeWidth={1.5}
          className={cn(
            // Base
            'absolute top-1/2 -translate-y-1/2 inset-s-4 pointer-events-none',

            // Default
            'text-ds-text-muted',

            // Disabled
            props.disabled && 'text-ds-text-muted'
          )}
        />
      )}

      {/* Eye Icon Password */}
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          disabled={props.disabled}
          className={cn(
            // Base
            'absolute top-1/2 -translate-y-1/2 inset-e-4 cursor-pointer',

            // Default
            'text-ds-text-muted',

            // Hover
            'hover:text-ds-text-default',

            // Disabled
            'disabled:pointer-events-none disabled:text-ds-text-muted'
          )}
        >
          {showPassword ? (
            <Eye size={20} strokeWidth={1.5} />
          ) : (
            <EyeOff size={20} strokeWidth={1.5} />
          )}
        </button>
      )}

      {/* Upload file button */}
      {isFile && (
        <div className="absolute inset-y-0 inset-e-4 flex items-center pointer-events-none">
          <span
            className={cn(
              'flex items-center gap-1.5 text-sm font-medium',
              'text-ds-text-primary',
              props.disabled && 'text-ds-text-muted',
              props.disabled && 'dark:text-ds-text-muted'
            )}
          >
            <Upload size={16} strokeWidth={1.5} />
            Upload file
          </span>
        </div>
      )}
    </div>
  );
}

export { Input };
