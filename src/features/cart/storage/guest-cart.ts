import { GUEST_CART_KEY } from '../constants/cart';
import { GuestCartItem } from '../types/cart';

export function getGuestCart(): GuestCartItem[] {
  if (typeof window === 'undefined') {
    return [];
  }

  const cart = localStorage.getItem(GUEST_CART_KEY);

  if (!cart) {
    return [];
  }

  return JSON.parse(cart);
}

export function setGuestCart(cart: GuestCartItem[]) {
  localStorage.setItem(GUEST_CART_KEY, JSON.stringify(cart));
}

export function addGuestCartItem(guestCartItem: GuestCartItem) {
  const cart = getGuestCart();

  const existingItem = cart.find((item) => item.productId === guestCartItem.productId);

  if (existingItem) {
    existingItem.quantity += guestCartItem.quantity;
  } else {
    cart.push(guestCartItem);
  }

  setGuestCart(cart);
}

export function clearGuestCart() {
  localStorage.removeItem(GUEST_CART_KEY);
}
