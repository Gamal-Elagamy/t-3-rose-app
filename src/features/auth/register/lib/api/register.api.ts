import { IRegisterResponse } from '@/shared/lib/types/auth';
import { IRegisterFields } from '../types/register';
import { IApiResponse } from '@/shared/lib/types/api';

export default async function registerAPI(fields: IRegisterFields) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/auth/register`, {
    method: 'POST',
    body: JSON.stringify(fields),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data: IApiResponse<IRegisterResponse> = await res.json();

  if (data?.status !== true) {
    throw new Error(data?.message);
  }

  return data;
}
