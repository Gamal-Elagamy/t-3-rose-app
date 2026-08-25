import AdminDashboardPage from '@/features/admin/components/overview/charts/admin-dashboard-charts';
import DashboardBottom from '../../../features/admin/components/overview/dashboard-bottom'; // شغلك
import DashboardTop from '../../../features/admin/components/overview/dashboard-top'; // شغلك

type PageProps = {
  searchParams: Promise<{
    revenuePeriod?: string;
  }>;
};


export default function DashboardPage( { searchParams }: PageProps) {
  return (
    <div className="space-y-6 p-6">
      <DashboardTop />
       <AdminDashboardPage
      searchParams={searchParams}
    />
      <DashboardBottom />

      
    </div>
  );
}
