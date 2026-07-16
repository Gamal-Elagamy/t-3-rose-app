import MostPopularProductsGrid from './most-popular-products-grid';
import { getMostPopularOccasionProducts } from '../../lib/utils/most-popular-data';
import { MostPopularTabList, MostPopularTabPanel } from './most-popular-shared-tabs';

export async function MostPopularTabListSlot() {
  const occasionProducts = await getMostPopularOccasionProducts();

  if (occasionProducts.length === 0) {
    return null;
  }

  const occasions = occasionProducts.map(({ occasion }) => occasion);

  return <MostPopularTabList occasions={occasions} />;
}

export async function MostPopularProductPanelsSlot() {
  const occasionProducts = await getMostPopularOccasionProducts();

  if (occasionProducts.length === 0) {
    return null;
  }

  return (
    <>
      {occasionProducts.map(({ occasion, products }) => (
        <MostPopularTabPanel key={occasion.id} occasionId={occasion.id}>
          <MostPopularProductsGrid products={products} />
        </MostPopularTabPanel>
      ))}
    </>
  );
}
