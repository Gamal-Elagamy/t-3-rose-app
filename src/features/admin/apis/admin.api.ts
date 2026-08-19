import { HEADERS } from "@/shared/constant/api-header.constants";
import { RESPONSES } from "@/shared/constant/api.responses";
import { IApiResponse } from "@/shared/lib/types/api";
import { getNextAuthToken } from "@/shared/lib/utils/auth.utils";

export async function getAdminStatisticsApi() {
    
    const token = await getNextAuthToken()
    if (!token?.token) return RESPONSES.unauthorized
    
    const response = await fetch(`/admin/statistics`, {
        headers :{
            ...HEADERS.JSON,
            ...HEADERS.AUTH(token.token)
        }
    })

    const data : IApiResponse<{}> = await response.json()

    if (!data.status) {
        throw new Error(data.message || "Failed to get admin statistics")
    }

    return data
}