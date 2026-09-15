'use client';
import * as React from 'react';
import * as RPNInput from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';
import { CheckIcon, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/shared/lib/utils/tailwind-cn';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/shared/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';
import { ScrollArea } from '@/shared/components/ui/scroll-area';
import { useLocale } from 'next-intl';

// Phone Props Type
type PhoneInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> &
  Omit<RPNInput.Props<typeof RPNInput.default>, 'onChange'> & {
    onChange?: (value: RPNInput.Value) => void;
  };

// Phone Input Fun
const PhoneInput = React.forwardRef<React.ElementRef<typeof RPNInput.default>, PhoneInputProps>(
  ({ className, onChange, disabled, ...props }, ref) => {
    const locale = useLocale();
    return (
      <div className="flex flex-col gap-1.5" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
        {/* RPNInput */}
        <RPNInput.default
          // dir={locale === 'ar' ? 'rtl' : 'ltr'}
          ref={ref}
          disabled={disabled}
          defaultCountry="EG"
          international={false}
          countrySelectComponent={CountrySelect}
          flagComponent={FlagComponent}
          inputComponent={InputComponent}
          className={cn(
            // Base
            'flex h-14 w-full overflow-hidden border rounded-lg bg-ds-bg-plain text-sm',

            // Default
            'border-ds-border-soft text-ds-text-plain placeholder:text-ds-text-muted',

            // Hover
            'not-group-data-[disabled=true]/field:not-group-data-[invalid=true]/field:hover:border-ds-border-default',
            'not-group-data-[disabled=true]/field:not-group-data-[invalid=true]/field:hover:[box-shadow:var(--ring-default)]',

            // Disabled
            'group-data-[disabled=true]/field:border-transparent group-data-[disabled=true]/field:bg-ds-bg-muted',

            // Invalid
            'not-group-data-[disabled=true]/field:group-data-[invalid=true]/field:border-ds-border-danger',
            'not-group-data-[disabled=true]/field:group-data-[invalid=true]/field:[box-shadow:var(--ring-danger)]',

            // Focus
            'not-group-data-[invalid=true]/field:focus-within:border-ds-border-primary',
            'not-group-data-[invalid=true]/field:focus-within:[box-shadow:var(--ring-default)]',

            className
          )}
          onChange={(value) => onChange?.(value || '')}
          {...props}
        />
      </div>
    );
  }
);

PhoneInput.displayName = 'PhoneInput';

const InputComponent = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      dir="ltr"
      className={cn(
        // Base
        'h-full w-full bg-ds-bg-plain border-0 pe-4 text-sm font-normal rtl:text-end',

        // Default
        'text-ds-text-plain placeholder:text-ds-text-muted',

        // Focus
        'focus:outline-none',

        // Disabled
        'disabled:bg-ds-bg-muted disabled:text-ds-text-muted disabled:border-transparent',
        className
      )}
      {...props}
    />
  );
});

InputComponent.displayName = 'InputComponent';

type CountrySelectOption = {
  label: string;
  value: RPNInput.Country;
};

type CountrySelectProps = {
  disabled?: boolean;
  value: RPNInput.Country;
  onChange: (value: RPNInput.Country) => void;
  options: CountrySelectOption[];
};

const CountrySelect = ({ disabled, value, onChange, options }: CountrySelectProps) => {
  const handleSelect = React.useCallback(
    (country: RPNInput.Country) => {
      onChange(country);
    },
    [onChange]
  );

  return (
    <Popover>
      <PopoverTrigger
        disabled={disabled}
        className={cn(
          // Base
          'flex items-center gap-2 ps-4 pe-2 shrink-0',

          // Default
          'bg-background text-ds-text-plain outline-none',

          // Disabled
          'disabled:bg-ds-bg-muted disabled:border-transparent'
        )}
      >
        <FlagComponent
          country={value}
          countryName={value}
          className={disabled ? 'opacity-50' : ''}
        />

        <span
          className={cn(
            // Base
            'text-sm font-medium',

            // Disabled
            disabled ? 'text-ds-text-muted' : 'text-ds-text-plain'
          )}
        >
          {value}
          {value && (
            <span className={cn(disabled ? 'text-ds-text-muted' : 'text-ds-text-plain')}>
              (+{RPNInput.getCountryCallingCode(value)})
            </span>
          )}
        </span>

        {!disabled && <ChevronsUpDown className="h-4 w-4 text-ds-text-plain" />}
      </PopoverTrigger>

      <PopoverContent align="start" className="w-[320px] p-0 bg-ds-bg-plain">
        <Command>
          <CommandInput placeholder="Search country..." />

          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>

            <ScrollArea className="h-72">
              <CommandGroup>
                {options
                  .filter((option) => option.value)
                  .map((option) => (
                    <CommandItem
                      key={option.value}
                      onSelect={() => handleSelect(option.value)}
                      className="gap-3 cursor-pointer hover:bg-ds-bg-primary hover:text-ds-text-inverse"
                    >
                      <FlagComponent country={option.value} countryName={option.label} />

                      <span className="flex-1">{option.label}</span>

                      <span className="text-xs text-muted-foreground">
                        +{RPNInput.getCountryCallingCode(option.value)}
                      </span>

                      <CheckIcon
                        className={cn(
                          'h-4 w-4',
                          option.value === value ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                    </CommandItem>
                  ))}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

const FlagComponent = ({
  country,
  countryName,
  className,
}: RPNInput.FlagProps & {
  className?: string;
}) => {
  const Flag = flags[country];

  return (
    <span className={cn('flex h-5 w-5 shrink-0 overflow-hidden rounded-full', className)}>
      {Flag && <Flag title={countryName} />}
    </span>
  );
};

FlagComponent.displayName = 'FlagComponent';

export { PhoneInput };
