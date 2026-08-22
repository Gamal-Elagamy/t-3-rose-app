'use server';

import { getNextAuthToken } from '@/shared/lib/utils/auth.utils';
import { getApiBaseUrl } from '@/shared/lib/utils/api-url';

export async function unsubscribePush(endpoint: string): Promise<void> {
  const jwt = await getNextAuthToken();
  const token = jwt?.token;

  if (!token) return; 

  try {
    await fetch(`${getApiBaseUrl()}/notifications/subscriptions`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ endpoint }),
    });
  } catch {
   
  }
}