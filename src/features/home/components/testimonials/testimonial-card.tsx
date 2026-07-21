'use client';
import Image from 'next/image';
import { Star, User } from 'lucide-react';

import { Testimonial } from '../../types/testimonials';
import { useState } from 'react';

interface TestimonialCardProps {
  testimonial: Testimonial;
}
export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative mt-14">
      <div className="absolute -top-14 left-1/2 z-10 -translate-x-1/2">
        {testimonial.image && !imageError ? (
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            priority
            width={96}
            height={96}
            onError={() => setImageError(true)}
            className="h-24 w-24 rounded-full border-3 border-white object-cover shadow-md"
          />
        ) : (
          <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-soft-pink-100 shadow-md">
            <User className="h-10 w-10 text-soft-pink-600" />
          </div>
        )}
      </div>

      <div className="flex h-64 w-80 flex-col items-center rounded-3xl gap-3 bg-white px-6 pt-16 pb-6 shadow-md dark:bg-white">
        <h3 className="text-md font-semibold text-black">{testimonial.name}</h3>

        <div className="mt-4 flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              size={16}
              className={
                index < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-yellow-300'
              }
            />
          ))}
        </div>

        <p className="text-center text-sm text-black">{testimonial.content}</p>

        <span className="mt-auto text-xs text-ds-text-subtle">
          {new Date(testimonial.createdAt).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </span>
      </div>
    </div>
  );
}
