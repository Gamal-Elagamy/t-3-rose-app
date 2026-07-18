'use client';

import { useTranslations } from 'next-intl';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { Bell, BellOff, Check } from 'lucide-react';
import { useNotifications, useMarkAsRead, useMarkAllAsRead } from './hooks/useNotifications';

export function Notifications() {
  const t = useTranslations();
  const { data: notifications = [], isLoading } = useNotifications();
  const markAsRead = useMarkAsRead();
  const markAllAsRead = useMarkAllAsRead();

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative text-ds-text-default outline-none">
        <Bell className="size-5" />
        {unreadCount > 0 && (
          <span className="absolute -end-1.5 -top-1.5 flex size-4 items-center justify-center rounded-full bg-ds-bg-primary text-[10px] font-semibold text-ds-text-inverse">
            {unreadCount}
          </span>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-80 overflow-hidden rounded-xl border-none bg-white p-0 shadow-soft-lg"
      >
        <div className="flex items-center justify-between bg-ds-bg-primary px-4 py-3">
          <h2 className="text-sm font-semibold text-ds-text-inverse">
            {notifications.length > 0
              ? t('header.notifications.titleWithCount', { count: notifications.length })
              : t('header.notifications.title')}
          </h2>
        </div>

        <div className="flex items-center justify-end border-b border-ds-border-subtle px-4 py-2 text-xs text-ds-text-muted">
          <button
            onClick={() => markAllAsRead.mutate()}
            disabled={unreadCount === 0 || markAllAsRead.isPending}
            className="flex items-center gap-1 hover:text-ds-text-default disabled:opacity-40"
          >
            <Check className="size-3.5" />
            {t('header.notifications.markAllAsRead')}
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="px-4 py-10 text-center text-sm text-ds-text-muted">
              {t('header.notifications.loading')}
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex flex-col items-center gap-2 px-6 py-10 text-center">
              <BellOff className="size-8 text-ds-text-muted" />
              <p className="text-sm text-ds-text-muted">{t('header.notifications.empty')}</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <button
                key={notification.id}
                onClick={() => !notification.isRead && markAsRead.mutate(notification.id)}
                className={`flex w-full flex-col items-start gap-0.5 border-b border-ds-border-subtle px-4 py-3 text-start ${
                  notification.isRead ? 'bg-white' : 'bg-ds-bg-subtle'
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
