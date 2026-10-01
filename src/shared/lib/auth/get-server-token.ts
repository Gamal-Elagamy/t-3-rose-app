import { getToken } from 'next-auth/jwt';
import { cookies, headers } from 'next/headers';

export async function getServerToken(): Promise<string | null> {
  const headersList = await headers(); 

  const token = await getToken({
    req: {
      headers: Object.fromEntries(headersList),
      cookies: Object.fromEntries((await cookies()).getAll().map((c) => [c.name, c.value])),
    } as never,
    secret: process.env.NEXTAUTH_SECRET,
  });

  return (token?.token as string) ?? null;
}