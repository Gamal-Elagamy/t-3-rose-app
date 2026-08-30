'use client';
import { useProductsFilters } from '@/features/products/hooks/use-products-filters';
import { ProductRowActions } from './product-row-actions';
import { IProduct } from '@/features/products/types/products';
import { ProductsListMobile } from './products-list-mobile';

interface ProductsTableProps {
  products: IProduct[];
  metadata: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export function ProductsTable({ products, metadata }: ProductsTableProps) {
  const { page, setPage, isPending } = useProductsFilters();

  return (
    <div className={isPending ? 'opacity-60' : ''}>
      {/* Desktop */}
      <table className="hidden w-full border-collapse lg:table">
        <thead>
          <tr className="border-b border-ds-border-subtle text-start text-sm text-ds-text-muted">
            <th className="px-4 py-3 text-start font-medium">Name</th>
            <th className="px-4 py-3 text-start font-medium">Price</th>
            <th className="px-4 py-3 text-start font-medium">Stock</th>
            <th className="px-4 py-3 text-start font-medium">Sales</th>
            <th className="px-4 py-3 text-start font-medium">Ratings</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b border-ds-border-subtle text-sm">
              <td className="px-4 py-3">{product.title}</td>
              <td className="px-4 py-3">{product.price}</td>
              <td className="px-4 py-3">{product.stock}</td>
              <td className="px-4 py-3">{product._count.orderItems}</td>
              <td className="px-4 py-3">
                {product.rating}/5 ({product.ratings})
              </td>
              <td className="px-4 py-3">
                <ProductRowActions productId={product.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile */}
      <ProductsListMobile products={products} />

      {/* Pagination*/}
      <div className="mt-4 flex items-center justify-center gap-2">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
          className="rounded px-3 py-1 text-sm disabled:opacity-40"
        >
          Prev
        </button>
        <span className="text-sm text-ds-text-muted">
          {page} / {metadata.totalPages}
        </span>
        <button
          type="button"
          disabled={page >= metadata.totalPages}
          onClick={() => setPage(page + 1)}
          className="rounded px-3 py-1 text-sm disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}