'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

async function fetchUnreadCount(): Promise<number> {
  const response = await fetch('/api/notifications/unread-count');
  const data = await response.json();

  if (!data.status) return 0;

  return data.payload.unreadCount ?? data.payload.count ?? 0;
}

export function useUnreadCount() {
  const { status } = useSession();

  return useQuery({
    queryKey: ['notifications', 'unread-count'],
    queryFn: fetchUnreadCount,
    enabled: status === 'authenticated',
    refetchInterval: 30 * 1000,
  });
}