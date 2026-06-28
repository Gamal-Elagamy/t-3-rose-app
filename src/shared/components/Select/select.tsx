'use client';
import {
  Select as SelectShadcn,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
} from '@/shared/components/ui/select';
import { cn } from '@/shared/lib/utils/tailwind-cn';
import { useTranslations } from 'next-intl';

interface SelectProps {
  label?: string;
  placeholder?: string;
  options: { value: string; label: string }[];
  value?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  onChange?: (value: string) => void;
}

const Select = ({
  label,
  placeholder = '',
  options,
  value,
  required = false,
  disabled = false,
  error,
  onChange,
}: SelectProps) => {
  const isError = error || (required && !value);
  const t = useTranslations();
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label
          className={`text-sm font-medium ${isError ? 'text-ds-text-danger' : 'text-ds-text-default'}`}
        >
          {label}
        </label>
      )}

      <SelectShadcn
        value={value || undefined}
        onValueChange={(val) => {
          if (val !== null) onChange?.(val);
        }}
        disabled={disabled}
      >
        <SelectTrigger
          className={cn(
            'w-full h-12 px-4 bg-ds-bg-plain text-ds-text-plain border border-ds-border-soft text-start rounded-xl transition-all',
            'focus:ring-default focus:border-ds-border-default',
            isError && 'border-ds-border-danger ring-danger'
          )}
          aria-invalid={isError ? true : undefined}
        >
          <SelectValue placeholder={t('select.placeholder')} />
        </SelectTrigger>
        <SelectContent
          className={cn(
            'w-(--anchor-width) rounded-xl shadow-subtle overflow-hidden p-0 mt-1',
            'bg-ds-bg-plain border-ds-border-soft'
          )}
        >
          <SelectGroup>
            {options.map((item) => (
              <SelectItem
                key={item.value}
                value={item.value}
                className={cn(
                  ' text-start cursor-pointer outline-none  rounded-sm px-3 py-2 text-sm text-ds-text-plain hover:bg-ds-bg-subtle  transition-colors',
                  'focus:bg-ds-bg-subtle focus:text-ds-text-plain',
                  'hover:bg-ds-bg-subtle'
                )}
              >
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </SelectShadcn>
      {isError && <p className="text-sm text-ds-text-danger">{error || t('select.required')}</p>}
    </div>
  );
};

export default Select;
