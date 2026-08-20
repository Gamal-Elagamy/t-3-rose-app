import { useMutation } from '@tanstack/react-query';
import { UpdatePasswordFormData } from '../types/account';
import { updatePasswordAction } from '../actions/account.action';
import { AccountSettingsApiError } from '../lib/account-settings-api-error';

export default function useUpdatePassword() {
  return useMutation({
    mutationKey: ['update-password'],
    mutationFn: async (values: UpdatePasswordFormData) => {
      const response = await updatePasswordAction(values);

      if (!response.status) {
        throw AccountSettingsApiError.fromApiResponse(response);
      }

      return response;
    },
  });
}
