import { IRegisterResponse } from '@/shared/lib/types/auth';
import { IRegisterFields } from '../types/register';

export default async function registerAPI(fields: IRegisterFields) {
  // const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch('https://rose-app.elevate-bootcamp.cloud/api/auth/register', {
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

  console.log(data);
  return data;
}
