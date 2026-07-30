import { SidebarFilters } from '@/features/products/components/sidebar-filters/sidebar-filters';

export default function Products() {
  return (
    <div className="flex gap-6">
      <SidebarFilters />

      <div className="flex-1">Products list...</div>
    </div>
  );
}
