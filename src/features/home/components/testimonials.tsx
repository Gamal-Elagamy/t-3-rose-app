'use client';

import { useTranslations } from 'next-intl';

import SectionTitle from '@/shared/components/section-title';

import { useTestimonials } from '../hooks/use-testimonials';
import TestimonialCard from './testimonial-card';
import TestimonialSkeleton from './skeletons/testimonial-skeleton';

export default function Testimonials() {
  const t = useTranslations('home.testimonials');

  const { data, isLoading, error } = useTestimonials();

  const testimonials = data?.data ?? [];

  const loopTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-20">
      {/* Header */}
      <div className="mb-16 flex flex-col items-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-ds-text-secondary">
          {t('label')}
        </p>

        <SectionTitle title={t('title')} />
      </div>

      {/* Background */}
      <div className="w-full bg-ds-bg-primary-fade py-24 dark:bg-ds-bg-soft">
        <div className="mx-auto w-11/12 overflow-hidden">
          {isLoading ? (
            <div className="flex justify-center gap-10">
              <TestimonialSkeleton />
              <TestimonialSkeleton />
              <TestimonialSkeleton />
            </div>
          ) : error ? (
            <div className="py-20 text-center">
              <p>Failed to load testimonials.</p>
            </div>
          ) : (
            <div className="animate-marquee flex w-max gap-10">
              {loopTestimonials.map((testimonial, index) => (
                <TestimonialCard key={`${testimonial.id}-${index}`} testimonial={testimonial} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
