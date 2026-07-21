import { IProduct } from '@/features/products/types/products';

export interface CartItemRequest {
  productId: string;
  quantity: number;
}

export interface CartItem {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  product: IProduct;
}

export interface AddToCartPayload {
  cartItem: CartItem;
}

export interface GetCartPayload {
  cartItems: CartItem[];
}
