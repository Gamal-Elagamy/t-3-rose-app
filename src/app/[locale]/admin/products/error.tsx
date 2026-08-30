'use client';

import { Button } from '@/shared/components/ui/button';

interface ProductsErrorProps {
  reset: () => void;
}

export default function ProductsError({ reset }: ProductsErrorProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-16 text-center">
      <p className="text-sm text-ds-text-danger">Couldn't load products. Please try again.</p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}