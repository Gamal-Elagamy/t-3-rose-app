import { useMutation } from '@tanstack/react-query';
import updateProfileAction from '../../account-settings-action/update-profile.action';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

export default function useUpdateProfile() {
  // Translations
  const t = useTranslations('accountSettings.profile');

  const { data, mutateAsync, isPending, error } = useMutation({
    mutationFn: updateProfileAction,
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : t('update-failed'));
    },
  });
  return { data, updateProfileAction: mutateAsync, isPending, error };
}
