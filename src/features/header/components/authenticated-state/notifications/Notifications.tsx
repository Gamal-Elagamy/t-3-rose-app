'use client';

import { useTranslations } from 'next-intl';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { Bell, BellOff, Check } from 'lucide-react';
import { useNotifications, useMarkAsRead, useMarkAllAsRead } from './hooks/use-notifications';
import { NotificationsSkeleton } from './notifications-skeleton';

export function Notifications() {
  const t = useTranslations('header.notifications');
  const { data: notifications = [], isLoading } = useNotifications();
  const markAsRead = useMarkAsRead();
  const markAllAsRead = useMarkAllAsRead();

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={
          unreadCount > 0 ? `${t('title')}: ${unreadCount} unread notifications` : t('title')
        }
        className="relative text-ds-text-default outline-none focus-visible:ring-2 focus-visible:ring-ds-bg-primary focus-visible:ring-offset-2"
      >
        <Bell className="size-5" aria-hidden="true" />

        {unreadCount > 0 && (
          <span
            aria-hidden="true"
            className="absolute -end-1.5 -top-1.5 flex size-4 items-center justify-center rounded-full bg-ds-bg-primary text-[10px] font-semibold text-ds-text-inverse"
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-[calc(100vw-2rem)] max-w-80 overflow-hidden rounded-xl border-none bg-ds-bg-plain p-0 shadow-soft-lg"
      >
        <div className="flex items-center justify-between bg-ds-bg-primary px-4 py-3">
          <h2 className="text-sm font-semibold text-ds-text-inverse">
            {notifications.length > 0
              ? t('titleWithCount', { count: notifications.length })
              : t('title')}
          </h2>
        </div>

        <div className="flex items-center justify-end border-b border-ds-border-subtle px-4 py-2 text-xs text-ds-text-muted">
          <button
            type="button"
            onClick={() => markAllAsRead.mutate()}
            disabled={unreadCount === 0 || markAllAsRead.isPending}
            className="flex items-center gap-1 rounded-sm hover:text-ds-text-default focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-40"
          >
            <Check className="size-3.5" aria-hidden="true" />
            {t('markAllAsRead')}
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {isLoading ? (
            <NotificationsSkeleton />
          ) : notifications.length === 0 ? (
            <div className="flex flex-col items-center gap-2 px-6 py-10 text-center">
              <BellOff className="size-8 text-ds-text-muted" aria-hidden="true" />
              <p className="text-sm text-ds-text-muted">{t('empty')}</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <button
                key={notification.id}
                type="button"
                onClick={() => !notification.isRead && markAsRead.mutate(notification.id)}
                className={`flex w-full flex-col items-start gap-0.5 border-b border-ds-border-subtle px-4 py-3 text-start focus-visible:outline-2 focus-visible:outline-offset-[-2px] ${
                  notification.isRead ? 'bg-ds-bg-plain' : 'bg-ds-bg-subtle'
                }`}
              >
                <p className="text-sm font-semibold text-ds-text-default">{notification.title}</p>
                <p className="line-clamp-2 text-xs text-ds-text-muted">
                  {notification.description}
                </p>
              </button>
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
