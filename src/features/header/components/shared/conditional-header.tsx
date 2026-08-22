'use client';

import { usePathname } from '@/i18n/navigation';
import { Header } from '../../header';
import type { PushStatus } from '../authenticated-state/notifications/apis/get-push-status';

const authRoutes = ['/login', '/register', '/forgot-password'];
interface ConditionalHeaderProps {
  pushStatus: PushStatus;
}
export function ConditionalHeader({ pushStatus }: ConditionalHeaderProps) {
  // Hooks
  const pathname = usePathname();

  const isAuthPage = authRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isAuthPage) {
    return null;
  }

  return <Header pushStatus={pushStatus} />;
}
