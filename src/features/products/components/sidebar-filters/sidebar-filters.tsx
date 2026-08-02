import { CategoryFilter } from './category-filter';
import { OccasionFilter } from './occasion-filter';

import { getCategories } from '@/features/categories/apis/categories.api';
import { getOccasions } from '@/features/occasions/apis/occasions.api';
import { CategoryOption } from '@/features/products/types/category';
import { OccasionOption } from '@/features/products/types/occasions';
import { RatingFilter } from './rating-filter';
import { PriceFilter } from './price-filter';
import { ResetAllButton } from './reset-all-button';

export async function SidebarFilters() {
  // Data fetching - server side
  const [categoriesData, occasionsData] = await Promise.all([getCategories({}), getOccasions({})]);

  // Variables
  const categories: CategoryOption[] = categoriesData.map((cat) => ({
    value: cat.id,
    label: cat.title,
    image: cat.image,
  }));
  const occasions: OccasionOption[] = occasionsData.map((occ) => ({
    value: occ.id,
    label: occ.title,
    imageUrl: occ.image,
  }));

  return (
    <div className="w-72 flex flex-col gap-6">
      <CategoryFilter categories={categories} />
      <OccasionFilter occasions={occasions} />
      <RatingFilter />
      <PriceFilter />
      <ResetAllButton />
    </div>
  );
}
