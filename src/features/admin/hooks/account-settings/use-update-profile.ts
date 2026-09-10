import updateProfileAction from '@/features/account-settings/actions/update-profile.action';
import { useMutation } from '@tanstack/react-query';
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
