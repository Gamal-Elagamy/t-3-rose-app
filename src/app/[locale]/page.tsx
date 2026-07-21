import { Suspense } from 'react';
import { useTranslations } from 'next-intl';

import LanguageSwitcher from '@/shared/components/language-switcher';
import { ThemeToggle } from '@/shared/components/theme-toggle';

import About from '@/features/home/components/about';
import Gallery from '@/features/home/components/gallery';
import Partners from '@/features/home/components/partners';
import TestimonialsSection from '@/features/home/components/testimonials-section';
import TestimonialsSectionSkeleton from '@/features/home/components/skeletons/testimonials-section-skeleton';

export default function Home() {
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

        <Suspense fallback={<TestimonialsSectionSkeleton />}>
          <TestimonialsSection />
        </Suspense>

        <Partners />
      </section>
    </>
  );
}
