import { IProduct } from '@/features/products/types/products';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Minus, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { CartItemRequest } from '../types/cart';
import useDeleteCartItem from '../hooks/use-delete-item-cart';
import useUpdateCartItem from '../hooks/use-update-item-cart';
import { useRouter } from '@/i18n/navigation';
import { useCart } from '../context/cart.context';
import { useFormatter, useLocale, useTranslations } from 'next-intl';
import { formatLocaleNumber } from '@/shared/lib/utils/format-number';

export default function CartFooter({ product }: { product: IProduct }) {
  // Translations
  const t = useTranslations('cart-list');
  const format = useFormatter();

  const locale = useLocale();

  // Cart Context
  const { cartList, isAuthenticated, cartItems, setCartItems } = useCart();

  // Router
  const router = useRouter();

  // Delete user Cart Hook
  const { deleteUserCart, isPending } = useDeleteCartItem();

  // Update user Cart Hook
  const { updateUserCart, isPending: isUpdating } = useUpdateCartItem();

  // Quantity State
  const [quantity, setQuantity] = useState(1);

  // Get Item Quanity
  const itemQuantity = isAuthenticated
    ? cartList?.find((item) => item.productId === product.id)?.quantity
    : cartItems.filter((item) => product.id === item.productId)[0]?.quantity;

  // Stock Quanity Condition
  const isMaxStock = quantity >= product.stock;

  // Loading
  const isLoading = isPending || isUpdating;

  // Quanitity Change
  function quantityChange(num: number) {
    if (num > 0 && quantity >= product.stock) return;

    const newQuantity = quantity + num;

    if (!isAuthenticated) {
      let updatedCartItems: CartItemRequest[];

      if (newQuantity <= 0) {
        updatedCartItems = cartItems.filter((item) => item.productId !== product.id);
      } else {
        updatedCartItems = cartItems.map((item) =>
          item.productId === product.id ? { ...item, quantity: newQuantity } : item
        );
      }

      localStorage.setItem('guest-cart', JSON.stringify(updatedCartItems));
      setCartItems(updatedCartItems);
      setQuantity(newQuantity <= 0 ? 0 : newQuantity);
      return;
    }

    // Authenticated user
    const cartItem = cartList?.find((item) => item.productId === product.id);
    if (!cartItem) return;

    if (newQuantity <= 0) {
      deleteUserCart(cartItem.id, {
        onSuccess: () => {
          router.refresh();
        },
        onError: () => setQuantity(itemQuantity ?? 1),
      });
    } else {
      updateUserCart(
        { cartItemId: cartItem.id, quantity: newQuantity },
        {
          onSuccess: () => {
            router.refresh();
          },
          onError: () => setQuantity(itemQuantity ?? 1),
        }
      );
    }
    setQuantity(newQuantity <= 0 ? 0 : newQuantity);
  }

  useEffect(() => {
    if (itemQuantity !== undefined) {
      setTimeout(() => setQuantity(itemQuantity));
    } else {
      setTimeout(() => setQuantity(1));
    }
  }, [itemQuantity]);

  return (
    <div className="footer flex justify-between">
      {/* Price */}
      <div className="price flex h-fit mt-auto gap-1">
        <span className="font-medium h-fit mt-auto text-sm text-ds-text-primary">
          {t('cart-item-quantity', { quantity })}
        </span>
        <h5 className="font-bold h-fit mt-auto text-2xl text-ds-text-plain">
          {formatLocaleNumber(parseInt(product.price) * quantity, locale)}
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
          disabled={isLoading}
          className="minus w-12.25 h-full cursor-pointer"
        >
          <Minus className="size-5" />
        </Button>

        {/* Quantity Input */}
        <Input
          value={format.number(quantity, 'items-count')}
          readOnly
          type="text"
          inputMode="numeric"
          className="w-25.75 h-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />

        {/* Increase Button */}
        <Button
          onClick={() => quantityChange(1)}
          variant={'secondary'}
          disabled={isLoading || isMaxStock}
          className="plus w-12.25 h-full cursor-pointer"
        >
          <Plus className="size-5" />
        </Button>
      </div>
    </div>
  );
}
