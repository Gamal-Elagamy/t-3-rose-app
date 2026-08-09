import { useMutation } from '@tanstack/react-query';
import { UpdatePasswordFormData } from '../types/account';
import { updatePasswordAction } from '../actions/account.action';

export default function useUpdatePassword() {
  return useMutation({
    mutationKey: ['update-password'],
    mutationFn: async (values: UpdatePasswordFormData) => {
      const response = await updatePasswordAction(values);

      if (!response.status) {
        if (response?.errors && Array.isArray(response.errors)) {
          throw response.errors;
        } else if (response?.message) {
          throw response.message;
        }
      }

      return response;
    },
  });
}
