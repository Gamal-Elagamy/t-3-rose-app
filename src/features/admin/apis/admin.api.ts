import { getNextAuthToken } from "@/shared/lib/utils/auth.utils";

export async function getAdminStatisticsApi() {
    
    const token = await getNextAuthToken()
    if (token?.token) return RESPONSES 
}