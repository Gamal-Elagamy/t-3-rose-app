import Image from 'next/image';
import BannerCard from '@/assets/images/banner-home-page/Hero-Section-Banner (1).png';
import { Button } from '@/shared/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/shared/lib/utils/tailwind-cn';
import CarouselCustomDots from './banner-carousel';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function BannerHomePage() {
  // Translations
  const t = useTranslations('home-page.hero-section.banner');

  return (
    <>
      {/* Banner Section */}
      <section className="banner flex h-auto w-full items-center justify-between gap-6.25 mt-10 sm:h-110.25">
        {/* Banner Card */}
        <div className="card relative hidden h-full overflow-hidden rounded-2xl lg:block lg:min-w-75">
          {/* Overlay */}
          <div
            className="overlay absolute top-0 right-0 bottom-0 left-0 bg-black/10"
            aria-hidden="true"
          />

          {/* Image */}
          <Image
            src={BannerCard}
            alt=""
            placeholder="blur"
            width={300}
            height={439}
            className="h-full w-full object-cover"
          />

          {/* Card Info */}
          <div className="info absolute bottom-0 p-6">
            <p className="w-fit rounded-full bg-maroon-50 px-2 py-0.5 text-xs font-medium leading-4 text-maroon-600">
              {t('card-title')}
            </p>

            <h2 className="my-2.5 h-19.5 text-2xl font-semibold text-white">
              {t('card-description')}
            </h2>

            {/* Button */}
            <Link
              href="/products"
              className="outline-none focus-visible:ring-2 focus-visible:ring-ds-bg-primary focus-visible:ring-offset-2"
            >
              <Button
                className={cn(
                  // Default
                  'cursor-pointer py-2.5',

                  // Dark
                  'dark:bg-maroon-50 dark:text-maroon-800 dark:hover:bg-maroon-100'
                )}
                variant="secondary"
              >
                {t('card-button')} <ArrowRight className="rtl:rotate-180" aria-hidden="true" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Banner Carousel */}
        <div className="banner-carousel relative h-auto w-full flex-1 overflow-hidden rounded-2xl md:h-full md:min-w-125">
          {/* Overlay */}
          <div
            className="overlay absolute inset-0 z-10 bg-linear-to-r from-black/80 to-black/0 rtl:bg-linear-to-l"
            aria-hidden="true"
          />

          {/* Carousel */}
          <CarouselCustomDots />

          {/* Carousel Card Info */}
          <div className="info absolute inset-s-9 bottom-9 z-10 flex w-fit flex-col gap-1.5">
            <h1 className="text-4xl font-semibold text-white">{t('carousel-title')}</h1>

            <p className="h-12 text-base font-normal leading-4 text-white">
              {t('carousel-description')}
            </p>

            {/* Button */}
            <Link
              href="/products"
              className="w-fit outline-none focus-visible:ring-2 focus-visible:ring-ds-bg-primary focus-visible:ring-offset-2"
            >
              <Button
                className={cn(
                  // Default
                  'w-fit cursor-pointer py-2.5',

                  // Dark
                  'dark:bg-maroon-50 dark:text-maroon-800 dark:hover:bg-maroon-100'
                )}
                variant="secondary"
              >
                {t('carousel-button')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
