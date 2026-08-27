'use client';

import { useEffect, useRef, useState } from 'react';

import { useAdminStatistics } from '../../hooks/use-admin-statistics';

import AllCategoriesSkeleton from '../../Skeletons/all-categories-skeleton';

const PAGE_SIZE = 10;

export default function AllCategories() {
  const { data, isLoading, isError } = useAdminStatistics();

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const payload = data?.status && 'payload' in data ? data.payload : undefined;
  const hasValidData = Boolean(payload);
  const categories = payload?.categories ?? [];

  useEffect(() => {
    const el = bottomRef.current;
    const root = containerRef.current;
    if (!el || !root) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, categories.length));
        }
      },
      { root, threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [categories.length]);

  if (isLoading) {
    return <AllCategoriesSkeleton />;
  }

  if (isError || !hasValidData) {
    return <p className="text-sm text-red-500">Failed to load categories</p>;
  }

  const visibleCategories = categories.slice(0, visibleCount);
  const hasMore = visibleCount < categories.length;

  return (
    <div className="flex h-80 w-full flex-col rounded-2xl bg-white p-6 dark:bg-zinc-800">
      <h3 className="mb-4 text-2xl font-bold text-muted-foreground">All Categories</h3>

      <div
        ref={containerRef}
        className="min-h-0 flex-1 space-y-2 overflow-y-auto [&::-webkit-scrollbar]:hidden"
      >
        {visibleCategories.map((category) => (
          <div
            key={category.id}
            className="flex items-center justify-between border-b border-zinc-100 px-3 py-2 last:border-b-0 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-700"
          >
            <span className="text-xl font-medium">{category.title}</span>

            <span className="rounded-lg bg-zinc-100 px-2 py-1 text-muted-foreground dark:bg-zinc-700">
              {category.productCount} products
            </span>
          </div>
        ))}

        {categories.length === 0 && (
          <p className="text-sm font-semibold text-muted-foreground">No categories</p>
        )}

        <div ref={bottomRef} />

        {hasMore && <p className="text-sm text-muted-foreground">Loading more...</p>}
      </div>
    </div>
  );
}
