'use client';

import { useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { useTranslations } from 'next-intl';

import SectionTitle from '@/shared/components/section-title';

import { Testimonial } from '../../types/testimonials';
import TestimonialCard from './testimonial-card';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const t = useTranslations('home.testimonials');

  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="mb-10 flex flex-col items-center md:mb-16">
        <p className="mb-2 text-center text-sm font-semibold uppercase tracking-[0.2em] text-ds-text-secondary">
          {t('label')}
        </p>

        <SectionTitle title={t('title')} />
      </div>

      <div className="w-full bg-ds-bg-primary-fade py-12 md:py-16 lg:py-20 dark:bg-ds-bg-soft">
        <div className="mx-auto w-11/12">
          <div className="mb-4 flex justify-center md:justify-end">
            <button
              type="button"
              onClick={() => setIsPaused((prev) => !prev)}
              aria-pressed={isPaused}
              aria-label={isPaused ? t('play') : t('pause')}
              title={isPaused ? t('play') : t('pause')}
              className="flex items-center gap-2 rounded-full border border-ds-border px-3 py-2 text-sm transition-colors hover:bg-ds-bg-plain"
            >
              {isPaused ? <Play size={16} /> : <Pause size={16} />}
              <span>{isPaused ? t('play') : t('pause')}</span>
            </button>
          </div>

          <div className="overflow-hidden">
            <div
              className={`animate-marquee flex gap-6 md:gap-8 lg:gap-10 ${isPaused ? 'is-paused' : ''}`}
            >
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={`${testimonial.id}-${index}`} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
