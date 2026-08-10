'use client';

import { useSession } from 'next-auth/react';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  use,
  useEffect,
  useState,
} from 'react';
import { CartItemRequest, CartItem } from '../types/cart';
import { IProduct } from '@/features/products/types/products';
import { getCartProducts } from '../actions/get-cart-products';
import { clearUserCart } from '../api/delete-item-cart';
import { useRouter } from '@/i18n/navigation';

type CartContextType = {
  cartList: CartItem[] | null;
  cartItems: CartItemRequest[];
  setCartItems: Dispatch<SetStateAction<CartItemRequest[]>>;
  products: IProduct[];
  isAuthenticated: boolean;
  displayedProducts: IProduct[] | undefined;
  isEmpty: boolean;
  clearCartItems: () => void;
  cartTotal: number;
  isLoading: boolean;
};

export const CartContext = createContext<CartContextType | undefined>(undefined);

export default function CartContextProviders({
  children,
  cartData,
}: {
  children: ReactNode;
  cartData?: Promise<CartItem[]> | null;
}) {
  // Get Authenticated Cart Data
  const cartList = cartData ? use(cartData) : null;

  // Get Session and Authenticated Status
  const { data: session, status } = useSession();
  const isAuthenticated = !!session;

  const router = useRouter();

  // Cart items State
  const [cartItems, setCartItems] = useState<CartItemRequest[]>([]);

  // Products State
  const [products, setProducts] = useState<IProduct[]>([]);

  const [isLoading, setIsLoading] = useState(!isAuthenticated);

  // Clear Cart Function
  function clearCartItems() {
    if (!isAuthenticated) {
      localStorage.removeItem('guest-cart');
      setCartItems([]);
    } else {
      clearUserCart();
      router.refresh();
    }
  }

  // Effect: load guest cart from localStorage
  useEffect(() => {
    if (status === 'loading') return;

    if (isAuthenticated) {
      setTimeout(() => {
        setIsLoading(false);
      });
      return;
    }

    if (!isAuthenticated) {
      const guestCart = localStorage.getItem('guest-cart');
      setTimeout(() => {
        setCartItems(guestCart ? JSON.parse(guestCart) : []);
        setIsLoading(false);
      });
    }
  }, [isAuthenticated, status]);

  // Effect: fetch products based on cart items
  useEffect(() => {
    if (isAuthenticated) return;
    if (cartItems.length === 0) {
      setTimeout(() => setProducts([]));
      return;
    }

    const productIds = cartItems.map((item) => item.productId);
    getCartProducts(productIds).then(setProducts);
  }, [cartItems, isAuthenticated]);

  const displayedProducts = isAuthenticated ? cartList?.map((item) => item.product) : products;
  const isEmpty = isAuthenticated ? cartList?.length === 0 : products.length === 0;

  // Cart Total Price
  const cartTotal = isAuthenticated
    ? (cartList?.reduce((sum, item) => sum + parseInt(item.product.price) * item.quantity, 0) ?? 0)
    : products.reduce((sum, product) => {
        const quantity = cartItems.find((item) => item.productId === product.id)?.quantity ?? 0;
        return sum + parseInt(product.price) * quantity;
      }, 0);

  const value: CartContextType = {
    cartList,
    cartItems,
    setCartItems,
    products,
    isAuthenticated,
    displayedProducts,
    isEmpty,
    clearCartItems,
    cartTotal,
    isLoading,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// use-cart.ts
import { useContext } from 'react';

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('Cart Context Error');
  }
  return context;
}
