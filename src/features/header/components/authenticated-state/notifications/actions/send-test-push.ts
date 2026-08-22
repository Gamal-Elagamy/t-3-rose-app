'use server';

import { getNextAuthToken } from '@/shared/lib/utils/auth.utils';
import { getApiBaseUrl } from '@/shared/lib/utils/api-url';

export async function sendTestPush(): Promise<{ success: boolean; message?: string }> {
  const jwt = await getNextAuthToken();
  const token = jwt?.token;

  if (!token) {
    return { success: false, message: 'Unauthorized' };
  }

  const response = await fetch(`${getApiBaseUrl()}/notifications/test-push`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();

  if (!response.ok || !data.status) {
    return { success: false, message: data.message || 'Failed to send test push' };
  }

  return { success: true };
}