'use server';
import {
  IResetPassordTypeResponse,
  ResetPasswordPayload,
} from '@/features/auth/type/reset-password';
import { IApiResponse } from '@/shared/lib/types/api';
import { getApiBaseUrl } from '@/shared/lib/utils/api-url';
export async function resetPasswordApi(data: ResetPasswordPayload) {
  const response = await fetch(`${getApiBaseUrl()}/auth/reset-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const payload: IApiResponse<IResetPassordTypeResponse> = await response.json();

  return payload;
}
