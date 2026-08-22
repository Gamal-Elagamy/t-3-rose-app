'use client';

import { useState, useEffect, useCallback } from 'react';
import { urlBase64ToUint8Array } from '@/shared/lib/utils/push-utils';
import { getVapidPublicKeyAction } from '../actions/get-vapid-key-action';
import { saveSubscription } from '../actions/save-subscription';
import { unsubscribePush } from '../actions/unsubscribe-push';

export function usePushNotifications() {
  // State
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  // Effects
  useEffect(() => {
    async function checkStatus() {
      const supported = 'serviceWorker' in navigator && 'PushManager' in window;
      setIsSupported(supported);

      if (!supported) return;

      const registration = await navigator.serviceWorker.getRegistration();
      const subscription = await registration?.pushManager.getSubscription();
      setIsSubscribed(!!subscription);
    }

    checkStatus();
  }, []);

  // Handlers
  const subscribeToPush = useCallback(async () => {
    if (!isSupported) return;

    const permission = await Notification.requestPermission();
    if (permission !== 'granted') return;

    const registration = await navigator.serviceWorker.register('/sw.js');

    const vapidPublicKey = await getVapidPublicKeyAction(); 

    if (!vapidPublicKey) {
      console.warn('Push notifications unavailable: VAPID key not configured on server');
      return;
    }

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
    });

    await saveSubscription(
      subscription.toJSON() as { endpoint: string; keys: { p256dh: string; auth: string } }
    );

    setIsSubscribed(true);
  }, [isSupported]);

  const unsubscribeFromPush = useCallback(async () => {
    const registration = await navigator.serviceWorker.getRegistration();
    const subscription = await registration?.pushManager.getSubscription();

    if (!subscription) return;

    await unsubscribePush(subscription.endpoint); 

    await subscription.unsubscribe();
    setIsSubscribed(false);
  }, []);

  return { isSubscribed, isSupported, subscribeToPush, unsubscribeFromPush };
}