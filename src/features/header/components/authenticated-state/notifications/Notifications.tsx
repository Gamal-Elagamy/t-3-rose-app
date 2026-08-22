'use client';

import { useTranslations } from 'next-intl';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { Bell, BellOff, BellRing, Check } from 'lucide-react';
import { useNotifications, useMarkAsRead, useMarkAllAsRead } from './hooks/use-notifications';
import { NotificationsSkeleton } from './notifications-skeleton';
import type { PushStatus } from './apis/get-push-status'; 
import { usePushNotifications } from './hooks/use-push-notifications';


interface NotificationsProps { 
  pushStatus: PushStatus;
}

export function Notifications({ pushStatus }: NotificationsProps) {
  const t = useTranslations('header.notifications');
  const { data: notifications = [], isLoading } = useNotifications();
  const markAsRead = useMarkAsRead();
  const markAllAsRead = useMarkAllAsRead();
  const { isSubscribed, isSupported, subscribeToPush, unsubscribeFromPush } = usePushNotifications();

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative text-ds-text-default outline-none">
        <Bell className="size-5" />
        {unreadCount > 0 && (
          <span className="absolute -end-1.5 -top-1.5 flex size-4 items-center justify-center rounded-full bg-ds-bg-primary text-[10px] font-semibold text-ds-text-inverse">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-80 overflow-hidden rounded-xl  border-none bg-ds-bg-plain p-0 shadow-soft-lg"
      >
        <div className="flex items-center  justify-between bg-ds-bg-primary px-4 py-3">
          <h2 className="text-sm font-semibold text-ds-text-inverse">
            {notifications.length > 0
              ? t('titleWithCount', { count: notifications.length })
              : t('title')}
          </h2>
          {isSupported && pushStatus.pushConfigured && ( 
            <button
              onClick={isSubscribed ? unsubscribeFromPush : subscribeToPush}
              className="text-ds-text-inverse/80 hover:text-ds-text-inverse"
              aria-label={isSubscribed ? t('disablePush') : t('enablePush')}
              title={isSubscribed ? t('disablePush') : t('enablePush')}
            >
              {isSubscribed ? <BellRing className="size-4" /> : <BellOff className="size-4" />}
            </button>
          )}
        </div>

        <div className="flex items-center justify-end border-b border-ds-border-subtle px-4 py-2 text-xs text-ds-text-muted">
          <button
            onClick={() => markAllAsRead.mutate()}
            disabled={unreadCount === 0 || markAllAsRead.isPending}
            className="flex items-center gap-1 hover:text-ds-text-default disabled:opacity-40"
          >
            <Check className="size-3.5" />
            {t('markAllAsRead')}
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {isLoading ? (
            <NotificationsSkeleton />
          ) : notifications.length === 0 ? (
            <div className="flex flex-col items-center gap-2 px-6 py-10 text-center">
              <BellOff className="size-8 text-ds-text-muted" />
              <p className="text-sm text-ds-text-muted">{t('empty')}</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <button
                key={notification.id}
                onClick={() => !notification.isRead && markAsRead.mutate(notification.id)}
                className={`flex w-full flex-col items-start gap-0.5 border-b border-ds-border-subtle px-4 py-3 text-start ${
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
