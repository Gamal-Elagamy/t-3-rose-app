import { getProducts } from '@/features/products/apis/products.api';
import { ProductsTable } from './products-table';
import { ProductsSearch } from './products-search';
import { Link } from '@/i18n/navigation';
import { Plus } from 'lucide-react';

interface ProductsPageProps {
  searchParams: Promise<{ page?: string; search?: string }>;
}

export async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { page, search } = await searchParams;

  const { data: products, metadata } = await getProducts({
    page: page ? Number(page) : 1,
    limit: 10,
    search,
  });
  const numericMetadata = {
    page: Number(metadata.page),
    limit: Number(metadata.limit),
    total: Number(metadata.total),
    totalPages: Number(metadata.totalPages),
  };

  return (
  <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between p-2">
      

        <h1 className="text-xl font-bold text-ds-text-default">All Products</h1>

          <Link
          href="/admin/products/add-product"
          className="flex items-center gap-1.5 rounded-lg bg-ds-bg-danger-saturated px-4 py-2 text-sm font-medium text-ds-text-inverse hover:bg-ds-bg-danger-faint"
        >
          <Plus className="size-4" />
           <span className="hidden sm:inline">Add a new product</span>
        </Link>
      </div>

      <ProductsSearch/>

      <ProductsTable products={products} metadata={numericMetadata} />
    </div>
  );



}