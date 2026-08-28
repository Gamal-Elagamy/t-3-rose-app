'use client';

import { useEffect, useRef } from 'react';

import { useTopSellingProducts } from '../../hooks/use-top-selling-products';
import { TopSellingProduct } from '../../types/admin';

import TopSellingProductsSkeleton from '../../Skeletons/top-selling-products-skeleton';

const truncateText = (text: string, maxLength: number) =>
  text.split('').length > maxLength ? text.split('').slice(0, maxLength).join('') + '...' : text;

const RANK_GRADIENTS: Record<number, string> = {
  0: 'bg-[linear-gradient(90deg,#DFAC1640,transparent)] dark:bg-[linear-gradient(90deg,#DFAC1660,transparent)]',
  1: 'bg-[linear-gradient(90deg,#757F9540,transparent)] dark:bg-[linear-gradient(90deg,#9FA8C280,transparent)]',
  2: 'bg-[linear-gradient(90deg,#91440040,transparent)] dark:bg-[linear-gradient(90deg,#91440070,transparent)]',
};

export default function TopSellingProducts() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
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

  return (
    <div className="rounded-xl bg-white p-4 dark:bg-zinc-800">
      <h3 className="mb-4 text-2xl font-bold text-muted-foreground">Top Selling Products</h3>

      <div
        ref={containerRef}
        className="max-h-80 space-y-2 overflow-y-auto [&::-webkit-scrollbar]:hidden"
      >
        {isLoading ? (
          <TopSellingProductsSkeleton />
        ) : (
          <>
            {products.map((product, index) => {
              const gradientClass = RANK_GRADIENTS[index];

              return (
                <div
                  key={product.productId}
                  className={`flex items-center justify-between rounded-lg px-3 py-2 ${
                    gradientClass ?? 'bg-zinc-100 dark:bg-zinc-700'
                  }`}
                >
                  <div>
                    <span className="mx-1 text-xl font-medium" title={product.title}>
                      {truncateText(product.title, 25)}
                    </span>
                    <span className="text-sm font-light text-muted-foreground">
                      ({product.unitPrice} EGP)
                    </span>
                  </div>
                  <span className="text-sm font-semibold">
                    {product.totalSales}
                    <span className="mx-1 text-sm font-medium text-muted-foreground">sold</span>
                  </span>
                </div>
              );
            })}

            <div ref={bottomRef} />

            {isFetchingNextPage && <TopSellingProductsSkeleton />}

            {!hasNextPage && products.length > 0 && (
              <p className="text-center text-xs text-muted-foreground">No more products</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
