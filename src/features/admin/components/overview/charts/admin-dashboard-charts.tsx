import { getAdminStatistics } from "@/features/admin/apis/get-admin-statistics";
import { OrderStatusChart } from "./order-status/order-status-chart";
import { RevenueChartClient } from "./revenue/revenue-chart";

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

  const stats = await getAdminStatistics(revenuePeriod);

  return (
    <div className="grid grid-cols-1  p-6  sm:grid-cols-2  lg:grid-cols-4">
      <OrderStatusChart orderStatus={stats.orderStatus} />

    
        <RevenueChartClient
        revenue={stats.revenue}
        period={revenuePeriod}
      />
     
    </div>
  );
}