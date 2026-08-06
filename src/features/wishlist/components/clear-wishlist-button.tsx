'use client';

import { useTransition } from 'react';
import { useTranslations } from 'next-intl';
import { Trash2 } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { clearWishlistAction } from '../actions/wishlist.actions';
import { useRouter } from '@/i18n/navigation';


export function ClearWishlistButton() {
  // Translation
  const t = useTranslations();
const router=useRouter();
  // Hooks
  const [isPending, startTransition] = useTransition();

  // Handlers
  const handleClear = () => {
    startTransition(async() => {
      await clearWishlistAction();
      router.refresh();
    });
  };

  return (
    <Button variant="destructive" onClick={handleClear} isLoading={isPending}>
      <Trash2 />
      {t('wishlist.clearWishlist')}
    </Button>
  );
}