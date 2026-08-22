import 'server-only';
import { getNextAuthToken } from '@/shared/lib/utils/auth.utils';
import { getApiBaseUrl } from '@/shared/lib/utils/api-url';

export async function getVapidPublicKey(): Promise<string | null> {
  const jwt = await getNextAuthToken();
  const token = jwt?.token;

  if (!token) return null;

  try {
    const response = await fetch(`${getApiBaseUrl()}/notifications/vapid-public-key`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();

    if (!data.status || !data.payload?.publicKey) {
      return null;
    }

    return data.payload.publicKey;
  } catch {
    return null;
  }
}