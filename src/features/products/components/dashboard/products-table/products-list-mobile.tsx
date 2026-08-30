'use client';

import { Ellipsis, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { Link } from '@/i18n/navigation';
import { DeleteProductDialog } from './delete-product-dialog';
import { IProduct } from '@/features/products/types/products';

interface ProductsListMobileProps {
  products: IProduct[];
}

export function ProductsListMobile({ products }: ProductsListMobileProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  return (
    <div className="flex flex-col lg:hidden">
      <div className="grid grid-cols-[1fr_auto_auto_auto] gap-2 border-b border-ds-border-subtle px-3 py-2 text-xs text-ds-text-muted">
        <span>Name</span>
        <span>Price</span>
        <span>Stock</span>
        <span />
      </div>

      {products.map((product) => (
        <div
          key={product.id}
          className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-2 border-b border-ds-border-subtle px-3 py-3 text-sm"
        >
          <span className="line-clamp-1">{product.title}</span>
          <span>{product.price} EGP</span>
          <span className={product.stock === 0 ? 'text-ds-text-danger' : 'text-ds-text-default'}>
            {product.stock}
          </span>

          <DropdownMenu>
            <DropdownMenuTrigger aria-label="Product actions">
              <Ellipsis className="size-4 text-ds-text-muted" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem render={<Link href={`/admin/products/update-product/${product.id}`} />}>
                <Pencil className="size-3.5" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setDeletingId(product.id)}
                className="text-ds-text-danger"
              >
                <Trash2 className="size-3.5" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ))}

      <DeleteProductDialog
        productId={deletingId ?? ''}
        open={deletingId !== null}
        onOpenChange={(open) => !open && setDeletingId(null)}
      />
    </div>
  );
}