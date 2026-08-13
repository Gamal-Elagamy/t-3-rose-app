import { getProduct } from '@/features/products/apis/products.api';
import { IProduct } from '@/features/products/types/products';

export async function getCartProductsData(productIds: string[]): Promise<IProduct[]> {
  if (!productIds || productIds.length === 0) return [];

  const result = await Promise.allSettled(productIds.map((id) => getProduct(id)));

  return result
    .filter((res) => res.status === 'fulfilled')
    .map((res) => (res as PromiseFulfilledResult<IProduct>).value);
}
