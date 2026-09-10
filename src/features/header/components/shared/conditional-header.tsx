'use client';

import { usePathname } from '@/i18n/navigation';
import { Header } from '../../header';

const authRoutes = ['/login', '/register', '/forgot-password'];
interface ConditionalHeaderProps {
  wishlistCount: number;
}

export function ConditionalHeader({ wishlistCount }: ConditionalHeaderProps) {
  // Hooks
  const pathname = usePathname();

  const isAuthPage = authRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isAuthPage) {
    return null;
  }

  return <Header wishlistCount={wishlistCount} />;
}
