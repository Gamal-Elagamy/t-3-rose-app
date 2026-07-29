import { IApiResponse } from '@/shared/lib/types/api';
import { ILoginResponse } from '@/shared/lib/types/auth';

interface LoginPayload {
  username: string;
  password: string;
}

export async function loginApi(payload: LoginPayload) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data: IApiResponse<ILoginResponse> = await response.json();

  if (!data.status) {
    throw new Error(data.message || 'Invalid credentials');
  }

  return data.payload!;
}
