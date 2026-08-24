'use client';

import {
  Combobox as ComboboxShadcn,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor,
} from '@/shared/components/ui/combobox';
import { useTranslations } from 'next-intl';

export interface ComboboxOption {
  value: string;
  label: string;
}

interface ComboboxProps {
  label?: string;
  placeholder?: string;
  value?: string;
  loading?: boolean;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  options: ComboboxOption[];
  onChange?: (value: string) => void;
  onSearchChange?: (query: string) => void;
}

function getSelectedLabel(value: string | undefined, options: ComboboxOption[]) {
  if (!value) return undefined;
  return options.find((option) => option.value === value)?.label;
}

export function Combobox({
  label,
  value,
  loading = false,
  disabled = false,
  required = false,
  error,
  options,
  onChange,
  onSearchChange,
}: ComboboxProps) {
  const t = useTranslations();
  const selectedLabel = getSelectedLabel(value, options);

  return (
    <div className="flex w-full flex-col gap-1">
      {label && (
        <label
          className={`text-sm font-medium ${
            error ? 'text-ds-text-danger' : 'text-ds-text-default'
          }`}
        >
          {label}
          {required && <span className="text-ds-text-danger"> *</span>}
        </label>
      )}

      <ComboboxShadcn
        items={options.map((option) => option.label)}
        value={selectedLabel ?? null}
        onValueChange={(labelValue) => {
          const match = options.find((option) => option.label === labelValue);
          if (match) onChange?.(match.value);
        }}
        disabled={disabled}
      >
        <div>
          <ComboboxTrigger
            aria-invalid={!!error}
            className="flex h-12.25 w-full items-center gap-2 rounded-lg border border-ds-border-soft bg-ds-bg-plain p-4 text-ds-text-default hover:border-ds-border-default aria-invalid:border-ds-border-danger"
          >
            <span className="flex-1 truncate text-start text-sm text-ds-text-muted">
              {selectedLabel ?? t('combobox.placeholder')}
            </span>
          </ComboboxTrigger>
        </div>
        <ComboboxContent className="w-(--anchor-width) min-w-0 rounded-md border border-ds-border-subtle bg-ds-bg-plain p-2 shadow-soft-lg">
          <ComboboxInput
            placeholder={t('combobox.search')}
            disabled={disabled}
            showTrigger={false}
            showClear={false}
            onChange={(event) => onSearchChange?.(event.target.value)}
          />
          {loading ? (
            <div className="px-3 py-2 text-xs text-ds-text-muted">{t('combobox.loading')}</div>
          ) : (
            <>
              <ComboboxEmpty className="text-ds-text-muted">{t('combobox.noOptions')}</ComboboxEmpty>
              <ComboboxList>
                {(item) => (
                  <ComboboxItem
                    key={item}
                    value={item}
                    className="cursor-pointer rounded-sm px-3 py-2 text-sm text-ds-text-plain outline-none transition-colors hover:bg-ds-bg-subtle"
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

interface MultiComboboxProps {
  label?: string;
  value?: string[];
  loading?: boolean;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  options: ComboboxOption[];
  onChange?: (value: string[]) => void;
  onSearchChange?: (query: string) => void;
}

export function MultiCombobox({
  label,
  value = [],
  loading = false,
  disabled = false,
  required = false,
  error,
  options,
  onChange,
  onSearchChange,
}: MultiComboboxProps) {
  const t = useTranslations();
  const anchor = useComboboxAnchor();

  const selectedLabels = value
    .map((id) => options.find((option) => option.value === id)?.label)
    .filter((labelValue): labelValue is string => Boolean(labelValue));

  return (
    <div className="flex w-full flex-col gap-1">
      {label && (
        <label
          className={`text-sm font-medium ${
            error ? 'text-ds-text-danger' : 'text-ds-text-default'
          }`}
        >
          {label}
          {required && <span className="text-ds-text-danger"> *</span>}
        </label>
      )}

      <ComboboxShadcn
        multiple
        items={options.map((option) => option.label)}
        value={selectedLabels}
        onValueChange={(labels) => {
          const ids = (labels as string[])
            .map((labelValue) => options.find((option) => option.label === labelValue)?.value)
            .filter((id): id is string => Boolean(id));
          onChange?.(ids);
        }}
        disabled={disabled}
      >
        <ComboboxChips
          ref={anchor}
          aria-invalid={!!error}
          className="min-h-12.25 w-full rounded-lg border border-ds-border-soft bg-ds-bg-plain px-3 py-2 aria-invalid:border-ds-border-danger"
        >
          <ComboboxValue>
            {(values) => (
              <>
                {(values as string[]).map((item) => (
                  <ComboboxChip key={item}>{item}</ComboboxChip>
                ))}
                <ComboboxChipsInput placeholder={t('combobox.placeholder')} />
              </>
            )}
          </ComboboxValue>
        </ComboboxChips>

        <ComboboxContent
          anchor={anchor}
          className="w-(--anchor-width) min-w-0 rounded-md border border-ds-border-subtle bg-ds-bg-plain p-2 shadow-soft-lg"
        >
          <ComboboxInput
            placeholder={t('combobox.search')}
            disabled={disabled}
            showTrigger={false}
            showClear={false}
            onChange={(event) => onSearchChange?.(event.target.value)}
          />
          {loading ? (
            <div className="px-3 py-2 text-xs text-ds-text-muted">{t('combobox.loading')}</div>
          ) : (
            <>
              <ComboboxEmpty className="text-ds-text-muted">{t('combobox.noOptions')}</ComboboxEmpty>
              <ComboboxList>
                {(item) => (
                  <ComboboxItem
                    key={item}
                    value={item}
                    className="cursor-pointer rounded-sm px-3 py-2 text-sm text-ds-text-plain outline-none transition-colors hover:bg-ds-bg-subtle"
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
