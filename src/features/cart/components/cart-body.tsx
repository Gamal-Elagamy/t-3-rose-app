'use client';
import { Button } from '@/shared/components/ui/button';
import { Star, Trash2 } from 'lucide-react';
import Image from 'next/image';
import CartFooter from './cart-footer';
import { useRouter } from '@/i18n/navigation';
import useDeleteCartItem from '../hooks/use-delete-item-cart';
import { useCart } from '../context/cart.context';
import CartEmpty from './cart-empty';
import { useTranslations } from 'next-intl';
import CartSkeleton from '@/shared/components/cart-skeleton';

export default function CartBody() {
  // Translations
  const t = useTranslations('cart-list');

  // Cart Context
  const {
    cartList,
    isAuthenticated,
    displayedProducts: products,
    cartItems,
    setCartItems,
    isEmpty,
    isLoading,
  } = useCart();

  // Router
  const router = useRouter();

  // Delete Hook
  const { isPending, deleteUserCart } = useDeleteCartItem();

  // Remove Cart Item Function
  async function removeCartItem(productId?: string) {
    if (!productId) return;
    if (!isAuthenticated) {
      const removeItem = cartItems.filter((item) => item.productId !== productId);
      localStorage.setItem('guest-cart', JSON.stringify(removeItem));
      setCartItems(removeItem);
    } else {
      // Delete Item
      const cartItem = cartList?.find((item) => item.productId === productId);

      deleteUserCart(cartItem!.id, {
        onSuccess: () => {
          router.refresh();
        },
      });
    }
  }

  if (isLoading) return <CartSkeleton />;

  // Cart Empty Condition
  if (isEmpty) return <CartEmpty />;

  return (
    <div className="cart-body flex flex-col gap-5 p-5 mt-6 border border-ds-border-muted rounded-lg max-h-150 overflow-y-auto">
      {/* Item */}
      {products?.map((product) => (
        <div key={product?.id} className="item pb-5 border-b border-ds-border-muted flex gap-4">
          {/* Image Box */}
          <div className="image w-29.25 h-35 rounded-lg overflow-hidden">
            <Image
              src={product?.cover}
              alt="product-image"
              width={117}
              height={140}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="content grow flex flex-col justify-between gap-2.5">
            {/* Details */}
            <div className="details flex items-center gap-1.5">
              <div className="left grow flex flex-col gap-1.5">
                {/* Title */}
                <h3 className="font-semibold text-xl text-ds-text-primary">{product?.title}</h3>

                {/* Item Rating */}
                <h4 className="flex items-center gap-1.5">
                  {/* Star Icon */}
                  <Star className="size-5 text-orange-500 fill-orange-500" />

                  {/* Rating Details */}
                  <p className="font-normal text-base text-black dark:text-white">
                    {t.rich('cart-rating', {
                      rating: Number(product?.rating.toFixed(1)),
                      bold: (chunks) => <span className="font-medium">{chunks}</span>,
                    })}
                  </p>

                  <span className="font-medium text-base text-blue-600">
                    ({t('cart-rating-count', { count: Number(product?.ratings) })})
                  </span>
                </h4>
              </div>

              {/* Remove Item Button */}
              <Button
                onClick={() => removeCartItem(product?.id)}
                variant={'destructive'}
                disabled={isPending}
                className="flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="size-5" />
                {t('cart-remove')}
              </Button>
            </div>

            {/* Footer */}
            <CartFooter product={product} />
          </div>
        </div>
      ))}
    </div>
  );
}
