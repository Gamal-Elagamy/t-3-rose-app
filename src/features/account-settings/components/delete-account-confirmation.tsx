import { Button } from '@/shared/components/ui/button';
import { Trash, X } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import useDeleteAccount from '../hooks/use-delete-account';

export default function DeleteAccountConfirmation({
  onClose,
}: {
  onClose: (value: boolean) => void;
}) {
  // Translations
  const t = useTranslations('accountSettings.profile');

  // Mutation
  const { deleteAccountAction, isPending } = useDeleteAccount();

  // Close Function
  function closeModel() {
    onClose(false);
  }

  // Delete Account Function
  function handleDeleteAccount() {
    deleteAccountAction(undefined, {
      onSuccess: async () => {
        toast.success(t('delete-success'));
        onClose(false);
        await signOut({ callbackUrl: '/login' });
      },
      onError: () => {
        toast.error(t('delete-failed'));
      },
    });
  }

  // Effect State
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      onClick={closeModel}
      className="overlay absolute inset-0 z-50 flex items-center justify-center rounded-4xl bg-black/50 p-4 sm:p-6"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-118.5 rounded-2xl bg-ds-bg-plain p-4 sm:p-6"
      >
        {/* Confirm info */}
        <div className="flex flex-col items-center justify-center gap-4 sm:gap-6">
          <X onClick={closeModel} className="size-6.5 self-end cursor-pointer text-ds-text-soft" />

          <div className="rounded-full bg-zinc-100 p-3 sm:p-4">
            <Trash className="h-14 w-14 rounded-full border-14px border-ds-border-muted bg-ds-bg-soft text-ds-text-plain sm:h-17.5 sm:w-17.5 sm:border-[17.5px]" />
          </div>

          <div className="flex flex-col items-center justify-center gap-2.5 text-center">
            {/* Title */}
            <h3 className="text-lg font-semibold text-ds-text-plain sm:text-xl">{t('title')}</h3>

            {/* Description */}
            <p className="text-sm font-normal text-maroon-500 sm:text-base">{t('description')}</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex w-full items-center justify-center gap-2.5 sm:mt-13">
          {/* Cancel Delete Button */}
          <Button
            variant="subtle"
            onClick={closeModel}
            disabled={isPending}
            className="min-w-0 flex-1 cursor-pointer font-medium"
          >
            {t('cancel')}
          </Button>

          {/* Confirm Delete Button */}
          <Button
            onClick={handleDeleteAccount}
            variant="destructive"
            disabled={isPending}
            className="min-w-0 flex-1 cursor-pointer font-medium"
          >
            {isPending ? t('deleting') : t('confirm')}
          </Button>
        </div>
      </div>
    </div>
  );
}
