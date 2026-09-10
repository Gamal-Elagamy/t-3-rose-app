import { useMutation } from '@tanstack/react-query';
import deleteAccountAction from '../../account-settings-action/delete-account.action';

export default function useDeleteAccount() {
  const { data, mutate, isPending, error } = useMutation({
    mutationFn: deleteAccountAction,
  });
  return { data, deleteAccountAction: mutate, isPending, error };
}
