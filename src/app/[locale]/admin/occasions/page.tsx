import ItemListPage from '@/features/(admin)/cat-occ-pages/components/item-list-page';
import { GetProductsParams } from '@/features/products/apis/products.api';

export default async function OccasionsPage({
  searchParams,
}: {
  searchParams: Promise<GetProductsParams & { search?: string }>;
}) {
  return <ItemListPage page="occasions" searchParams={searchParams} />;
}
