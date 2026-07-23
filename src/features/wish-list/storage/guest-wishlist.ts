import { GUEST_WISHLIST_KEY } from '../constants/wishlist';
import { GuestWishlistItem } from '../types/wishlist';

export function getGuestWishlist(): GuestWishlistItem[] {
  if (typeof window === 'undefined') {
    return [];
  }

  const wishlist = localStorage.getItem(GUEST_WISHLIST_KEY);

  if (!wishlist) {
    return [];
  }

  return JSON.parse(wishlist);
}

export function setGuestWishlist(wishlist: GuestWishlistItem[]) {
  localStorage.setItem(GUEST_WISHLIST_KEY, JSON.stringify(wishlist));
}

export function addGuestWishlistItem(item: GuestWishlistItem) {
  const wishlist = getGuestWishlist();

  const exists = wishlist.some((wishlistItem) => wishlistItem.productId === item.productId);

  if (exists) {
    return;
  }

  wishlist.push(item);

  setGuestWishlist(wishlist);
}

export function removeGuestWishlistItem(productId: string) {
  const wishlist = getGuestWishlist();

  const updatedWishlist = wishlist.filter((item) => item.productId !== productId);

  setGuestWishlist(updatedWishlist);
}

export function toggleGuestWishlistItem(productId: string) {
  const wishlist = getGuestWishlist();

  const exists = wishlist.some((item) => item.productId === productId);

  if (exists) {
    removeGuestWishlistItem(productId);
    return false;
  }

  addGuestWishlistItem({ productId });
  return true;
}

export function clearGuestWishlist() {
  localStorage.removeItem(GUEST_WISHLIST_KEY);
}
