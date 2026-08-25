import DashboardBottom from '../../../features/admin/components/overview/dashboard-bottom'; // شغلك
import DashboardTop from '../../../features/admin/components/overview/dashboard-top'; // شغلك

export default function DashboardPage() {
  return (
    <div className="space-y-6 p-6">
      <DashboardTop />
      <DashboardBottom />
    </div>
  );
}
