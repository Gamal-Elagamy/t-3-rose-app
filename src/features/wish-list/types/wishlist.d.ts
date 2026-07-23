import { IProduct } from '@/features/products/types/product';

export interface WishlistItemRequest {
  productId: string;
}

export interface WishlistItem {
  id: string;
  userId: string;
  productId: string;
  createdAt: string;
  product: IProduct;
}

export interface AddToWishlistPayload {
  wishlistItem: WishlistItem;
}

export interface RemoveWishlistItemRequest {
  id: string;
}

export interface GuestWishlistItem {
  productId: string;
}
