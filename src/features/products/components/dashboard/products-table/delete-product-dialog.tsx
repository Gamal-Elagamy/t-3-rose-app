'use client';

import { useTransition } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/button';
import { deleteProduct } from '@/features/products/actions/delete-product.action';
import { useTranslations } from 'next-intl';

interface DeleteProductDialogProps {
  productId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteProductDialog({ productId, open, onOpenChange }: DeleteProductDialogProps) {
  const t = useTranslations('dashboard.products.list.deleteDialog');
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      await deleteProduct(productId);
      onOpenChange(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-ds-text-muted">
          {t('description')}
        </p>

        <DialogFooter>
          <Button variant="secondary" onClick={() => onOpenChange(false)} disabled={isPending}>
           {t('cancel')}
          </Button>
          <Button variant="destructive" onClick={handleDelete} isLoading={isPending}>
            {t('confirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}