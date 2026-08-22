import 'server-only';
import { getNextAuthToken } from '@/shared/lib/utils/auth.utils';
import { getApiBaseUrl } from '@/shared/lib/utils/api-url';

export interface PushStatus {
  pushConfigured: boolean;
  subscriptionCount: number;
  unreadCount: number;
}

export async function getPushStatus(): Promise<PushStatus> {
  const jwt = await getNextAuthToken();
  const token = jwt?.token;

  if (!token) {
    return { pushConfigured: false, subscriptionCount: 0, unreadCount: 0 };
  }

  try {
    const response = await fetch(`${getApiBaseUrl()}/notifications/push-status`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();

    if (!data.status) {
      return { pushConfigured: false, subscriptionCount: 0, unreadCount: 0 };
    }

    return data.payload;
  } catch {
    return { pushConfigured: false, subscriptionCount: 0, unreadCount: 0 };
  }
}