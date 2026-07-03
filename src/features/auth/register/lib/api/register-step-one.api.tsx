import { IEmailVerificationResponse } from '@/shared/lib/types/auth';

export default async function emailVerificationApi(email: string) {
  // const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(
    'https://rose-app.elevate-bootcamp.cloud/api/auth/send-email-verification',
    {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const data: IApiResponse<IEmailVerificationResponse> = await res.json();

  if (data?.status !== true) {
    throw new Error(data?.message);
  }

  return data;
}
