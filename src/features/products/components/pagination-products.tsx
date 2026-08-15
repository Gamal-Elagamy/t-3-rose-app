'use client';

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ReactNode, useCallback, useMemo } from 'react';

import { getPageNumbers } from '../../../shared/lib/utils/pagination.utils';
import { cn } from '@/shared/lib/utils/tailwind-cn';

type PageButtonProps = {
  children: ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
};

function PageButton({
  children,
  active = false,
  disabled = false,
  onClick,
  ariaLabel,
}: PageButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'inline-flex h-9 w-9 items-center justify-center rounded-md border text-sm font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 border dark:border-none cursor-pointer',
        disabled
          ? 'cursor-not-allowed border-ds-muted text-gray-400 opacity-40 dark:bg-ds-plain'
          : active
            ? 'bg-ds-bg-primary text-white shadow-sm'
            : 'border-ds-bg-muted text-gray-700 dark:border-none dark:bg-ds-bg-plain dark:text-white'
      )}
    >
      {children}
    </button>
  );
}

type PaginationProps = {
  page: number;
  totalPages?: number;
};

export default function PaginationProducts({ page, totalPages = 10 }: PaginationProps) {
  // Hooks
  const router = useRouter();
  const searchParams = useSearchParams();

  // Memoized Handlers
  const goTo = useCallback(
    (page: number) => {
      const clamped = Math.min(Math.max(page, 1), totalPages);

      const params = new URLSearchParams(searchParams.toString());

      params.set('page', clamped.toString());

      router.push(`?${params.toString()}`);
    },
    [router, searchParams, totalPages]
  );

  const pages = useMemo(
    () =>
      getPageNumbers({
        current: page,
        total: totalPages,
      }),
    [page, totalPages]
  );

  return (
    <nav aria-label="Pagination" dir="ltr" className="flex items-center justify-center gap-1.5 p-6">
      <PageButton ariaLabel="First page" disabled={page === 1} onClick={() => goTo(1)}>
        <ChevronsLeft size={16} aria-hidden="true" />
      </PageButton>

      <PageButton ariaLabel="Previous page" disabled={page === 1} onClick={() => goTo(page - 1)}>
        <ChevronLeft size={16} aria-hidden="true" />
      </PageButton>

      {pages.map((p, idx) =>
        typeof p === 'number' ? (
          <PageButton key={p} active={p === page} onClick={() => goTo(p)} ariaLabel={`Page ${p}`}>
            {p}
          </PageButton>
        ) : (
          <span
            key={p + idx}
            aria-hidden="true"
            className="inline-flex h-9 w-9 select-none items-center justify-center text-sm text-gray-400"
          >
            …
          </span>
        )
      )}

      <PageButton
        ariaLabel="Next page"
        disabled={page === totalPages}
        onClick={() => goTo(page + 1)}
      >
        <ChevronRight size={16} aria-hidden="true" />
      </PageButton>

      <PageButton
        ariaLabel="Last page"
        disabled={page === totalPages}
        onClick={() => goTo(totalPages)}
      >
        <ChevronsRight size={16} aria-hidden="true" />
      </PageButton>
    </nav>
  );
}
