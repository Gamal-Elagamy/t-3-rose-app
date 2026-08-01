"use client"

import { useQuery } from "@tanstack/react-query";
import { GetProductsParams, GetProductsResponse } from "../apis/products.api";
import { IProduct } from "../types/products";
import { IApiResponse } from "@/shared/lib/types/api";

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
            console.log("Hooks", data)

            return data.data
        },
    });
}