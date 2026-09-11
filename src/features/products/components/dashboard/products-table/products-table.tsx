'use client';
import { useProductsFilters } from '@/features/products/hooks/use-products-filters';
import { ProductRowActions } from './product-row-actions';
import { IProduct } from '@/features/products/types/products';
import { ProductsListMobile } from './products-list-mobile';
import { useTranslations } from 'next-intl';
import { formatPrice } from '@/shared/lib/utils/price.utils';
import { ProductsPagination } from './products-pagination';

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
  const t = useTranslations('dashboard.products.list');
  const { page, setPage, isPending } = useProductsFilters();
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-16 text-center">
        <p className="text-sm text-ds-text-muted">{t('empty')}</p>
      </div>
    );
  }
  return (
    <div className={isPending ? 'opacity-60' : ''}>
      {/* Desktop */}
      <table className="hidden w-full border-collapse lg:table">
        <thead>
          <tr className="border-b border-ds-border-subtle text-start text-sm text-ds-text-muted">
            <th className="px-4 py-3 text-start font-medium">{t('columns.name')}</th>
            <th className="px-4 py-3 text-start font-medium">{t('columns.price')}</th>
            <th className="px-4 py-3 text-start font-medium">{t('columns.stock')}</th>
            <th className="px-4 py-3 text-start font-medium">{t('columns.sales')}</th>
            <th className="px-4 py-3 text-start font-medium">{t('columns.ratings')}</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b border-ds-border-subtle text-sm">
              <td className="px-4 py-3">{product.title}</td>
              <td className="px-4 py-3">{formatPrice(Number(product.price))}</td>
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
      <div className="mt-4">
        <ProductsPagination totalPages={metadata.totalPages} />
      </div>
    </div>
  );
}