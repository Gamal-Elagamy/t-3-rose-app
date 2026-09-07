'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

import { cn } from '@/shared/lib/utils/tailwind-cn';

import { DashboardCategory } from '../../types/admin';

interface AllCategoriesProps {
  categories: DashboardCategory[];
}

const PAGE_SIZE = 10;

export default function AllCategories({ categories }: AllCategoriesProps) {
  const t = useTranslations('admin-dashboard.categories');

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
  const isEmpty = categories.length === 0;

  return (
    <div className="flex h-80 w-full flex-col rounded-2xl bg-white p-4 dark:bg-zinc-800 sm:p-6">
      <h3 className="mb-4 text-xl font-bold text-muted-foreground sm:text-2xl">{t('title')}</h3>

      <div
        ref={containerRef}
        className={cn(
          'min-h-0 flex-1 space-y-2 overflow-y-auto [&::-webkit-scrollbar]:hidden',
          isEmpty && 'flex items-center justify-center'
        )}
      >
        {isEmpty ? (
          <p className="text-sm text-muted-foreground">{t('empty')}</p>
        ) : (
          <>
            {visibleCategories.map((category) => (
              <div
                key={category.id}
                className="flex items-center justify-between gap-2 border-b border-zinc-100 px-2 py-2 last:border-b-0 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-700 sm:px-3"
              >
                <span className="truncate text-base font-medium sm:text-xl">{category.title}</span>

                <span className="shrink-0 rounded-lg bg-zinc-100 px-2 py-1 text-xs text-muted-foreground dark:bg-zinc-700 sm:text-sm">
                  {t('products-count', { count: category.productCount })}
                </span>
              </div>
            ))}

            <div ref={bottomRef} />

            {hasMore && (
              <div className="flex justify-center py-2">
                <div className="size-4 animate-spin rounded-full border-2 border-zinc-300 border-t-transparent" />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
