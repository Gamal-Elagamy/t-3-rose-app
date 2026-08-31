'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';

import { cn } from '@/shared/lib/utils/tailwind-cn';

import { useLowStockProducts } from '../../hooks/use-low-stock-products';

import LowStockProductsSkeleton from '../../Skeletons/low-stock-products-skeleton';

export default function LowStockProducts() {
  const t = useTranslations('admin-dashboard.low-stock');
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useLowStockProducts();

  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bottomRef.current;
    const root = containerRef.current;
    if (!el || !root) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { root, threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const products = data?.pages.at(-1)?.items ?? [];
  const isEmpty = !isLoading && !isError && products.length === 0;

  return (
    <div className="rounded-xl bg-white p-4 dark:bg-zinc-800">
      <h3 className="mb-4 text-xl font-bold text-muted-foreground sm:text-2xl">{t('title')}</h3>

      <div
        ref={containerRef}
        className="max-h-80 space-y-2 overflow-y-auto [&::-webkit-scrollbar]:hidden"
      >
        {isLoading && <LowStockProductsSkeleton />}

        {isError && <p className="py-6 text-center text-sm text-red-500">{t('load-failed')}</p>}

        {isEmpty && <p className="py-6 text-center text-sm text-muted-foreground">{t('empty')}</p>}

        {!isLoading &&
          !isError &&
          products.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between gap-2 border-b border-zinc-100 px-3 py-2 last:border-b-0 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-700"
            >
              <span className="truncate text-base font-medium sm:text-xl">{product.title}</span>
              <span
                className={cn(
                  'shrink-0 text-sm font-semibold',
                  product.stock <= 5 ? 'text-red-600' : 'text-muted-foreground'
                )}
              >
                {t('left', { count: product.stock })}
              </span>
            </div>
          ))}

        <div ref={bottomRef} />

        {isFetchingNextPage && <LowStockProductsSkeleton />}

        {!hasNextPage && products.length > 0 && (
          <p className="text-center text-xs text-muted-foreground">{t('no-more')}</p>
        )}
      </div>
    </div>
  );
}
