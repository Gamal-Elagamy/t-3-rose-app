'use client';

import { Link } from '@/i18n/navigation';
import { Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { DeleteProductDialog } from './delete-product-dialog';

interface ProductRowActionsProps {
  productId: string;
}

export function ProductRowActions({ productId }: ProductRowActionsProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-3">
        <Link
          href={`/admin/products/update-product/${productId}`}
          className="flex items-center gap-1 rounded-xl bg-ds-bg-info-faint p-1 text-sm text-ds-text-info hover:bg-ds-bg-info-fade"
        >
          <Pencil className="size-3.5" />
          Edit
        </Link>

        <button
          type="button"
          onClick={() => setIsDeleteDialogOpen(true)}
          className="flex items-center gap-1 rounded-xl bg-ds-bg-primary-faint hover:bg-ds-bg-primary-fade p-1 text-sm text-ds-text-danger"
        >
          <Trash2 className="size-3.5" />
          Delete
        </button>
      </div>

      <DeleteProductDialog
        productId={productId}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      />
    </>
  );
}