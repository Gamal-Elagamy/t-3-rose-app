'use client';

import { useSyncExternalStore } from 'react';
import { getGuestWishlist} from '../storage/guest-wishlist'; 

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
}

function getSnapshot() {
  return getGuestWishlist().length;
}

function getServerSnapshot() {
  return 0;
}

export function useGuestWishlistCount() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}