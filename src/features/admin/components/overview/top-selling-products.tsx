'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';

import { cn } from '@/shared/lib/utils/tailwind-cn';

import { useTopSellingProducts } from '../../hooks/use-top-selling-products';
import { TopSellingProduct } from '../../types/admin';

import TopSellingProductsSkeleton from '../../Skeletons/top-selling-products-skeleton';

const truncateText = (text: string, maxLength: number) =>
  text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

const RANK_GRADIENTS: Record<number, string> = {
  0: 'bg-[linear-gradient(90deg,#DFAC1640,transparent)] dark:bg-[linear-gradient(90deg,#DFAC1660,transparent)]',
  1: 'bg-[linear-gradient(90deg,#757F9540,transparent)] dark:bg-[linear-gradient(90deg,#9FA8C280,transparent)]',
  2: 'bg-[linear-gradient(90deg,#91440040,transparent)] dark:bg-[linear-gradient(90deg,#91440070,transparent)]',
};

export default function TopSellingProducts() {
  const t = useTranslations('admin-dashboard.top-selling');
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useTopSellingProducts();

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

  const products: TopSellingProduct[] = data?.pages.at(-1)?.items ?? [];
  const isEmpty = !isLoading && !isError && products.length === 0;

  return (
    <div className="rounded-xl bg-white p-4 dark:bg-zinc-800">
      <h3 className="mb-4 text-xl font-bold text-muted-foreground sm:text-2xl">{t('title')}</h3>

      <div
        ref={containerRef}
        className="max-h-80 space-y-2 overflow-y-auto [&::-webkit-scrollbar]:hidden"
      >
        {isLoading && <TopSellingProductsSkeleton />}

        {isError && <p className="py-6 text-center text-sm text-red-500">{t('load-failed')}</p>}

        {isEmpty && <p className="py-6 text-center text-sm text-muted-foreground">{t('empty')}</p>}

        {!isLoading &&
          !isError &&
          products.map((product, index) => {
            const gradientClass = RANK_GRADIENTS[index];

            return (
              <div
                key={product.productId}
                className={cn(
                  'flex items-center justify-between gap-2 rounded-lg px-3 py-2',
                  gradientClass ?? 'bg-zinc-100 dark:bg-zinc-700'
                )}
              >
                <div className="min-w-0">
                  <span
                    className="mx-1 truncate text-base font-medium sm:text-xl"
                    title={product.title}
                  >
                    {truncateText(product.title, 25)}
                  </span>
                  <span className="text-xs font-light text-muted-foreground sm:text-sm">
                    ({product.unitPrice} EGP)
                  </span>
                </div>
                <span className="shrink-0 text-sm font-semibold">
                  {t('sold', { count: product.totalSales })}
                </span>
              </div>
            );
          })}

        <div ref={bottomRef} />

        {isFetchingNextPage && <TopSellingProductsSkeleton />}

        {!hasNextPage && products.length > 0 && (
          <p className="text-center text-xs text-muted-foreground">{t('no-more')}</p>
        )}
      </div>
    </div>
  );
}
