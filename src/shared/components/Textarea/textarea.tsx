'use client';

import * as React from 'react';

interface TextareaProps {
  label?: string;
  placeholder?: string;
  value?: string;
  maxLength?: number;
  disabled?: boolean;
  error?: string;
  onChange?: (value: string) => void;
}

const Textarea = ({
  label,
  placeholder = 'Placeholder',
  value = '',
  maxLength,
  disabled = false,
  error,
  onChange,
}: TextareaProps) => {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
    onChange?.(e.target.value);
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label
          className={`text-sm font-medium ${
            error ? 'text-destructive' : 'text-foreground'
          }`}
        >
          {label}
        </label>
      )}
      <textarea
        ref={textareaRef}
        placeholder={placeholder}
        value={value}
        maxLength={maxLength}
        disabled={disabled}
        onChange={handleInput}
        rows={3}
        className={`w-full border rounded-md px-3 py-2 text-sm bg-background text-foreground resize-none
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error ? 'border-destructive focus:ring-destructive' : 'border-border'}
        `}
      />
      <div className="flex justify-between items-center">
        {error ? <p className="text-xs text-destructive">{error}</p> : <span />}
        {maxLength && (
          <span className="text-xs text-muted-foreground">
            {value.length}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
};

export default Textarea;
