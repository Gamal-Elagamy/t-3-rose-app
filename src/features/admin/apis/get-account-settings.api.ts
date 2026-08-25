import { RESPONSES } from '@/shared/constant/api.responses';
import { IApiResponse } from '@/shared/lib/types/api';
import { getApiBaseUrl } from '@/shared/lib/utils/api-url';
import { getNextAuthToken } from '@/shared/lib/utils/auth.utils';
import { get } from 'http';
import React from 'react'

export default async function GetAccountSettingsApi() {

      const token = await getNextAuthToken();
      if (!token?.token) return RESPONSES.unauthorized;

      const response = await fetch(`${getApiBaseUrl()}/account-settings`, {
        headers: { Authorization: `Bearer ${token.token}` },
      });



  
}
