'use client';

import { useCallback } from 'react';
import { urlBase64ToUint8Array } from '@/shared/lib/utils/push-utils';

export function usePushNotifications() {
  const subscribeToPush = useCallback(async () => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      return;
    }

    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      return;
    }

    const registration = await navigator.serviceWorker.register('/sw.js');

    const vapidRes = await fetch('/api/notifications/vapid-public-key');
    const vapidData = await vapidRes.json();
    const vapidPublicKey = vapidData.payload?.publicKey ?? vapidData.publicKey;

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
    });

    await fetch('/api/notifications/subscriptions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(subscription.toJSON()),
    });
  }, []);

  return { subscribeToPush };
}
