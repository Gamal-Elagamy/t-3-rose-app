import { ArrowRight, Check } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';
import { Button } from '@/shared/components/ui/button';
import Image from 'next/image';

import gift1 from '@/assets/images/home/about/gift1.png';
import gift2 from '@/assets/images/home/about/gift2.png';
import gift3 from '@/assets/images/home/about/gift3.png';

export default function About() {
  const t = useTranslations('home.about');

  const features = [
    t('features.first'),
    t('features.second'),
    t('features.third'),
    t('features.fourth'),
  ];

  return (
    <section className="mx-auto h my-20 flex w-11/12 items-center gap-16 ">
      {/* Images */}
      <div className="flex h-auto w-1/2 gap-4">
        {/* Left Image */}
        <div className="relative mr-4 h-80 w-72">
          <div className="absolute rotate-[4deg] inset-0 rounded-[50px_120px_120px_120px] border-4 border-ds-border-primary" />

          <div className="absolute inset-0 translate-x-6 translate-y-2 overflow-hidden rounded-[50px_120px_120px_120px]">
            <Image src={gift1} alt="Gift Box" fill className="object-cover" />
          </div>
        </div>

        {/* Right Images */}
        <div className="max-w-48 max-h-48">
          <div className="overflow-hidden max-w-48 max-h-48 rounded-full">
            <Image src={gift2} alt="Gift box" />
          </div>
          <div className="mt-1 h-36 w-48 overflow-hidden rounded-[50px_100px_100px_50px]">
            <Image src={gift3} alt="Gift box" className="h-full w-full object-cover" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 gap-6">
        <p className="mb-3 text-base font-semibold uppercase tracking-[0.2em] text-ds-text-secondary">
          {t('label')}
        </p>

        <div className="gap-2">
          <h2 className="text-3xl font-bold text-ds-text-primary">
            {t.rich('title', {
              finest: (chunks) => <span className="text-soft-pink-600">{chunks}</span>,
              special: (chunks) => <span className="text-soft-pink-600">{chunks}</span>,
            })}
          </h2>
        </div>

        <p className="text-ds-text-muted dark:text-ds-text-subtle">{t('description')}</p>

        <Button className="mt-8 rounded-xl px-4 py-2.5">
          <Link href="/products" className="flex items-center gap-2">
            <span className="text-sm">{t('discover')}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>

        <div className="mt-5 grid grid-cols-2 gap-x-8 gap-y-5">
          {features.map((feature) => (
            <div key={feature} className="flex items-center gap-3">
              <Check className="h-4 w-4 text-soft-pink-600" />

              <span className="text-sm text-ds-text-plain dark:text-ds-text-subtle">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
