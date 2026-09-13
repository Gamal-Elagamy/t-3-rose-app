import ItemEditPage from '@/features/(admin)/cat-occ-pages/components/item-edit-page';

export default async function EditCategoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) {
  return <ItemEditPage page="categories" searchParams={searchParams} />;
}
