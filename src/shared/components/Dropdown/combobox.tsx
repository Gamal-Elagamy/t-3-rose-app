'use client';
import {
  Combobox as ComboboxShadcn,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
} from '@/shared/components/ui/combobox';
import { useTranslations } from 'next-intl';
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
export function Combobox({
  label,
  value,
  loading = false,
  disabled = false,
  error,
  options,
  onChange,
}: ComboboxProps) {
  const t = useTranslations();
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

      <ComboboxShadcn
        items={options.map((opt) => opt.label)}
        value={value}
        onValueChange={(val) => {
          const match = options.find((opt) => opt.label === val);
          if (match) onChange?.(match.value);
        }}
        disabled={disabled}
      >
        <div>
          <ComboboxTrigger className=" flex items-center gap-2 bg-ds-bg-plain p-2 text-ds-text-default border border-ds-border-default w-full">
            <span className="flex-1 text-start text-sm text-ds-text-muted truncate">
              {value ? options.find((o) => o.value === value)?.label : t('combobox.placeholder')}
            </span>
          </ComboboxTrigger>
        </div>
        <ComboboxContent className=" w-(--anchor-width) min-w-0 shadow-subtle bg-ds-bg-plain border border-ds-border-subtle rounded-md p-2 shadow-soft-lg">
          <ComboboxInput
            placeholder={t('combobox.search')}
            disabled={disabled}
            showTrigger={false}
            showClear={false}
          />
          {loading ? (
            <div className="px-3 py-2 text-xs text-ds-text-muted">{t('combobox.loading')}</div>
          ) : (
            <>
              <ComboboxEmpty className="text-ds-text-muted">
                {t('combobox.noOptions')}
              </ComboboxEmpty>
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
      </ComboboxShadcn>

      {error && <p className="text-xs text-ds-text-danger">{error}</p>}
    </div>
  );
}
export default Combobox;
