'use server';
import {
  IResetPassordTypeResponse,
  ResetPasswordPayload,
} from '@/features/auth/lib/type/reset-password';
export async function ResetPassword(data: ResetPasswordPayload) {
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
