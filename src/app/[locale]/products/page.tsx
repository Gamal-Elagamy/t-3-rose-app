import { Suspense } from 'react';
import { SidebarFilters } from '@/features/products/components/sidebar-filters/sidebar-filters';

export default async function ProductsPage() {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-[300px_1fr] gap-6">
          <Suspense fallback={<div className="w-72">Loading filters...</div>}>
            <SidebarFilters />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
