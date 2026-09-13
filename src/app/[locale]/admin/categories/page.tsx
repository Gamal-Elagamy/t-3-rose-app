import ItemListPage from '@/features/(admin)/cat-occ-pages/components/item-list-page';
import { GetProductsParams } from '@/features/products/apis/products.api';

export default async function CategoriesPage({
  searchParams,
}: {
  searchParams: Promise<GetProductsParams & { search?: string }>;
}) {
  return <ItemListPage page="categories" searchParams={searchParams} />;
}
