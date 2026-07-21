'use client';
import Image2 from '@/assets/images/banner-home-page/Hero-Section-Banner (2).png';
import Image3 from '@/assets/images/banner-home-page/Hero-Section-Banner (3).png';
import Image4 from '@/assets/images/banner-home-page/Hero-Section-Banner (4).png';
import Image5 from '@/assets/images/banner-home-page/Hero-Section-Banner (5).png';

import { useState, useEffect } from 'react';
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

export default function CarouselCustomDots() {
  // State to store the carousel API instance
  const [api, setApi] = useState<CarouselApi>();
  // State to track the current active slide index
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    // Set initial slide index on mount
    setTimeout(() => {
      setCurrent(api.selectedScrollSnap() + 1);
    });

    // Update current slide index on slide change
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="relative w-full h-full">
      {/* Carousel */}
      <Carousel setApi={setApi} className="w-full h-full">
        <CarouselContent>
          {/* Render each image as a carousel slide */}
          {images.map((src, index) => (
            <CarouselItem key={index}>
              <figure className="w-full h-full">
                <Image
                  src={src}
                  alt={`img ${index + 1}`}
                  placeholder="blur"
                  width={300}
                  height={439}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </figure>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Carousel Arrow Icons */}
        <div className="arrow-actions absolute bottom-8 inset-e-8 z-20 flex items-center gap-3.5 rounded-full bg-ds-bg-primary-fade backdrop-blur-sm p-1 shadow-sm">
          <CarouselPrevious className="cursor-pointer" />
          <CarouselNext className="cursor-pointer" />
        </div>
      </Carousel>

      {/* Carousel Dots */}
      <div className="absolute top-8 inset-e-8 flex gap-1.5 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={cn('h-2.5 rounded-full transition-all duration-300 cursor-pointer', {
              'bg-ds-bg-primary w-8': index + 1 === current,
              'bg-ds-bg-primary-fade w-2.5 hover:bg-ds-bg-primary-faint': index + 1 !== current,
            })}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
