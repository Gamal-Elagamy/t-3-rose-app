import deleteAccountAction from '@/features/account-settings/actions/delete-account.action';
import { useMutation } from '@tanstack/react-query';

export default function useDeleteAccount() {
  const { data, mutate, isPending, error } = useMutation({
    mutationFn: deleteAccountAction,
  });
  return { data, deleteAccountAction: mutate, isPending, error };
}
