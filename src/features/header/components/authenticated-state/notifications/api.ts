import { PaginatedNotifications, NotificationItem } from '@/shared/lib/types/notifications';

async function fetchApi<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`/api${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
  });
  const data: IApiResponse<T> = await response.json();
  if (!data.status) throw new Error(data.message || 'Request failed');
  return data.payload as T;
}

export function fetchNotifications() {
  return fetchApi<PaginatedNotifications>('/notifications');
}

export function markNotificationAsRead(id: string) {
  return fetchApi(`/notifications/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ isRead: true }),
  });
}

export function markAllNotificationsAsRead() {
  return fetchApi('/notifications/mark-all-read', { method: 'PATCH' });
}
