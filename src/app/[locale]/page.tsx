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

      <div className="space-y-6 p-8">
        <h1 className="text-2xl font-bold">Button Variants</h1>

        <div className="flex flex-wrap gap-4">
          <Button variant="default">Default</Button>
          <Button disabled variant="secondary">
            Secondary
          </Button>
          <Button disabled variant="outline">
            Outline
          </Button>
          <Button disabled variant="ghost">
            Ghost
          </Button>
          <Button disabled variant="destructive">
            Destructive
          </Button>
          <Button variant="subtle">Subtle</Button>
        </div>
      </div>
      <div className="flex gap-3 p-6">
        <Badge>Default</Badge>

        <Badge variant="secondary">Secondary</Badge>

        <Badge variant="subtle">Subtle</Badge>
      </div>
      <div className="p-6 flex flex-col gap-4">
        {/* Controlled */}

        {/* Default */}
        <div className="flex items-center gap-3">
          <Checkbox />
          <span>Default</span>
        </div>

        {/* Checked */}
        <div className="flex items-center gap-3">
          <Checkbox status="checked" />
          <span>Checked</span>
        </div>

        {/* Error */}
        <div className="flex items-center gap-3">
          <Checkbox status="error" />
          <span>Error</span>
        </div>

        {/* Focus (design system state) */}
        <div className="flex items-center gap-3">
          <Checkbox status="focused" />
          <span>Focused</span>
        </div>
      </div>

      <ThemeToggle />
    </div>
  );
}
