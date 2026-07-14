import { useTranslations } from 'next-intl';
import LanguageSwitcher from '@/shared/components/language-switcher';
import { ThemeToggle } from '@/shared/components/theme-toggle';
import BannerHomePage from '@/features/home/components/hero-section/banner-section/banner-section';
import OccasionsSection from '@/features/home/components/hero-section/occasions-section/occasions-section';
import FeaturesSection from '@/features/home/components/features-section/features-section';

export default function Home() {
  // Translation
  const t = useTranslations();

  return (
    <div>
      <LanguageSwitcher />
      <h1 className="text-center text-3xl font-bold text-ds-text-primary">{t('title')}</h1>
      <ThemeToggle />

      <div className="hero-section px-20">
        <BannerHomePage />
        <OccasionsSection />
        <FeaturesSection />
      </div>
    </div>
  );
}
