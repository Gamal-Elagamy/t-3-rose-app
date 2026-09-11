'use server';
import { getNextAuthToken } from '@/shared/lib/utils/auth.utils';
import { UpdatePasswordFormData } from '../types/account';
import { IApiError, IApiResponse } from '@/shared/lib/types/api';
import { getApiBaseUrl } from '@/shared/lib/utils/api-url';
import { HEADERS } from '@/shared/constant/api-header.constants';

export const updatePasswordAction = async (
  values: UpdatePasswordFormData
): Promise<IApiResponse<undefined>> => {
  const jwt = await getNextAuthToken();
  const token = jwt?.token;

  if (!token) {
    return {
      status: false,
      message: 'No token provided',
      code: 401,
    } as IApiError;
  }

  const response = await fetch(`${getApiBaseUrl()}/users/change-password`, {
    method: 'POST',
    headers: {
      ...HEADERS.JSON,
      ...HEADERS.AUTH(token),
    },
    body: JSON.stringify(values),
  });

  const data: IApiResponse<undefined> = await response.json();

  return data;
};
