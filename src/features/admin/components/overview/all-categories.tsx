'use client';

import { useEffect, useRef, useState } from 'react';

import { DashboardCategory } from '../../types/admin';

interface AllCategoriesProps {
  categories: DashboardCategory[];
}

const PAGE_SIZE = 10;

export default function AllCategories({ categories }: AllCategoriesProps) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

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

  const visibleCategories = categories.slice(0, visibleCount);
  const hasMore = visibleCount < categories.length;

  return (
    <div className="rounded-xl bg-white p-4 dark:bg-zinc-800">
      <h3 className="mb-4 text-sm font-medium text-muted-foreground">Categories</h3>

      <div ref={containerRef} className="max-h-80 space-y-2 overflow-y-auto">
        {visibleCategories.map((category) => (
          <div
            key={category.id}
            className="flex items-center justify-between rounded-lg bg-zinc-50 px-3 py-2 dark:bg-zinc-700"
          >
            <span className="text-sm">{category.title}</span>
            <span className="text-xs text-muted-foreground">{category.productCount} products</span>
          </div>
        ))}

        {categories.length === 0 && <p className="text-sm text-muted-foreground">No categories</p>}

        <div ref={bottomRef} />

        {hasMore && <p className="text-sm text-muted-foreground">Loading more...</p>}
      </div>
    </div>
  );
}
