import { DashboardCategory, DashboardSummary as DashboardSummaryType } from '../../types/admin';

import AllCategories from './all-categories';
import DashboardSummary from './dashboard-summary';

interface DashboardTopProps {
  summary: DashboardSummaryType;
  categories: DashboardCategory[];
}

export default function DashboardTop({ summary, categories }: DashboardTopProps) {
  return (
    <section className="mb-4 grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
      <DashboardSummary summary={summary} />
      <AllCategories categories={categories} />
    </section>
  );
}
