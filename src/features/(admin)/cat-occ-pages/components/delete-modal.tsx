import { Button } from '@/shared/components/ui/button';
import { Trash2, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ItemPageType } from '../types/page-type';
import { itemPageConfig } from '../config/item-page.config';
import { useModalLock } from '../hooks/use-modal-lock';

interface IProps {
  page: ItemPageType;
  setShowModalDelete: (value: boolean) => void;
  handleDelete: () => void;
  isPending: boolean;
}

export default function DeleteModal({ page, setShowModalDelete, handleDelete, isPending }: IProps) {
  // Translations
  const t = useTranslations(itemPageConfig[page].translationNamespace);

  // Function
  function closeModal() {
    setShowModalDelete(false);
  }

  // Lock modal Effect
  useModalLock(true, closeModal);

  return (
    <div
      onClick={closeModal}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <div onClick={(e) => e.stopPropagation()} className="w-118.5 p-6 rounded-2xl bg-ds-bg-plain">
        {/* Confirm info */}
        <div className="flex flex-col gap-6 items-center justify-center">
          <X onClick={closeModal} className="self-end size-6.5 text-ds-text-soft cursor-pointer" />
          <Trash2 className="size-7.5 text-ds-text-plain w-17.5 h-17.5 rounded-full bg-ds-bg-soft border-[17.5px] border-ds-border-muted" />
          <p className="font-semibold text-xl text-ds-text-plain">
            {t('deleteConfirmDescription')}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-2.5 mt-13">
          {/* Cancle Delete Button */}
          <Button
            onClick={() => setShowModalDelete(false)}
            variant={'subtle'}
            className="flex-1 cursor-pointer"
          >
            {t('cancle')}
          </Button>

          {/* Confirm Delete Button */}
          <Button
            disabled={isPending}
            onClick={handleDelete}
            variant={'destructive'}
            className="flex-1 cursor-pointer"
          >
            {isPending ? t('deleteing') : t('delete')}
          </Button>
        </div>
      </div>
    </div>
  );
}
