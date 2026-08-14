import { IProduct } from '@/features/products/types/products';

export async function getCartProducts(productIds: string[]): Promise<IProduct[]> {
  if (productIds.length === 0) return [];

  const response = await fetch(`/api/cart-products?ids=${productIds.join(',')}`);

  if (!response.ok) {
    throw new Error('Failed to fetch cart products');
  }

  return response.json();
}
