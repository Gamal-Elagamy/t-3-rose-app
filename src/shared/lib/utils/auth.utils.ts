import { decode } from 'next-auth/jwt';
import { cookies } from 'next/headers';

export async function getNextAuthToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get(process.env.NEXTAUTH_SESSION_COOKIE!)?.value;

  try {
    const jwt = await decode({
      token,
      secret: process.env.NEXTAUTH_SECRET!,
    });
    return jwt;
  } catch (error) {
    void error;
    return null;
  }
}
