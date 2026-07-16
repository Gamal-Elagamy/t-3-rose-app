import Image from 'next/image';
import { Star, User } from 'lucide-react';

import { Testimonial } from '../types/testimonials';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="w-[380px] rounded-2xl border border-ds-border-secondary-faint bg-ds-bg-plain p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {testimonial.image ? (
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              width={56}
              height={56}
              className="h-14 w-14 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-soft-pink-100">
              <User className="h-6 w-6 text-soft-pink-600" />
            </div>
          )}

          <h3 className="font-semibold text-ds-text-primary">{testimonial.name}</h3>
        </div>

        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              size={18}
              className={
                index < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
              }
            />
          ))}
        </div>
      </div>

      {/* Review */}
      <p className="mt-5 text-sm leading-7 text-ds-text-muted">{testimonial.content}</p>

      {/* Date */}
      <p className="mt-6 text-xs text-ds-text-subtle">
        {new Date(testimonial.createdAt).toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })}
      </p>
    </div>
  );
}
