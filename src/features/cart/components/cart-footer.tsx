import { IProduct } from '@/features/products/types/products';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Minus, Plus } from 'lucide-react';
import useUpdateCartItem from '../hooks/use-update-item-cart';
import { useCart } from '../context/cart.context';
import { useLocale, useTranslations } from 'next-intl';
import { formatLocaleNumber } from '@/shared/lib/utils/format-number';
import { updateGuestCartItemQuantity } from '../storage/guest-cart';
import { useState } from 'react';

export default function CartFooter({ product }: { product: IProduct }) {
  // Translations
  const t = useTranslations('cart-list');

  const locale = useLocale();

  // Cart Context
  const { userData, cartDataProducts, isAuthenticated, refreshCart } = useCart();

  // Update User Cart Item
  const { isPending, updateUserCart } = useUpdateCartItem();

  // Get Item Quantity
  const quantity = cartDataProducts.find((item) => item.productId === product.id)?.quantity ?? 1;

  // Stock Quanity Condition
  const isMaxStock = quantity >= product.stock;

  const [inputValue, setInputValue] = useState(quantity);
  const [prevQuantity, setPrevQuantity] = useState(quantity);

  if (quantity !== prevQuantity) {
    setPrevQuantity(quantity);
    setInputValue(quantity);
  }

  function commitQuantity(newQuantity: number) {
    const clamped = Math.min(Math.max(newQuantity, 1), product.stock);
    setInputValue(clamped);

    if (clamped === quantity) return;

    if (!isAuthenticated) {
      updateGuestCartItemQuantity(product.id, clamped);
      refreshCart();
      return;
    }

    const cartItem = userData?.find((item) => item.productId === product.id);
    if (!cartItem) return;

    updateUserCart(
      { cartItemId: cartItem.id, quantity: clamped },
      { onSuccess: () => refreshCart() }
    );
  }

  function quantityChange(num: number) {
    commitQuantity(quantity + num);
  }

  return (
    <div className="footer flex justify-between">
      {/* Price */}
      <div className="price flex h-fit mt-auto gap-1">
        <span className="font-medium h-fit mt-auto text-sm text-ds-text-primary">
          {t('cart-item-quantity', { quantity })}
        </span>
        <h5 className="font-bold h-fit mt-auto text-2xl text-ds-text-plain">
          {formatLocaleNumber(Number(product.price) * quantity, locale)}
        </h5>
        <span className="font-medium h-fit mt-auto text-base text-ds-text-plain">
          {t('cart-currency')}
        </span>
      </div>

      {/* Quantity */}
      <div className="quantity flex items-center gap-2 h-12.25">
        {/* Decrease Button */}
        <Button
          onClick={() => quantityChange(-1)}
          variant={'secondary'}
          disabled={quantity <= 1 || isPending}
          className="minus w-12.25 h-full cursor-pointer"
        >
          <Minus className="size-5" />
        </Button>

        {/* Quantity Input */}
        <Input
          // value={format.number(quantity, 'items-count')}
          value={inputValue}
          onChange={(e) => setInputValue(Number(e.target.value) || 0)}
          onBlur={() => commitQuantity(inputValue)}
          onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
          disabled={isPending}
          type="number"
          className="w-25.75 h-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />

        {/* Increase Button */}
        <Button
          onClick={() => quantityChange(1)}
          variant={'secondary'}
          disabled={isMaxStock || isPending}
          className="plus w-12.25 h-full cursor-pointer"
        >
          <Plus className="size-5" />
        </Button>
      </div>
    </div>
  );
}
