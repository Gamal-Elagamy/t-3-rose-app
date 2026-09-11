import ItemEditPage from '@/features/(admin)/cat-occ-pages/components/item-edit-page';

export default async function EditOccasionPage({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) {
  return <ItemEditPage page="occasions" searchParams={searchParams} />;
}
