import { useMutation } from '@tanstack/react-query';
import updateProfileAction from '../actions/update-profile.action';

export default function useUpdateProfile() {
  const { data, mutateAsync, isPending, error } = useMutation({
    mutationFn: updateProfileAction,
  });
  return { data, updateProfileAction: mutateAsync, isPending, error };
}
