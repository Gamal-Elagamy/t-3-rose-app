export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  isRead: boolean;
}


export interface PaginatedNotifications {
  data: NotificationItem[];
  metadata: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
