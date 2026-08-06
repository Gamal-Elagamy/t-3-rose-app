import { IApiResponse } from "@/shared/lib/types/api";
import { getApiBaseUrl } from "@/shared/lib/utils/api-url";
import { ICoupon } from "../types/copons";
import { IMetadata } from "@/features/products/types/product-reviews";

export default async function GetCoupon(search: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/coupons?search=${encodeURIComponent(search)}&isActive=true`
  );

  const data: IApiResponse<{
    data: ICoupon[];
    metadata: IMetadata;
  }> = await response.json();

  if (!response.ok || !data.status) {
    throw new Error(data.message ?? "Failed to fetch coupon");
  }

  return data;
}