import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface ApiResponse<T> {
  status: boolean;
  message?: string;
  payload?: T;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  isRead: boolean;
}

const NOTIFICATIONS_QUERY_KEY = ['notifications'];

async function fetchApi<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`/api${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
  });
  const data: ApiResponse<T> = await response.json();
  if (!data.status) throw new Error(data.message || 'Request failed');
  return data.payload as T;
}

export function useNotifications() {
  return useQuery({
    queryKey: NOTIFICATIONS_QUERY_KEY,
    queryFn: () => fetchApi<NotificationItem[]>('/notifications'),
  });
}

export function useMarkAsRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetchApi(`/notifications/${id}`, { method: 'PATCH', body: JSON.stringify({ isRead: true }) }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_QUERY_KEY }),
  });
}

export function useMarkAllAsRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => fetchApi('/notifications/mark-all-read', { method: 'PATCH' }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_QUERY_KEY }),
  });
}
