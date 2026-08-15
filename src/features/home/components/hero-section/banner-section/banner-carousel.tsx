'use client';

import Image2 from '@/assets/images/banner-home-page/Hero-Section-Banner (2).png';
import Image3 from '@/assets/images/banner-home-page/Hero-Section-Banner (3).png';
import Image4 from '@/assets/images/banner-home-page/Hero-Section-Banner (4).png';
import Image5 from '@/assets/images/banner-home-page/Hero-Section-Banner (5).png';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/shared/components/ui/carousel';
import { cn } from '@/shared/lib/utils/tailwind-cn';
import Image from 'next/image';

const images = [Image2, Image3, Image4, Image5];

const CarouselCustomDots = () => {
  const locale = useLocale();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const isRTL = locale === 'ar';

  useEffect(() => {
    if (!api) {
      return;
    }

    setTimeout(() => {
      setCurrent(api.selectedScrollSnap() + 1);
    });

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="relative h-full w-full">
      {/* Carousel */}
      <Carousel setApi={setApi} className="h-full w-full">
        <CarouselContent className="h-full">
          {images.map((src, index) => (
            <CarouselItem key={index} className="h-full">
              <figure className="h-full w-full">
                <Image
                  src={src}
                  alt={`img ${index + 1}`}
                  placeholder="blur"
                  className="h-full w-full rounded-2xl object-cover"
                />
              </figure>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Carousel Arrow Icons */}
        <div className="absolute inset-e-8 bottom-12 z-40 flex h-8.5 translate-y-1/2 items-center justify-between gap-2 rounded-full bg-maroon-50">
          <CarouselPrevious
            className={cn(
              'static h-7.5 w-7.5 translate-y-0 cursor-pointer bg-transparent text-maroon-700 hover:bg-transparent',
              isRTL && 'rotate-180'
            )}
          />

          <CarouselNext
            className={cn(
              'static h-7.5 w-7.5 translate-y-0 cursor-pointer bg-transparent text-maroon-700 hover:bg-transparent',
              isRTL && 'rotate-180'
            )}
          />
        </div>
      </Carousel>

      {/* Carousel Dots */}
      <div className="absolute inset-e-8 top-8 z-20 flex gap-1.5">
        {images.map((_, index) => {
          const isActive = index + 1 === current;

          return (
            <button
              key={index}
              type="button"
              onClick={() => api?.scrollTo(index)}
              aria-label={`Slide ${index + 1}`}
              aria-current={isActive ? 'true' : undefined}
              className={cn(
                'h-2.5 cursor-pointer rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-bg-primary focus-visible:ring-offset-2',
                {
                  'w-8 bg-ds-bg-primary': isActive,
                  'w-2.5 bg-ds-bg-primary-fade hover:bg-ds-bg-primary-faint': !isActive,
                }
              )}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CarouselCustomDots;
