import { Button } from '@/shared/components/ui/button';
import { Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import useDeleteAccount from '../hooks/use-delete-account';
import { toast } from 'sonner';
import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { Input } from '@/shared/components/ui/input';
import { Field } from '@/shared/components/ui/field';

export default function DeleteAccountConfirmation({
  onClose,
}: {
  onClose: (value: boolean) => void;
}) {
  // Translations
  const t = useTranslations('accountSettings.profile');

  const [confirmText, setConfirmText] = useState('');
  const confirmWord = t('confirm-word');
  const isMatch = confirmText.trim() === confirmWord;

  // Mutation
  const { deleteAccountAction, isPending } = useDeleteAccount();

  // Close Function
  function closeModel() {
    onClose(false);
  }

  // Delete Account Function
  function handleDeleteAccount() {
    if (!isMatch) return;

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
      onClick={() => closeModel()}
      className="overlay absolute bg-black/50 top-0 bottom-0 inset-s-0 inset-e-0 flex items-center justify-center rounded-4xl"
    >
      <div onClick={(e) => e.stopPropagation()} className="w-118.5 rounded-2xl p-6 bg-ds-bg-plain">
        {/* Confirm info */}
        <div className="flex flex-col gap-6 items-center justify-center">
          <X onClick={closeModel} className="self-end size-6.5 text-ds-text-soft cursor-pointer" />
          <Trash2 className="size-7.5 text-ds-text-plain w-17.5 h-17.5 rounded-full bg-ds-bg-soft border-[17.5px] border-ds-border-muted" />
          <div className="flex flex-col gap-2.5 items-center justify-center">
            {/* Title */}
            <h3 className="font-semibold text-xl text-ds-text-plain">{t('title')}</h3>

            {/* Description */}
            <p className="font-normal text-base text-maroon-500">{t('description')}</p>
          </div>
        </div>

        {/* Confirm word input */}
        <Field className="mt-6">
          <label htmlFor="delete-confirm-input">
            {t('confirm-word-label', { word: confirmWord })}
          </label>
          <Input
            id="delete-confirm-input"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder={confirmWord}
            dir="auto"
            autoComplete="off"
            autoFocus
            disabled={isPending}
            aria-label={t('confirm-word-label', { word: confirmWord })}
            className="text-center"
          />
        </Field>

        {/* Button */}
        <div className="flex items-center justify-center gap-2.5 mt-13">
          {/* Cancle Delete Button */}
          <Button
            variant={'subtle'}
            onClick={closeModel}
            disabled={isPending}
            className="font-medium flex-1 cursor-pointer"
          >
            {t('cancel')}
          </Button>

          {/* Confirm Delete Button */}
          <Button
            onClick={handleDeleteAccount}
            variant={'destructive'}
            disabled={isPending || !isMatch}
            className="font-medium flex-1 cursor-pointer"
          >
            {isPending ? t('deleting') : t('confirm')}
          </Button>
        </div>
      </div>
    </div>
  );
}
