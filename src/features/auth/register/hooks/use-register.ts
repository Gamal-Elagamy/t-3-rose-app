import { useMutation } from '@tanstack/react-query';
import registerAPI from '../lib/api/register.api';

export default function useRegister() {
  const { data, error, isPending, mutate } = useMutation({
    mutationFn: registerAPI,
  });
  return { data, error, isPending, registerAPI: mutate };
}
