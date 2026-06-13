'use client';
import { Field, FieldLabel, FieldSet } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

// Interface
interface IPasswordInputProps {
  label: string;
  disabled?: boolean;
}

export function PasswordInput({ label, disabled }: IPasswordInputProps) {
  // State to toggle password
  const [showPassword, setShowPassword] = useState(false);
  return (
    <FieldSet className="w-full max-w-xs">
      {/* Field */}
      <Field>
        {/* Label */}
        <FieldLabel
          htmlFor={label}
          className={`font-medium text-sm  ${disabled ? 'text-zinc-400 dark:text-zinc-600' : 'text-zinc-800 dark:text-zinc-50'} `}
        >
          {label}
        </FieldLabel>

        {/* Input div */}
        <div className="relative">
          {/* Password Input */}
          <Input
            id={label}
            type={showPassword ? 'text' : 'password'}
            placeholder="********"
            disabled={disabled}
          />

          {/* Eye Icon Button */}
          <button
            type="button"
            disabled={disabled}
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute top-1/2 -translate-y-1/2 right-4 text-zinc-400 disabled:text-zinc-400 cursor-pointer disabled:pointer-events-none"
          >
            {showPassword ? (
              <Eye size={20} strokeWidth={1.5} />
            ) : (
              <EyeOff size={20} strokeWidth={1.5} />
            )}
          </button>
        </div>
      </Field>
    </FieldSet>
  );
}
