import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';
import Image from 'next/image';

import gift1 from '@/assets/images/home/about/gift1.png';
import gift2 from '@/assets/images/home/about/gift2.png';
import gift3 from '@/assets/images/home/about/gift3.png';
import SectionSmallTitle from '@/shared/components/section-small-title';

export default function About() {
  // Translation
  const t = useTranslations('home.about');

  // Variables
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const features = [
    t('features.first'),
    t('features.second'),
    t('features.third'),
    t('features.fourth'),
  ];

  return (
    <section className="mx-auto my-12 flex w-11/12 flex-col items-center gap-10 lg:my-20 lg:flex-row lg:items-center lg:gap-16">
      {/* Images */}
      <div className="order-2 flex h-auto w-full justify-center gap-4 lg:order-1 lg:w-1/2">
        {/* Left Image */}
        <div className="relative mx-3 h-64 w-56 sm:h-72 sm:w-64 lg:h-80 lg:w-72">
          <div className="absolute inset-0 rotate-[4deg] rounded-[50px_120px_120px_120px] border-4 border-ds-border-primary" />

          <div className="absolute inset-0 translate-x-6 translate-y-2 overflow-hidden rounded-[50px_120px_120px_120px]">
            <Image src={gift1} alt="Gift Box" fill placeholder="blur" className="object-cover" />
          </div>
        </div>

        {/* Right Images */}
        <div className="flex flex-col gap-2">
          <div className="h-32 w-32 overflow-hidden rounded-full sm:h-40 sm:w-40 lg:h-48 lg:w-48">
            <Image
              src={gift2}
              alt="Gift box"
              placeholder="blur"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="h-24 w-32 overflow-hidden rounded-[50px_100px_100px_50px] sm:h-28 sm:w-40 lg:h-36 lg:w-48">
            <Image
              src={gift3}
              alt="Gift box"
              placeholder="blur"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="order-1 flex-1 text-center lg:order-2 lg:text-start">
        <SectionSmallTitle title={t('label')} />

        <div className="gap-2">
          <h2 className="text-2xl font-bold text-ds-text-primary md:text-3xl">
            {t.rich('title', {
              finest: (chunks) => <span className="text-soft-pink-600">{chunks}</span>,
              special: (chunks) => <span className="text-soft-pink-600">{chunks}</span>,
            })}
          </h2>
        </div>

        <p className="mt-4 text-ds-text-muted dark:text-ds-text-subtle">{t('description')}</p>

        {/* Discover Button */}
        <Link
          href="/products"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-ds-bg-primary px-4 py-2.5 text-sm font-semibold text-ds-text-inverse transition-opacity hover:opacity-90"
        >
          <span>{t('discover')}</span>

          {isRTL ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
        </Link>

        {/* Features */}
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-x-8 lg:gap-y-5">
          {features.map((feature) => (
            <div key={feature} className="flex items-center justify-center gap-3 lg:justify-start">
              <Check className="h-4 w-4 text-soft-pink-600" />

              <span className="text-sm text-ds-text-plain dark:text-ds-text-subtle">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
