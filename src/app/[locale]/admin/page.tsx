import AdminDashboardPage from '@/features/admin/components/overview/charts/admin-dashboard-charts';
import DashboardBottom from '../../../features/admin/components/overview/dashboard-bottom'; // شغلك
import DashboardTop from '../../../features/admin/components/overview/dashboard-top'; // شغلك
import { getTranslations } from 'next-intl/server';
import { getAdminStatisticsServer } from '@/features/admin/apis/admin.server.api';
import DashboardError from '@/features/admin/components/overview/dashboard-error';

type PageProps = {
  searchParams: Promise<{
    revenuePeriod?: string;
  }>;
};

export default async function DashboardPage({ searchParams }: PageProps) {
  const t = await getTranslations('admin-dashboard');

  const stats = await getAdminStatisticsServer().catch(() => null);

  if (!stats || !stats.status || !stats.payload) {
    return <DashboardError message={t('errors.load-failed')} />;
  }

  const { summary, categories, orderStatus, revenue } = stats.payload;
  return (
    <div className="w-full space-y-6 p-3 sm:p-4 md:p-6">
      <DashboardTop summary={summary} categories={categories} />
      <AdminDashboardPage searchParams={searchParams} />
      <DashboardBottom />
    </div>
  );
}
