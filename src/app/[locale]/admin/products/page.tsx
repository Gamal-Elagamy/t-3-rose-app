import { Link } from '@/i18n/navigation';
import { Plus } from 'lucide-react';

export default function AdminProductsPage() {
  return (
    <div className="pt-5 px-4">
      <div className="content flex flex-col gap-4.5 p-6 rounded-2xl bg-ds-bg-plain">
        <div className="head flex items-center justify-between">
          <h1 className="font-semibold text-2xl text-ds-text-plain">Products</h1>

          <Link
            href="/admin/products/add-product"
            className="flex items-center gap-2 rounded-xl bg-maroon-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-maroon-700"
          >
            <Plus className="h-4 w-4" />
            Add Product
          </Link>
        </div>

        <div className="flex flex-col items-center justify-center py-20 text-ds-text-muted">
          <p>Products list is under development.</p>
        </div>
      </div>
    </div>
  );
}
