"use client";
import { useCart } from '@/features/cart/context/cart.context';
import { Separator } from '@/shared/components/ui/separator';

interface Props {
 

  currency?: string;
}

export function SubtotalPrice({
 

  currency = 'EGP',
}: Props) {

   const { cartTotal: subtotal } = useCart();

  return (
    <>
     <Separator />

<div className="flex items-center justify-between gap-2 pt-4">
  <span className="text-lg font-semibold sm:text-xl">
    Subtotal
  </span>

  <span className="text-right text-lg font-semibold text-primary sm:text-xl">
    { subtotal ?? 0} {currency}
  </span>
</div>
    </>
  );
}
