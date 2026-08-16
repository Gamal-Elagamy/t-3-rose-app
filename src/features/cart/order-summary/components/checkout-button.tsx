'use client';

import { useRouter } from '@/i18n/navigation';
import { Button } from '@/shared/components/ui/button';
import { MoveRight } from 'lucide-react';
import { useTranslations } from 'next-intl';



export function CheckoutButton() {

  const t = useTranslations('order-summary');

  const router = useRouter();
  return (
   <Button
  className="flex h-12 w-full items-center justify-center gap-2 text-base"
  onClick={() => router.push('/cart/checkout')}
>
  {t('checkout-button')}
  <MoveRight className="size-5 shrink-0" />
</Button>
  );
}
