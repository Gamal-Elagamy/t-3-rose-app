import TestimonialSkeleton from './testimonial-skeleton';

export default function TestimonialsSectionSkeleton() {
  return (
    <section className="py-20">
      <div className="mb-16 flex flex-col items-center">
        <div className="mb-2 h-4 w-24 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
        <div className="h-10 w-64 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
      </div>

      <div className="w-full bg-ds-bg-primary-fade py-24 dark:bg-ds-bg-soft">
        <div className="mx-auto flex w-11/12 justify-center gap-10">
          <TestimonialSkeleton />
          <TestimonialSkeleton />
          <TestimonialSkeleton />
        </div>
      </div>
    </section>
  );
}
