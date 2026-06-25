import { useTranslations } from 'next-intl';
import LanguageSwitcher from '@/shared/components/language-switcher';
import { ThemeToggle } from '@/shared/components/theme-toggle';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import { Checkbox } from '@/shared/components/ui/checkbox';

export default function Home() {
  // Translation
  const t = useTranslations();

  return (
    <div>
      <LanguageSwitcher />
      <h1 className="text-center text-3xl font-bold text-ds-text-primary">{t('title')}</h1>
      <ThemeToggle />
    </div>
  );
}
