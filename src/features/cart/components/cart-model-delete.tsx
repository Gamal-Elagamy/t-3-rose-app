import { Button } from '@/shared/components/ui/button';
import { Trash2, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { useCart } from '../context/cart.context';
import { useClearCart } from '../hooks/use-clear-cart';
import { toast } from 'sonner';

interface IProps {
  setShowModelDelete: (value: boolean) => void;
}

export default function CartModelDelete({ setShowModelDelete }: IProps) {
  // Translations
  const t = useTranslations('cart-list');

  // Cart Context
  const { isAuthenticated,guestData ,clearCartGuest ,refreshCart } = useCart();

  // Clear Cart Hook
  const { mutate: clearCart, isPending } = useClearCart();

  function closeModel() {
    setShowModelDelete(false);
  }

    // Handle Clear Function
  function handleClearCart() {
    if (!isAuthenticated && guestData.length > 0) {
      clearCartGuest()
      setShowModelDelete(false)
      return;
    }


    // Authenticated
    clearCart(undefined, {
      onSuccess: () => {
        refreshCart();
        setShowModelDelete(false)
      },
      onError: () => {
        toast.error(t('cart-clear-error'));
      },
    });
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        closeModel();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div
      onClick={() => closeModel()}
      className="absolute z-20 flex items-center justify-center top-0 inset-s-0 bottom-0 inset-e-0 bg-black/50"
    >
      <div onClick={(e) => e.stopPropagation()} className="w-118.5 p-6 rounded-2xl bg-ds-bg-plain">
        {/* Confirm info */}
        <div className="flex flex-col gap-6 items-center justify-center">
          <X onClick={() => closeModel()} className="self-end size-6.5 text-ds-text-soft" />
          <Trash2 className="size-7.5 text-ds-text-plain w-17.5 h-17.5 rounded-full bg-ds-bg-soft border-[17.5px] border-ds-border-muted" />
          <p className="font-semibold text-xl text-ds-text-plain">{t('cart-clear-info')}</p>
        </div>

        {/* Button */}
        <div className="flex items-center justify-center gap-2.5 mt-13">
          {/* Cancle Clear Cart Data Button */}
          <Button onClick={()=>setShowModelDelete(false)} variant={'subtle'} className="flex-1 cursor-pointer">
            {t('cart-clear-cancle')}
          </Button>

      {/* Confirm Clear Cart Data Button */}
          <Button disabled={isPending} onClick={()=>handleClearCart()} variant={'destructive'} className="flex-1 cursor-pointer">
            {isPending ?t('cart-clearing') : t('cart-clear-confirm')}
          </Button>
        </div>
      </div>
    </div>
  );
}
