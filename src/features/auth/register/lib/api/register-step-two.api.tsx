import { IEmailVerificationResponse } from '@/shared/lib/types/auth';

interface IConfirmEmail {
  email: string;
  code: string;
}

export default async function confirmEmailVerificationApi(confirmEmail: IConfirmEmail) {
  // const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(
    'https://rose-app.elevate-bootcamp.cloud/api/auth/confirm-email-verification',
    {
      method: 'POST',
      body: JSON.stringify(confirmEmail),
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
