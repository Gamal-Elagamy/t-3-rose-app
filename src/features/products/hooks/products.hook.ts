"use client"

import { useQuery } from "@tanstack/react-query";
import { GetProductsParams } from "../apis/products.api";
import { IProduct } from "../types/products";

interface IProductsResponse {
  data: IProduct[];
  metadata: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}


export function useGetProductsQuery(params: GetProductsParams) {
    return useQuery({
        queryKey: ["products", params],
        queryFn: async () => {
            const searchParams = new URLSearchParams();

            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== null && value !== "") {
                    searchParams.append(key, String(value));
                }
            });
            const res = await fetch(`/api/products?${searchParams.toString()}`);

            const data: IProductsResponse = await res.json()

            return data.data
        },
    });
}