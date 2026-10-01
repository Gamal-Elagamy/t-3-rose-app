'use server';

import { IForgotPasswordResponse } from '../types/forget-password';
import { EmailFormData } from '../schema/forget-password.schema';
import { IApiResponse } from '@/shared/lib/types/api';
import { getApiBaseUrl } from '@/shared/lib/utils/api-url';

export async function forgotPasswordApi(data: EmailFormData) {
  const response = await fetch(`${getApiBaseUrl()}/auth/forgot-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const payload: IApiResponse<IForgotPasswordResponse> = await response.json();

  return payload;
}
