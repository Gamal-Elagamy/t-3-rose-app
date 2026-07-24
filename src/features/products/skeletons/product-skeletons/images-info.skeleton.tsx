export default function ImagesInfoSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-17.5">
      {/* Image Gallery Skeleton */}
      <div className="space-y-2.5">
        {/* Main Image */}
        <div className="w-152 h-100 rounded-lg bg-gray-100 animate-pulse" />
        {/* Thumbnails */}
        <div className="flex gap-2">
          <div className="w-1/6 h-28 rounded-md bg-gray-100 animate-pulse" />
          <div className="w-1/6 h-28 rounded-md bg-gray-100 animate-pulse" />
          <div className="w-1/6 h-28 rounded-md bg-gray-100 animate-pulse" />
          <div className="w-1/6 h-28 rounded-md bg-gray-100 animate-pulse" />
        </div>
      </div>

      {/* Product Info Skeleton */}
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col h-full">
          {/* Title */}
          <div className="h-10 w-3/4 bg-gray-100 rounded animate-pulse mb-4" />

          {/* Price and Stock */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <div className="h-9 w-24 bg-gray-100 rounded animate-pulse" />
            <div className="h-9 w-20 bg-gray-100 rounded animate-pulse" />
            <div className="h-8 w-32 bg-gray-100 rounded-full animate-pulse" />
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 border-y border-gray-200 py-4">
            <div className="h-5 w-5 bg-gray-100 rounded animate-pulse" />
            <div className="h-5 w-16 bg-gray-100 rounded animate-pulse" />
            <div className="h-5 w-20 bg-gray-100 rounded animate-pulse" />
          </div>

          {/* Description */}
          <div className="mt-4 space-y-2">
            <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
            <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
            <div className="h-4 w-3/4 bg-gray-100 rounded animate-pulse" />
            <div className="h-4 w-1/2 bg-gray-100 rounded animate-pulse" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 mt-6">
          <div className="h-12 w-12 bg-gray-100 rounded animate-pulse" />
          <div className="h-12 flex-1 bg-gray-100 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}
