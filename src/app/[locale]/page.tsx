import { ThemeToggle } from '@/shared/components/theme-toggle';
import { useTranslations } from 'next-intl';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Badge } from '@/shared/components/ui/badge';
export default function Home() {
  const t = useTranslations();

  return (
    <div className=" bg-background">
      <h1 className="text-3xl font-bold underline text-center text-primary">
        {t('HomePage.title')}
        {t('HomePage.welcome')}
      </h1>
      <div className="flex ms-1 flex-col gap-6">
        <Checkbox status="default" />

        <Checkbox status="checked" />

        <Checkbox status="focused" />

        <Checkbox status="error" />
      </div>
      <div className="flex m-2 gap-2">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="Subtle">subtle</Badge>
      </div>
      <ThemeToggle />
    </div>
  );
}
