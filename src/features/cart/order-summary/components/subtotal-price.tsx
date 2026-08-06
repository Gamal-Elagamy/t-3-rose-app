import { Separator } from '@/shared/components/ui/separator';

interface Props {
  subtotal: number;

  currency?: string;
}

export function SubtotalPrice({
  subtotal,

  currency = 'EGP',
}: Props) {
  return (
    <>
     <Separator />

<div className="flex items-center justify-between gap-2 pt-4">
  <span className="text-lg font-semibold sm:text-xl">
    Subtotal
  </span>

  <span className="text-right text-lg font-semibold text-primary sm:text-xl">
    {subtotal} {currency}
  </span>
</div>
    </>
  );
}
