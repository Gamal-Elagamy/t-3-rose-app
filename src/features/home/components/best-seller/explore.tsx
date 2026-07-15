import SectionSmallTitle from '@/shared/components/section-small-title';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function Explore() {
  const t = useTranslations('home.bestSeller');
  return (
    <div className="flex justify-between flex-col h-full">
      <div>
        {/* section title */}
        <SectionSmallTitle title={t('bestSelling')} />

        {/* main title */}
        <p className="text-ds-text-secondary font-bold text-2xl mb-2 w-3/4">{t('description')}</p>

        {/* description */}
        <p className="text-ds-text-muted text-base">{t('subDescription')}</p>
      </div>

      <div>
        {/* explore button */}
        <Link
          href="/products"
          className="text-ds-text-inverse bg-ds-bg-primary font-semibold flex items-center gap-2.5 w-fit py-2.5 px-4 rounded-xl"
        >
          {t('exploreButton')} <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
