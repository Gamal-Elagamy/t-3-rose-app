'use client';

import { useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { useTranslations } from 'next-intl';

import SectionTitle from '@/shared/components/section-title';

import { Testimonial } from '../../types/testimonials';
import TestimonialCard from './testimonial-card';
import SectionSmallTitle from '@/shared/components/section-small-title';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  // Translation
  const t = useTranslations('home.testimonials');

  // State
  const [isPaused, setIsPaused] = useState(false);

  // Variables
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  // Functions
  const handleToggleAnimation = () => {
    setIsPaused((prev) => !prev);
  };

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="mb-10 flex flex-col items-center md:mb-16">
        <SectionSmallTitle title={t('label')} />

        <SectionTitle title={t('title')} />
      </div>

      <div className="w-full bg-ds-bg-primary-fade py-12 md:py-16 lg:py-20 dark:bg-ds-bg-soft">
        <div className="mx-auto w-11/12">
          <div className="mb-4 flex justify-center md:justify-end">
            <button
              type="button"
              onClick={handleToggleAnimation}
              aria-pressed={isPaused}
              aria-label={isPaused ? t('play') : t('pause')}
              className="sr-only"
            >
              {isPaused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
            </button>
          </div>

          <div className="overflow-hidden">
            <div
              className={`animate-marquee flex gap-6 md:gap-8 lg:gap-10 ${
                isPaused ? 'is-paused' : ''
              }`}
            >
              {duplicatedTestimonials.map((testimonial, index) => (
                <TestimonialCard key={`${testimonial.id}-${index}`} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
