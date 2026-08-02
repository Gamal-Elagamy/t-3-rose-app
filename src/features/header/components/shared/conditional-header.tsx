'use client';

import { usePathname } from '@/i18n/navigation';
import { Header } from '../../header';

const authRoutes = ['/login', '/register', '/forgot-password'];

export function ConditionalHeader() {
  // Hooks
  const pathname = usePathname();

  const isAuthPage = authRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isAuthPage) {
    return null;
  }

  return <Header />;
}
