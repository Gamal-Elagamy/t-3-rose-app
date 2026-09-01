import LowStockProducts from './low-stock-products';
import TopSellingProducts from './top-selling-products';

export default function DashboardBottom() {
  return (
    <section className="grid gap-6 lg:grid-cols-2">
      <TopSellingProducts />
      <LowStockProducts />
    </section>
  );
}
