import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

const authPages = ['/login', '/register', '/forgot-password'];
const protectedRoutes = ['/profile', '/cart/checkout'];

export default async function proxy(req: NextRequest) {
  const token = await getToken({ req });

  const pathname = req.nextUrl.pathname;

  const localeRegex = new RegExp(`^/(${routing.locales.join('|')})`);
  const normalizedPath = pathname.replace(localeRegex, '') || '/';
  const NON_REMEMBERED_SESSION_MAX_AGE = 24 * 60 * 60;
  const isAuthPage = authPages.some(
    (route) => normalizedPath === route || normalizedPath.startsWith(`${route}/`)
  );

  const isProtectedRoute = protectedRoutes.some(
    (route) => normalizedPath === route || normalizedPath.startsWith(`${route}/`)
  );

  if (token && isAuthPage) {
    const url = req.nextUrl.clone();
    url.pathname = '/';
    url.search = '';
    return NextResponse.redirect(url);
  }

  if (token && !token.rememberMe) {
    const loginTime = token.loginTime as number;
    const now = Math.floor(Date.now() / 1000);
    const sessionAge = now - loginTime;
    const maxSessionAge = NON_REMEMBERED_SESSION_MAX_AGE;

    if (sessionAge > maxSessionAge) {
      const url = req.nextUrl.clone();
      url.pathname = '/login';
      const response = NextResponse.redirect(url);
      response.cookies.delete('next-auth.session-token');
      return response;
    }
  }

  if (!token && isProtectedRoute) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('returnUrl', pathname + req.nextUrl.search);
    return NextResponse.redirect(url);
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)'],
};
