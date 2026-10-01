import { getProducts } from './products.api';

export async function getYouMayLikeProducts() {
  const response = await getProducts({
    minRating: 4,
    limit: 20,
  });

  return response.data;
}
