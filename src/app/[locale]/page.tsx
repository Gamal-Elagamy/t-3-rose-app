import { useTranslations } from 'next-intl';
import LanguageSwitcher from '@/shared/components/language-switcher';
import { ThemeToggle } from '@/shared/components/theme-toggle';

import { Field, FieldLabel } from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';

export default function Home() {
  // Translation
  const t = useTranslations();

  return (
    <div>
      <LanguageSwitcher />
      <h1 className="text-center text-3xl font-bold text-ds-text-primary">{t('title')}</h1>
      <ThemeToggle />

      {/* File Field */}
      <Field className="w-xs" data-invalid={false}>
        <FieldLabel htmlFor="file-input">File</FieldLabel>
        <Input id="file-input" placeholder="file ..." aria-invalid={false} type="file" />
      </Field>
    </div>
  );
}
