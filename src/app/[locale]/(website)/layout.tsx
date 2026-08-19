import { ConditionalHeader } from '@/features/header/components/shared/conditional-header'
import { getWishlist } from '@/features/wish-list/apis/get-wishlist';
import { getNextAuthToken } from '@/shared/lib/utils/auth.utils';
import React from 'react'

export default async function layout({ children }: { children: React.ReactNode }) {
  const jwt = await getNextAuthToken();
  let wishlistCount = 0;
  if (jwt?.token) {
    try {
      wishlistCount = (await getWishlist()).length;
    } catch {
      wishlistCount = 0;
    }
  }
  return (
    <>
      <ConditionalHeader wishlistCount={wishlistCount} />
      {children}
    </>
  )
}
