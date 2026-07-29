import { GUEST_CART_KEY } from '../constants/cart';
import { GuestCartItem } from '../types/cart';

// Get guest cart from localStorage
export function getGuestCart(): GuestCartItem[] {
  if (typeof window === 'undefined') {
    return [];
  }

  const cart = localStorage.getItem(GUEST_CART_KEY);

  if (!cart) {
    return [];
  }

  try {
    return JSON.parse(cart);
  } catch {
    localStorage.removeItem(GUEST_CART_KEY);
    return [];
  }
}

// Save guest cart to localStorage
export function setGuestCart(cart: GuestCartItem[]) {
  localStorage.setItem(GUEST_CART_KEY, JSON.stringify(cart));
}

// Add item to guest cart
export function addGuestCartItem(guestCartItem: GuestCartItem) {
  const cart = getGuestCart();

  const existingItem = cart.find((item) => item.productId === guestCartItem.productId);

  if (existingItem) {
    const updatedCart = cart.map((item) =>
      item.productId === guestCartItem.productId
        ? {
            ...item,
            quantity: item.quantity + guestCartItem.quantity,
          }
        : item
    );

    setGuestCart(updatedCart);
    return;
  }

  setGuestCart([...cart, guestCartItem]);
}

// Clear guest cart
export function clearGuestCart() {
  localStorage.removeItem(GUEST_CART_KEY);
}
