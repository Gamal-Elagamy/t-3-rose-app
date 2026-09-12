'use client';

import { useProductsFilters } from '@/features/products/hooks/use-products-filters';
import { ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react';

interface ProductsPaginationProps {
  totalPages: number;
}

function getPageNumbers(current: number, total: number): (number | 'ellipsis')[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | 'ellipsis')[] = [1];

  if (current > 3) {
    pages.push('ellipsis');
  }

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (current < total - 2) {
    pages.push('ellipsis');
  }

  pages.push(total);

  return pages;
}

export function ProductsPagination({ totalPages }: ProductsPaginationProps) {
  const { page, setPage } = useProductsFilters();

  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers(page, totalPages);

  return (
    <div className="flex items-center justify-center gap-1">
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => setPage(1)}
        aria-label="First page"
        className="flex size-8 items-center justify-center rounded-md text-ds-text-muted hover:bg-ds-bg-subtle disabled:opacity-40"
      >
        <ChevronsLeft className="size-4" />
      </button>

      <button
        type="button"
        disabled={page <= 1}
        onClick={() => setPage(page - 1)}
        aria-label="Previous page"
        className="flex size-8 items-center justify-center rounded-md text-ds-text-muted hover:bg-ds-bg-subtle disabled:opacity-40"
      >
        <ChevronLeft className="size-4" />
      </button>

      {pageNumbers.map((p, i) =>
        p === 'ellipsis' ? (
          <span key={`ellipsis-${i}`} className="flex size-8 items-center justify-center text-sm text-ds-text-muted">
            ...
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => setPage(p)}
            aria-current={p === page ? 'page' : undefined}
            className={`flex size-8 items-center justify-center rounded-md text-sm font-medium ${
              p === page
                ? 'bg-ds-bg-danger text-ds-text-inverse'
                : 'text-ds-text-default hover:bg-ds-bg-subtle'
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => setPage(page + 1)}
        aria-label="Next page"
        className="flex size-8 items-center justify-center rounded-md text-ds-text-muted hover:bg-ds-bg-subtle disabled:opacity-40"
      >
        <ChevronRight className="size-4" />
      </button>

      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => setPage(totalPages)}
        aria-label="Last page"
        className="flex size-8 items-center justify-center rounded-md text-ds-text-muted hover:bg-ds-bg-subtle disabled:opacity-40"
      >
        <ChevronsRight className="size-4" />
      </button>
    </div>
  );
}