import { IApiResponse } from "@/shared/lib/types/api";
import { ICoupon } from "../types/copons";
import { IMetadata } from "@/features/products/types/product-reviews";

export default async function GetCoupon(search: string) {
  const url =
    `${process.env.NEXT_PUBLIC_API_URL}/coupons` +
    `?search=${encodeURIComponent(search)}` +
    `&isActive=true`;


  const response = await fetch(url);


  const data: IApiResponse<{
    data: ICoupon[];
    metadata: IMetadata;
  }> = await response.json();

  console.log('COUPON API RESPONSE:', data);

  if (!response.ok || !data.status) {
    throw new Error(
      data.message ?? 'Failed to fetch coupon'
    );
  }

  return data;
}