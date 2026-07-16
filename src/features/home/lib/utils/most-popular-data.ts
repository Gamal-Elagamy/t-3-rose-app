import { cache } from 'react';
import { getOccasionsAction } from '@/features/occasions/apis/occasions.api';
import { getProductsAction } from '@/features/products/apis/products.api';
import { IOccasion } from '@/features/occasions/types/occasions';
import { IProduct } from '@/features/products/types/products';

const OCCASIONS_LIMIT = 4;
const PRODUCTS_PER_OCCASION = 12;

export interface OccasionProductGroup {
  occasion: IOccasion;
  products: IProduct[];
}

export const getMostPopularOccasionProducts = cache(async (): Promise<OccasionProductGroup[]> => {
  const occasions = await getOccasionsAction({ limit: OCCASIONS_LIMIT });

  if (!Array.isArray(occasions) || occasions.length === 0) {
    return [];
  }

  const productsByOccasion = await Promise.all(
    occasions.map((occasion) =>
      getProductsAction({ occasionId: occasion.id, limit: PRODUCTS_PER_OCCASION })
    )
  );

  return occasions.map((occasion, index) => ({
    occasion,
    products: (Array.isArray(productsByOccasion[index])
      ? productsByOccasion[index]
      : []) as IProduct[],
  }));
});
