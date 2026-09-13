import { useMutation } from '@tanstack/react-query';
import uploadImageAction from '../actions/upload-image-action';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

export default function useUploadImage() {
  // Translation
  const t = useTranslations('dashboard.categoriesPage.fields.errors');

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: uploadImageAction,
    onError: () => {
      toast.error(t('imageTooLarge'));
    },
  });
  return { uploadImageAction: mutateAsync, isPending, error };
}
