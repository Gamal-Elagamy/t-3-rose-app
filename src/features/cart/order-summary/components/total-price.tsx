import { Separator } from '@/shared/components/ui/separator';

interface Props {
  total: number;

  currency?: string;
}

export function TotalPrice({
  total,

  currency = 'EGP',
}: Props) {
  return (
    <>
    <Separator />

<div className="flex items-center justify-between gap-2 border-t border-zinc-300 pt-4">
  <span className="text-xl font-bold text-maroon-600 sm:text-2xl">
    Total
  </span>

  <span className="text-right text-xl font-bold text-maroon-600 sm:text-2xl">
    {total} {currency}
  </span>
</div>
    </>
  );
}
