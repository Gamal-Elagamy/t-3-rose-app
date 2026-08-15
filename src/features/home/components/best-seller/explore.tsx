import SectionSmallTitle from '@/shared/components/section-small-title';
import { Link } from '@/i18n/navigation';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

export default function Explore() {
  // Translation
  const t = useTranslations('home.bestSeller');

  // Variables
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        {/* section title */}
        <SectionSmallTitle title={t('bestSelling')} />

        {/* main title */}
        <p className="mb-2 text-xl font-bold text-ds-text-secondary md:text-2xl">
          {t.rich('description', {
            highlight: (chunks) => <span className="text-ds-text-primary">{chunks}</span>,
          })}
        </p>

        <p className="text-sm text-zinc-500 dark:text-zinc-400 md:text-base">
          {t.rich('subDescription', {
            br: () => <br />,
          })}
        </p>
      </div>

      <div>
        {/* explore button */}
        <Link
          href="/products"
          className="mt-3 flex w-full items-center justify-center gap-2.5 rounded-xl bg-ds-bg-primary px-4 py-2.5 font-semibold text-ds-text-inverse outline-none focus-visible:ring-2 focus-visible:ring-ds-bg-primary focus-visible:ring-offset-2 sm:w-auto"
        >
          {t('exploreButton')}

          {isRTL ? (
            <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden="true" />
          ) : (
            <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
          )}
        </Link>
      </div>
    </div>
  );
}
