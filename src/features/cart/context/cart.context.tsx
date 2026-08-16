'use client';

import { useSession } from 'next-auth/react';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

// use-cart.ts
import { useContext } from 'react';
import { clearGuestCart, getGuestCart } from '../storage/guest-cart';
import { CartItem, CartItemRequest } from '../types/cart';
import { IProduct } from '@/features/products/types/products';
import { useCartProducts } from '../hooks/use-cart-products';
import getUserCart from '../api/get-user-cart';

interface ICartContextType {
  isAuthenticated: boolean;
  guestData: CartItemRequest[];
  setGuestData: Dispatch<SetStateAction<CartItemRequest[]>>;
  userData: CartItem[];
  setUserData: Dispatch<SetStateAction<CartItem[]>>;
  cartDataProducts: CartItemRequest[] | CartItem[];
  refreshCart: () => void;
  clearCartGuest: () => void;
  isEmpty: boolean;
  products: IProduct[] | undefined;
  isLoading: boolean;
  isFetching: boolean;
  totalPrice: number;
}

export const CartContext = createContext<ICartContextType | undefined>(undefined);

export default function CartContextProviders({ children }: { children: ReactNode }) {
  // Session
  const { data: session, status } = useSession();
  const isAuthenticated = !!session;

  // Guest Cart Data
  const [guestData, setGuestData] = useState<CartItemRequest[]>([]);
  const [userData, setUserData] = useState<CartItem[]>([]);

  const cartDataProducts = isAuthenticated ? userData : guestData;

  // Get Products Ids
  const productIds = cartDataProducts.map((item) => item.productId);

  // Get User Products
  const { data: products, isLoading, isFetching } = useCartProducts(productIds);

  const isEmpty = cartDataProducts.length === 0;

  // Total Price
  const totalPrice =
    products?.reduce((acc, product) => {
      const cartItem = cartDataProducts.find((item) => item.productId === product.id);
      const quantity = cartItem?.quantity ?? 0;
      return acc + Number(product.price) * quantity;
    }, 0) ?? 0;

  //Get Cart Data
  const refreshCart = useCallback(async () => {
    if (!isAuthenticated) {
      const guestCart = getGuestCart();
      setGuestData(guestCart);
      return;
    }

    try {
      const userCart = await getUserCart();
      setUserData(userCart);
    } catch (error) {
      throw new Error('Failed to get user cart:', { cause: error });
    }
  }, [isAuthenticated]);

  // Clear guest cart data
  function clearCartGuest() {
    clearGuestCart();
    setGuestData([]);
  }

  // Effect State
  useEffect(() => {
    if (status === 'loading') return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refreshCart();
  }, [isAuthenticated, status, refreshCart]);

  const value: ICartContextType = {
    isAuthenticated,
    guestData,
    setGuestData,
    userData,
    setUserData,
    cartDataProducts,
    refreshCart,
    clearCartGuest,
    isEmpty,
    products,
    isLoading,
    isFetching,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('Cart Context Error');
  }
  return context;
}
