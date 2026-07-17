import { useTranslations } from 'next-intl';
import LanguageSwitcher from '@/shared/components/language-switcher';
import { ThemeToggle } from '@/shared/components/theme-toggle';
import Partners from '@/features/home/components/partners';
import Gallery from '@/features/home/components/gallery';
import About from '@/features/home/components/about';
import Testimonials from '@/features/home/components/testimonials';

export default function Home() {
  // Translation
  const t = useTranslations();

  return (
    <>
      <div>
        <LanguageSwitcher />
        <h1 className="text-center text-3xl font-bold text-ds-text-primary">{t('title')}</h1>
        <ThemeToggle />
      </div>
      <section>
        <About />
        <Gallery />
        <Testimonials />
        <Partners />
      </section>
    </>
  );
}
