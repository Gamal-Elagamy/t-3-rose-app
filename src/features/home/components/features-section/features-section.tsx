import { Headset, RefreshCw, ShieldCheck, Truck } from 'lucide-react';
import { cn } from '@/shared/lib/utils/tailwind-cn';
import { useTranslations } from 'next-intl';

// Features Info
const featuresInfo = [
  {
    id: 1,
    key: 'free-delivery',
    icon: <Truck size={40} strokeWidth={1.46} aria-hidden="true" />,
  },
  {
    id: 2,
    key: 'get-refund',
    icon: <RefreshCw size={40} strokeWidth={1.46} aria-hidden="true" />,
  },
  {
    id: 3,
    key: 'safe-payment',
    icon: <ShieldCheck size={40} strokeWidth={1.46} aria-hidden="true" />,
  },
  {
    id: 4,
    key: 'support',
    icon: <Headset size={40} strokeWidth={1.46} aria-hidden="true" />,
  },
];

export default function FeaturesSection() {
  // Translations
  const t = useTranslations('home-page.hero-section.features');

  return (
    <>
      {/* Features Section */}
      <div
        className={cn(
          // Default
          'features grid grid-cols-1 gap-6 mt-10 rounded-2xl bg-ds-bg-primary-fade p-10 md:grid-cols-2 xl:grid-cols-4',

          // Dark
          'dark:bg-ds-bg-plain'
        )}
      >
        {/* Features Item */}
        {featuresInfo.map((feature) => (
          <div key={feature.id} className="item flex items-center justify-center gap-4">
            {/* Features Icon */}
            <div
              className={cn(
                // Default
                'icon rounded-full bg-maroon-600 px-3.5 py-4 text-ds-text-inverse',

                // Dark
                'dark:bg-ds-bg-primary-saturated'
              )}
              aria-hidden="true"
            >
              {feature.icon}
            </div>

            {/* Features Info */}
            <div className="info min-w-39.25">
              {/* Features Title */}
              <h2
                className={cn(
                  // Default
                  'mb-1.25 text-xl font-semibold text-maroon-600',

                  // Dark
                  'dark:text-soft-pink-200'
                )}
              >
                {t(`${feature.key}.title` as Parameters<typeof t>[0])}
              </h2>

              {/* Features Description */}
              <p className="text-sm font-normal text-ds-text-soft">
                {t(`${feature.key}.description` as Parameters<typeof t>[0])}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
