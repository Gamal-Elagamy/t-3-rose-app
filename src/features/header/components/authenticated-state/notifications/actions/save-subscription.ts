'use server';

import { getNextAuthToken } from '@/shared/lib/utils/auth.utils';
import { getApiBaseUrl } from '@/shared/lib/utils/api-url';

interface SubscriptionPayload {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

export async function saveSubscription(subscription: SubscriptionPayload): Promise<void> {
  const jwt = await getNextAuthToken();
  const token = jwt?.token;

  if (!token) {
    throw new Error('User is not authenticated');
  }

  const response = await fetch(`${getApiBaseUrl()}/notifications/subscriptions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(subscription),
  });

  const data = await response.json();

  if (!response.ok || !data.status) {
    throw new Error(data.message || 'Failed to save subscription');
  }
}