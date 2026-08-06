'use client';

import { Button } from '@/shared/components/ui/button';
import { MoveRight } from 'lucide-react';

interface Props {
  onCheckout?: () => void;
}

export function CheckoutButton({ onCheckout }: Props) {
  return (
   <Button
  className="flex h-12 w-full items-center justify-center gap-2 text-base"
  onClick={onCheckout}
>
  Checkout
  <MoveRight className="size-5 shrink-0" />
</Button>
  );
}
