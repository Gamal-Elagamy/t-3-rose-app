'use client';

import * as React from 'react';
import { Textarea } from '@/shared/components/ui/textarea';
interface TextareaProps {
  label?: string;
  placeholder?: string;
  value?: string;
  maxLength?: number;
  disabled?: boolean;
  error?: string;
  onChange?: (value: string) => void;
}

const TextAreaComponent = ({
  label,
  placeholder = 'Placeholder',
  value = '',
  maxLength,
  disabled = false,
  error,
  onChange,
}: TextareaProps) => {
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e.target.value);
  };
  const ErrorMsg =
    error ||
    (maxLength && value.length > maxLength ? `Max ${maxLength} characters exceeded` : undefined);
  const isError = !!ErrorMsg;

  return (
    <div className="flex flex-col gap-1 w-full max-w-sm ">
      {label && (
        <label
          className={`text-sm font-medium ${isError ? 'text-destructive' : 'text-foreground'}`}
        >
          {label}
        </label>
      )}
      <Textarea
        placeholder={placeholder}
        value={value}
        maxLength={maxLength}
        disabled={disabled}
        onChange={handleInput}
        aria-invalid={isError}
        className="resize-none border rounded"
      />
      <div className="flex justify-between items-center">
        {ErrorMsg ? <p className="text-xs text-destructive">{ErrorMsg}</p> : <span />}
        {maxLength && (
          <span className="text-xs text-muted-foreground">
            {value.length}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
};

export default TextAreaComponent;
