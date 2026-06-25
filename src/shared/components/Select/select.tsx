'use client';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
} from '@/shared/components/ui/select';
import { cn } from '@/shared/lib/utils';
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

const SelectComponent = ({
  label,
  placeholder = 'Select an option',
  options,
  value = '',
  required = false,
  disabled = false,
  error,
  onChange,
}: SelectProps) => {
  const isError = error || (required && !value);
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label
          className={`text-sm font-medium ${isError ? 'text-ds-text-danger' : 'text-ds-text-default'}`}
        >
          {label}
        </label>
      )}

      <Select
        value={value}
        onValueChange={(val) => {
          if (val !== null) onChange?.(val);
        }}
        disabled={disabled}
      >
        <SelectTrigger
          className={cn(
            'w-full bg-ds-bg-plain text-ds-text-default border border-ds-border-default',
            'focus:ring-default',
            isError && 'border-ds-border-danger ring-danger'
          )}
          aria-invalid={isError ? true : undefined}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((item) => (
              <SelectItem
                key={item.value}
                value={item.value}
                className="cursor-pointer rounded-sm px-3 py-2 text-sm text-ds-text-plain hover:bg-ds-bg-subtle outline-none transition-colors"
              >
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {isError && (
        <p className="text-sm text-ds-text-danger">{error || 'This field is required'}</p>
      )}
    </div>
  );
};

export default SelectComponent;
