import { useMutation } from '@tanstack/react-query';
import confirmEmailVerificationApi from '../lib/api/register-step-two.api';

export default function useRegisterStepTwo() {
  const { data, error, isPending, mutate } = useMutation({
    mutationFn: confirmEmailVerificationApi,
  });
  return { data, error, isPending, confirmEmailVerificationApi: mutate };
}
