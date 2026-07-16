import SectionSmallTitle from '@/shared/components/section-small-title';
import Link from 'next/link';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

export default function Explore() {
  const t = useTranslations('home.bestSeller');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  return (
    <div className="flex justify-between flex-col h-full">
      <div>
        {/* section title */}
        <SectionSmallTitle title={t('bestSelling')} />

        {/* main title */}
        <p className="text-ds-text-secondary font-bold text-2xl w-10/12 mb-2">
          {t.rich('description', {
            highlight: (chunks) => <span className="text-ds-text-primary">{chunks}</span>,
          })}
        </p>

        {/* description */}
        <p className="text-ds-text-muted text-base">
          {t('subDescription')
            .split('<br/>')
            .map((part, index) => (
              <span key={index}>
                {part}
                {index < t('subDescription').split('<br/>').length - 1 && <br />}
              </span>
            ))}
        </p>
      </div>

      <div>
        {/* explore button */}
        <Link
          href="/products"
          className="text-ds-text-inverse bg-ds-bg-primary font-semibold flex items-center gap-2.5 w-fit py-2.5 px-4 rounded-xl"
        >
          {t('exploreButton')}{' '}
          {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
        </Link>
      </div>
    </div>
  );
}
