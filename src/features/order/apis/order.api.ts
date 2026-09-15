import { HEADERS } from "@/shared/constant/api-header.constants";
import { RESPONSES } from "@/shared/constant/api.responses";
import { IApiResponse } from "@/shared/lib/types/api";
import { getNextAuthToken } from "@/shared/lib/utils/auth.utils";
import { Order } from "../types/order";
import { ORDERS_PER_PAGE } from "@/shared/constant/orders-constant";

export async function getOrdersApi({ page = 1, limit = ORDERS_PER_PAGE }: { page?: number; limit?: number }) {
    const token = await getNextAuthToken()
    if (!token) return RESPONSES.unauthorized

    const res = await fetch(`${process.env.API_URL}/orders?page=${page}&limit=${limit}`, {
        method: "GET",
        headers: {
            ...HEADERS.JSON,
            ...HEADERS.AUTH(token.token),
        },
    })
    const data: IApiResponse<{
        data: Order[];
        metadata: {
            page: string;
            limit: string;
            total: string;
            totalPages: string;
        }
    }> = await res.json()
    if (!data.status) {
        throw new Error(data.message || "Failed to get orders")
    }
    return data
}