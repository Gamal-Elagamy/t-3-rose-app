'use client';
import { Button } from '@/shared/components/ui/button';
import { TrashIcon } from 'lucide-react';
import useDeleteCategorieItem, { useDeleteOccasionItem } from '../hooks/use-delete-item';
import { useRouter } from '@/i18n/navigation';
import { toast } from 'sonner';
import { cn } from '@/shared/lib/utils/tailwind-cn';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ItemPageType } from '../types/page-type';
import { itemPageConfig } from '../config/item-page.config';
import DeleteModal from './delete-modal';

export default function DeleteButton({
  text,
  id,
  style,
  page,
}: {
  text: string;
  id: string;
  style: string;
  page: ItemPageType;
}) {
  // Translations
  const t = useTranslations(itemPageConfig[page].translationNamespace);

  // Navigation
  const router = useRouter();

  // State
  const [showModalDelete, setShowModalDelete] = useState(false);

  // Mutations
  const { deleteCategoriesItem, isPending: isDeletingCategory } = useDeleteCategorieItem();
  const { deleteOccasionsItem, isPending: isDeletingOccasion } = useDeleteOccasionItem();

  const isPending = page === 'categories' ? isDeletingCategory : isDeletingOccasion;

  // Function Handle Delete
  function handleDelete() {
    const deleteItem = page === 'categories' ? deleteCategoriesItem : deleteOccasionsItem;
    deleteItem(id, {
      onSuccess: () => {
        toast.success(t('deleteSuccess'));
        router.refresh();
      },
    });
  }
  return (
    <>
      {/* Delete Button */}
      <Button
        disabled={isPending}
        onClick={() => setShowModalDelete(true)}
        variant="ghost"
        className={cn('flex items-center gap-1 text-ds-text-danger cursor-pointer', style)}
      >
        <TrashIcon className="size-3.5" />
        {text}
      </Button>

      {/* Model */}
      {showModalDelete && (
        <DeleteModal
          page={page}
          handleDelete={handleDelete}
          isPending={isPending}
          setShowModalDelete={setShowModalDelete}
        />
      )}
    </>
  );
}
