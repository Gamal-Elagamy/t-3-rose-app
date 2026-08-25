'use client';

import { useEffect, useRef } from 'react';

import { useLowStockProducts } from '../../hooks/use-low-stock-products';

export default function LowStockProducts() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useLowStockProducts();

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

  return (
    <div className="rounded-xl bg-white p-4 dark:bg-zinc-800">
      <h3 className="mb-4 text-sm font-medium text-muted-foreground">Low Stock Products</h3>

      <div ref={containerRef} className="max-h-80 space-y-2 overflow-y-auto">
        {isLoading && <p className="text-sm text-muted-foreground">Loading...</p>}

        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between rounded-lg bg-zinc-50 px-3 py-2 dark:bg-zinc-700"
          >
            <span className="text-sm font-medium">{product.title}</span>
            <span
              className={`text-sm font-semibold ${
                product.stock <= 5 ? 'text-red-500' : 'text-amber-500'
              }`}
            >
              {product.stock} left
            </span>
          </div>
        ))}

        <div ref={bottomRef} />

        {isFetchingNextPage && <p className="text-sm text-muted-foreground">Loading more...</p>}

        {!hasNextPage && products.length > 0 && (
          <p className="text-center text-xs text-muted-foreground">No more products</p>
        )}
      </div>
    </div>
  );
}
