import { ThemeToggle } from '@/shared/components/theme-toggle';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations();

  return (
    <div className=" bg-background">
      <h1 className="text-3xl font-bold underline text-center text-primary">
        {t('HomePage.title')}
        {t('HomePage.welcome')}
      </h1>

      <ThemeToggle />
    </div>
  );
}
