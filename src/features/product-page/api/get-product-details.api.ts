import React from 'react';
import { IMetadata } from '../types/product-reviews';
import { ProductResponse } from '../types/product-details';

export default async function GetProductDetails(productId?: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`);

  const data: IApiResponse<ProductResponse> = await response.json();

  if (!response.ok || !data.status) {
    throw new Error(data.message ?? 'Failed to fetch Product Details');
  }
  return data.payload?.product;
}
