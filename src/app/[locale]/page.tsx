import { useTranslations } from 'next-intl';
import LanguageSwitcher from '@/shared/components/language-switcher';
import { ThemeToggle } from '@/shared/components/theme-toggle';

import { Field, FieldLabel } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';
import { OtpInput } from '@/shared/components/otp-input';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { PhoneInput } from '@/shared/ui/phone';

const items = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Blueberry', value: 'blueberry' },
];

export default function Home() {
  // Translation
  const t = useTranslations();

  return (
    <div>
      <LanguageSwitcher />
      <h1 className="text-center text-3xl font-bold text-ds-text-primary">{t('title')}</h1>

      <ThemeToggle />

      {/* Text Field */}
      <Field className="w-xs" data-invalid={false}>
        <FieldLabel htmlFor="first-name">First Name</FieldLabel>
        <Input id="first-name" placeholder="Text" aria-invalid={false} type="text" />
      </Field>

      {/* Search Field */}
      <Field className="w-xs" data-invalid={true}>
        <FieldLabel htmlFor="search-input">Search</FieldLabel>
        <Input id="search-input" placeholder="Search ..." aria-invalid={true} type="search" />
      </Field>

      {/* Number Field */}
      <Field className="w-xs" data-invalid={true}>
        <FieldLabel htmlFor="number-input">Age</FieldLabel>
        <Input id="number-input" placeholder="Age ..." aria-invalid={true} type="number" />
      </Field>

      {/* File Field */}
      <Field className="w-xs" data-invalid={false} disabled>
        <FieldLabel htmlFor="file-input">File</FieldLabel>
        <Input id="file-input" placeholder="file ..." aria-invalid={false} disabled type="file" />
      </Field>

      {/* Phone Input */}
      <Field disabled={false} data-invalid={false}>
        <FieldLabel htmlFor="phone-input">Phone Number</FieldLabel>
        <PhoneInput
          defaultCountry="EG"
          // value={phone}
          placeholder="Phone number"
          // disabled
          aria-invalid={false}
          // onChange={(value) => {
          //   console.log('Phone:', value);
          //   setPhone(value);
          // }}
        />
      </Field>

      {/* OTP Input */}
      <OtpInput label="OTP" disabled={false} />

      {/* Password Field */}
      <Field className="w-xs" data-invalid={false}>
        <FieldLabel htmlFor="password-input">Password</FieldLabel>
        <Input
          id="password-input"
          placeholder="Password ..."
          aria-invalid={false}
          type="password"
        />
      </Field>

      {/* Select */}
      <Field className="w-xs" data-invalid={false}>
        <FieldLabel htmlFor="select-input">Select</FieldLabel>
        <Select items={items}>
          <SelectTrigger id="select-input" className="w-full max-w-66.75">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {items.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
    </div>
  );
}
