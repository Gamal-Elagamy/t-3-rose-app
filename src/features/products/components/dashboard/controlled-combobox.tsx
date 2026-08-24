'use client';

import { Controller } from 'react-hook-form';
import { Combobox } from '@/shared/components/Dropdown/combobox';
import { useTranslations } from 'next-intl';
import { getErrorMessage } from '../../schemas/product.schema';

interface ControlledComboboxProps {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  label: string;
  required?: boolean;
  data: { id: string; title: string }[];
  product?: {
    category?: { id: string; title: string };
    occasions?: { id: string; title: string }[];
  };
  onSearchChange: (value: string) => void;
  loading?: boolean;
  fallbackOption?: (
    selectedValue: string,
    product?: {
      category?: { id: string; title: string };
      occasions?: { id: string; title: string }[];
    }
  ) => { value: string; label: string } | null;
}

export function ControlledCombobox({
  name,
  control,
  label,
  required,
  data,
  product,
  onSearchChange,
  loading,
  fallbackOption,
}: ControlledComboboxProps) {
  const t = useTranslations('dashboard.products');
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const options = data.map((item) => ({
          value: item.id,
          label: item.title,
        }));

        const fieldValue = field.value as string | undefined;

        if (fieldValue && fallbackOption) {
          const fallback = fallbackOption(fieldValue, product);
          if (fallback && !options.some((option) => option.value === fieldValue)) {
            options.unshift(fallback);
          }
        }

        return (
          <Combobox
            label={label}
            required={required}
            options={options}
            value={fieldValue}
            onChange={field.onChange}
            onSearchChange={onSearchChange}
            loading={loading}
            error={
              fieldState.error?.message
                ? getErrorMessage(t, fieldState.error.message)
                : fieldState.error?.message
            }
          />
        );
      }}
    />
  );
}
