'use server';

import { getVapidPublicKey } from '../apis/get-vapid-key';

export async function getVapidPublicKeyAction(): Promise<string | null> {
  return getVapidPublicKey();
}