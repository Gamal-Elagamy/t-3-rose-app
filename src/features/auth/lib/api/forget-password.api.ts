'use server';
import { IForgetPassordResponse } from '../type/forget-password';
import { EmailFormData } from './../../schema/forget-password.schema';
export async function ForgetPassword(data: EmailFormData) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const payload: IApiResponse<IForgetPassordResponse> = await response.json();
  return payload;
}
