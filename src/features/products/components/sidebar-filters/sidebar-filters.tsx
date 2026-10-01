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
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:flex lg:w-72 lg:flex-col">
      <CategoryFilter categories={categories} />

      <OccasionFilter occasions={occasions} />

      <RatingFilter />

      <PriceFilter />

      <div className="sm:col-span-2 lg:col-span-1">
        <ResetAllButton />
      </div>
    </div>
  );
}
