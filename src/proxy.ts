import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

const authPages = ['/login', '/register', '/forgot-password'];

const protectedRoutes = ['/profile'];

export default async function proxy(req: NextRequest) {
  const token = await getToken({ req });

  const pathname = req.nextUrl.pathname;

  // Remove locale prefix ("/en/profile" -> "/profile")
  const localeRegex = new RegExp(`^/(${routing.locales.join('|')})`);
  const normalizedPath = pathname.replace(localeRegex, '') || '/';

  const isAuthPage = authPages.some(
    (route) => normalizedPath === route || normalizedPath.startsWith(`${route}/`)
  );

  const isProtectedRoute = protectedRoutes.some(
    (route) => normalizedPath === route || normalizedPath.startsWith(`${route}/`)
  );

  // Logged in → don't allow auth pages
  if (token && isAuthPage) {
    const url = req.nextUrl.clone();
    url.pathname = '/';
    url.search = '';

    return NextResponse.redirect(url);
  }

  // Guest → redirect to login
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
