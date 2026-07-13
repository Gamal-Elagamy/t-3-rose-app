import { useMutation } from '@tanstack/react-query';
import emailVerificationApi from '../lib/api/register-step-one.api';

export default function useRegisterStepOne() {
  const { data, error, isPending, mutate } = useMutation({
    mutationFn: emailVerificationApi,
  });
  return { data, error, isPending, emailVerificationApi: mutate };
}
