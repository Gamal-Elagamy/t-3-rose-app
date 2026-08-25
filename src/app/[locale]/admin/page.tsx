import AdminDashboardPage from '@/features/admin/components/overview/charts/admin-dashboard-charts';

type PageProps = {
  searchParams: Promise<{
    revenuePeriod?: string;
  }>;
};

export default async function Page({
  searchParams,
}: PageProps) {
  return (
    <AdminDashboardPage
      searchParams={searchParams}
    />
  );
}