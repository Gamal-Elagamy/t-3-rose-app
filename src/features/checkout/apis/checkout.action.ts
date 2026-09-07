'use server';

import { getNextAuthToken } from '@/shared/lib/utils/auth.utils';
import { CheckoutResponse, PayloadCheckOut } from '../types/checkout';
import { RESPONSES } from '@/shared/constant/api.responses';
import { HEADERS } from '@/shared/constant/api.constant';
import { IApiResponse } from '@/shared/lib/types/api';

export async function checkoutAction(payload: PayloadCheckOut) {
  const token = await getNextAuthToken();

  if (!token) {
    throw new Error(RESPONSES.unauthorized.message);
  }

  const res = await fetch(`${process.env.API_URL}/orders`, {
    method: 'POST',
    headers: {
      ...HEADERS.JsonBody,
      ...HEADERS.authorize(token.token),
    },
    body: JSON.stringify(payload),
  });

  const data: IApiResponse<CheckoutResponse> = await res.json();
  console.log(data);
  if (!data.status) {
    throw new Error(data.message || 'Checkout failed');
  }
  return data;
}
