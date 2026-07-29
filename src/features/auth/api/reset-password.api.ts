'use server';
import {
  IResetPassordTypeResponse,
  ResetPasswordPayload,
} from '@/features/auth/type/reset-password';
import { IApiResponse } from '@/shared/lib/types/api';
export async function resetPasswordApi(data: ResetPasswordPayload) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const payload: IApiResponse<IResetPassordTypeResponse> = await response.json();

  return payload;
}
