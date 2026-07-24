'use client';

import { CategoryFilter } from './category-filter';
import { OccasionFilter } from './occasion-filter';
import { useCategories } from './hooks/use-categories';
import { useOccasions } from './hooks/use-occasions';

export function SidebarFilters() {
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();
  const { data: occasions = [], isLoading: occasionsLoading } = useOccasions();

  return (
    <div className="w-72 flex flex-col gap-6">
      {categoriesLoading ? (
        <p>Loading categories...</p>
      ) : (
        <CategoryFilter categories={categories} />
      )}

      {occasionsLoading ? <p>Loading occasions...</p> : <OccasionFilter occasions={occasions} />}
    </div>
  );
}
