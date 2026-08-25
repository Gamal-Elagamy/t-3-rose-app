import { GetChartsApi } from "@/features/admin/apis/get-charts.api";
import { OrderStatusChart } from "./order-status/order-status-chart";
import { RevenueChart,  } from "./revenue/revenue-chart";

type AdminDashboardPageProps = {
  searchParams: Promise<{
    revenuePeriod?: string;
  }>;
};

export default async function AdminDashboardPage({
  searchParams,
}: AdminDashboardPageProps) {
  const params = await searchParams;

  const revenuePeriod =
    params?.revenuePeriod === 'week'
      ? 'week'
      : 'monthly';

  const stats = await GetChartsApi(revenuePeriod);

  return (
    <div className="grid grid-cols-1  sm:grid-cols-2  lg:grid-cols-4">
      <OrderStatusChart orderStatus={stats.orderStatus} />

    
        <RevenueChart
        revenue={stats.revenue}
        period={revenuePeriod}
      />
     
    </div>
  );
}