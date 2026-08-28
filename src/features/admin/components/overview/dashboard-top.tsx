import AllCategories from './all-categories';
import DashboardSummary from './dashboard-summary';

export default function DashboardTop() {
  return (
    <section className="mb-4 grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
      <DashboardSummary />
      <AllCategories />
    </section>
  );
}
