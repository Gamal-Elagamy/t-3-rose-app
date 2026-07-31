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
      <div className="banner h-auto sm:h-110.25 w-full flex items-center justify-between gap-6.25 mt-10">
        {/* Banner Card */}
        <div className="card hidden lg:block lg:min-w-75 h-full relative rounded-2xl overflow-hidden">
          {/* Overlay */}
          <div className="overlay absolute top-0 bottom-0 left-0 right-0 bg-black/10"></div>

          {/* Image */}
          <Image
            src={BannerCard}
            alt="banner-card"
            placeholder="blur"
            width={300}
            height={439}
            className="w-full h-full object-cover"
          />

          {/* Card Info */}
          <div className="info p-6 absolute bottom-0">
            <h3 className="w-fit font-medium text-xs leading-4 text-maroon-600 py-0.5 px-2 bg-maroon-50 rounded-full">
              {t('card-title')}
            </h3>
            <h1 className="h-19.5 font-semibold text-2xl text-white my-2.5">
              {t('card-description')}
            </h1>

            {/* Button */}
            <Link href={'/products'}>
              <Button
                className={cn(
                  // Default
                  'py-2.5 cursor-pointer',

                  // Dark
                  'dark:bg-maroon-50 dark:text-maroon-800 dark:hover:bg-maroon-100'
                )}
                variant={'secondary'}
              >
                {t('card-button')} <ArrowRight className="rtl:rotate-180" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Banner Carousel */}
        <div className="banner-carousel relative flex-1 w-full md:min-w-125 h-auto md:h-full rounded-2xl overflow-hidden">
          {/* Overlay */}
          <div className="overlay absolute inset-0 z-10 bg-linear-to-r rtl:bg-linear-to-l from-black/80 to-black/0"></div>

          {/* Carousel */}
          <CarouselCustomDots />

          {/* Carousel Card Info */}
          <div className="info w-fit absolute flex flex-col gap-1.5 bottom-9 inset-s-9 z-10">
            <h1 className="font-semibold text-4xl text-white">{t('carousel-title')}</h1>

            <h3 className="font-normal text-base leading-4 text-white h-12">
              {t('carousel-description')}
            </h3>

            {/* Button */}
            <Link href={'/products'}>
              <Button
                className={cn(
                  // Default
                  'py-2.5 w-fit cursor-pointer',

                  // Dark
                  'dark:bg-maroon-50 dark:text-maroon-800 dark:hover:bg-maroon-100'
                )}
                variant={'secondary'}
              >
                {t('carousel-button')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
