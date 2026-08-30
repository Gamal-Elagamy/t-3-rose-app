import { ProductsPage } from '@/features/products/components/dashboard/products-table/products-table-page'
import React from 'react'
interface PageProps {
  searchParams: Promise<{ page?: string; search?: string }>;
}
export default function ({ searchParams }: PageProps) {
  return (
    <div>
<ProductsPage searchParams={searchParams} />
    </div>
  )
}
