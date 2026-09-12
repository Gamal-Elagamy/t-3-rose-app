import { ProductsPage } from '@/features/products/components/dashboard/products-table/products-table-page'
interface PageProps {
  searchParams: Promise<{ page?: string; search?: string }>;
}
export default function ProductsAdminPage ({ searchParams }: PageProps) {
  return (
    <div>
<ProductsPage searchParams={searchParams} />
    </div>
  )
}
