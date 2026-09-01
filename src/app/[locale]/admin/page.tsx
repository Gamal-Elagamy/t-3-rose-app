import { getTranslations } from 'next-intl/server';

import { getAdminStatisticsServer } from '@/features/admin/apis/admin.server.api';
import DashboardBottom from '@/features/admin/components/overview/dashboard-bottom';
import DashboardError from '@/features/admin/components/overview/dashboard-error';
import DashboardTop from '@/features/admin/components/overview/dashboard-top';

export default async function DashboardPage() {
  const t = await getTranslations('admin-dashboard');

  const stats = await getAdminStatisticsServer().catch(() => null);

  if (!stats || !stats.status || !stats.payload) {
    return <DashboardError message={t('errors.load-failed')} />;
  }

  const { summary, categories, orderStatus, revenue } = stats.payload;

  return (
    <div className="space-y-6 p-4 md:p-6">
      <DashboardTop summary={summary} categories={categories} />
      <DashboardBottom />
    </div>
  );
}
