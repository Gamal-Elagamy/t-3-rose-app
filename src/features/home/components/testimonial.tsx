'use client';
import { useTestimonials } from '../hooks/use-testimonials';
import TestimonialCard from './testimonial-card';

export default function Testimonials() {
  const { data, isLoading, error } = useTestimonials();
  console.log(data);
  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Error</p>;
  const testimonials = data?.data.slice(0, 3) ?? [];

  return (
    <section className="mx-auto w-11/12 py-20 flex gap-6">
      {testimonials.map((testimonial) => (
        <TestimonialCard key={testimonial.id} testimonial={testimonial} />
      ))}
    </section>
  );
}
