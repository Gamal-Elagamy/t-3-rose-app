'use client';

import { useAdminStatistics } from '../../hooks/use-admin-statistics';

import AllCategories from './all-categories';
import DashboardSummaryCards from './dashboard-summary';

export default function DashboardTop() {
  const { data, isLoading, isError } = useAdminStatistics();

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Loading...</p>;
  }

  if (isError || !data || !data.status || !('payload' in data) || !data.payload) {
    return <p className="text-sm text-red-500">Failed to load dashboard data</p>;
  }

  return (
    <section className="grid gap-6 lg:grid-cols-2">
      <DashboardSummaryCards summary={data.payload.summary} />
      <AllCategories categories={data.payload.categories} />
    </section>
  );
}
