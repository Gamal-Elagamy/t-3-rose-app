'use client';

import * as React from 'react';

import { cn } from '@/shared/lib/utils';

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from '@/shared/components/ui/combobox';

interface ComboboxOption {
  value: string;
  label: string;
}
interface ComboboxProps {
  label?: string;
  placeholder?: string;
  value?: string;
  loading?: boolean;
  disabled?: boolean;
  error?: string;
  options: ComboboxOption[];
  onChange?: (value: string) => void;
}
export function MyCombobox({
  label,
  placeholder = 'Select an option',
  value,
  loading = false,
  disabled = false,
  error,
  options,
  onChange,
}: ComboboxProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label
          className={`text-sm font-medium ${
            error ? 'text-ds-text-danger' : 'text-ds-text-default'
          }`}
        >
          {label}
        </label>
      )}

      <Combobox
        items={options.map((opt) => opt.label)}
        value={value}
        onValueChange={(val) => {
          const match = options.find((opt) => opt.label === val);
          if (match) onChange?.(match.value);
        }}
        disabled={disabled}
      >
        <ComboboxInput
          placeholder={placeholder}
          disabled={disabled}
          showTrigger
          showClear={!!value}
          aria-invalid={!!error}
          className={cn(
            'bg-ds-bg-plain text-ds-text-default border border-ds-border-default',
            'focus:ring-default',
            error && 'border-ds-border-danger ring-danger'
          )}
        />
        <ComboboxTrigger className="w-full">
          <ComboboxValue placeholder={placeholder} />
        </ComboboxTrigger>

        <ComboboxContent className="bg-ds-bg-plain border border-ds-border-subtle rounded-md shadow-soft-lg p-1">
          <ComboboxInput
            placeholder="Search..."
            disabled={disabled}
            showTrigger={false}
            showClear={false}
          />
          {loading ? (
            <div className="px-3 py-2 text-xs text-ds-text-muted">Loading...</div>
          ) : (
            <>
              <ComboboxEmpty className="text-ds-text-muted">No options found.</ComboboxEmpty>
              <ComboboxList>
                {(item) => (
                  <ComboboxItem
                    key={item}
                    value={item}
                    className="cursor-pointer rounded-sm px-3 py-2 text-sm text-ds-text-plain hover:bg-ds-bg-subtle outline-none transition-colors"
                  >
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </>
          )}
        </ComboboxContent>
      </Combobox>

      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
export default MyCombobox;
