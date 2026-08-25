import { HEADERS } from "@/shared/constant/api-header.constants";
import { RESPONSES } from "@/shared/constant/api.responses";
import { IApiResponse } from "@/shared/lib/types/api";
import { getNextAuthToken } from "@/shared/lib/utils/auth.utils";
import { DashboardPayload } from "../types/admin";
import { getApiBaseUrl } from "@/shared/lib/utils/api-url";

export async function getAdminStatisticsApi(): Promise<
  IApiResponse<DashboardPayload>
> {
    const token = await getNextAuthToken()
    if (!token?.token) return RESPONSES.unauthorized
    
    const response = await fetch(`${getApiBaseUrl()}/admin/statistics`, {
        headers :{
            ...HEADERS.JSON,
            ...HEADERS.AUTH(token.token)
        }
    });

    if (!response.ok) {
      return {
      status: false,
      code: response.status,
      message: `Failed to fetch admin statistics (${response.status})`,
    };
  }
    const data : IApiResponse<DashboardPayload> = await response.json()
    if (!data.status) {
        throw new Error(data.message || "Failed to get admin statistics")
    }

    return data
}