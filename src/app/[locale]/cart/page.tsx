import { authOptions } from '@/auth';
import getUserCart from '@/features/cart/api/get-user-cart';
import Cart from '@/features/cart/components/cart';
import CartContextProviders from '@/features/cart/context/cart.context';
import CartSkeleton from '@/shared/components/cart-skeleton';
import { getServerSession } from 'next-auth';
import { Suspense } from 'react';

export default async function CartPage() {
  const session = await getServerSession(authOptions);

  const cartData = session ? getUserCart() : null;

  return (
    <Suspense fallback={<CartSkeleton />}>
      <CartContextProviders cartData={cartData}>
        <Cart />
      </CartContextProviders>
    </Suspense>
  );
}
