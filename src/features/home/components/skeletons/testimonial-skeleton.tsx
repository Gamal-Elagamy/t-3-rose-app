export default function TestimonialSkeleton() {
  return (
    <div className="relative mt-14 animate-pulse">
      {/* Avatar */}
      <div className="absolute -top-14 left-1/2 z-10 -translate-x-1/2">
        <div className="h-24 w-24 rounded-full border-4 border-white bg-gray-200 dark:bg-gray-700" />
      </div>

      {/* Card */}
      <div className="flex h-64 w-80 flex-col items-center gap-4 rounded-3xl bg-white px-6 pt-16 pb-6 shadow-md">
        {/* Name */}
        <div className="h-5 w-28 rounded-full bg-gray-200 dark:bg-gray-700" />

        {/* Stars */}
        <div className="mt-2 flex gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="h-4 w-4 rounded-full bg-gray-200 dark:bg-gray-700" />
          ))}
        </div>

        {/* Review */}
        <div className="mt-3 flex w-full flex-col gap-3">
          <div className="h-3 w-full rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="h-3 w-11/12 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="h-3 w-8/12 rounded-full bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* Date */}
        <div className="mt-auto h-3 w-20 rounded-full bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
  );
}
