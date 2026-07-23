'use client';

// import * as React from 'react';
import { Textarea as TextareaShadcn } from '@/shared/components/ui/textarea';
import { cn } from '@/shared/lib/utils/tailwind-cn';
import { useTranslations } from 'next-intl';
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
  placeholder,
  value = '',
  maxLength,
  disabled = false,
  error,
  onChange,
}: TextareaProps) => {
  const t = useTranslations();
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e.target.value);
  };
  const errorMessage =
    error ||
    (maxLength && value.length > maxLength
      ? t('textarea.maxLengthExceeded', { max: maxLength })
      : undefined);
  const isError = !!errorMessage;

  return (
    <div className="flex flex-col gap-1 w-full min-w-sm ">
      {label && (
        <label
          className={`text-sm font-medium ${
            isError ? 'text-ds-text-danger' : 'text-ds-text-default'
          }`}
        >
          {label}
        </label>
      )}
      <TextareaShadcn
        placeholder={placeholder || t('textarea.placeholder')}
        value={value}
        maxLength={maxLength}
        disabled={disabled}
        onChange={handleInput}
        aria-invalid={isError}
        className={cn(
          'resize-none bg-ds-bg-plain text-ds-text-default',
          'border border-ds-border-default rounded-md',
          'focus:ring-default',
          isError && 'border-ds-border-danger ring-danger'
        )}
      />
      <div className="flex justify-between items-center">
        {errorMessage ? <p className="text-xs text-ds-text-danger">{errorMessage}</p> : <span />}
        {maxLength && (
          <span className="text-xs text-ds-text-muted">
            {t('textarea.charCount', {
              count: value.length,
              max: maxLength,
            })}
          </span>
        )}
      </div>
    </div>
  );
};

export default Textarea;
