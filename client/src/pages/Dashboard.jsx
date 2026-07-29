import { useMemo } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import useApplications from "../hooks/useApplications";

import Loader from "../components/ui/Loader";
import EmptyState from "../components/ui/EmptyState";

import SummaryCards from "../components/dashboard/SummaryCards";
import RecentApplications from "../components/dashboard/RecentApplications";

const COLORS = [
  "#475569",
  "#3B82F6",
  "#8B5CF6",
  "#6366F1",
  "#10B981",
  "#EF4444",
  "#9CA3AF",
];

function Dashboard() {
  const { applications, loading } = useApplications();

  const statusData = useMemo(() => {
    const counts = {};

    applications.forEach((application) => {
      counts[application.status] = (counts[application.status] || 0) + 1;
    });

    return Object.entries(counts).map(([name, value]) => ({
      name,
      value,
    }));
  }, [applications]);

  const monthlyData = useMemo(() => {
    const counts = {};

    applications.forEach((application) => {
      const month = new Date(application.appliedDate).toLocaleString(
        "default",
        {
          month: "short",
        }
      );

      counts[month] = (counts[month] || 0) + 1;
    });

    return Object.entries(counts).map(([month, total]) => ({
      month,
      total,
    }));
  }, [applications]);

  if (loading) {
    return <Loader />;
  }

  if (!applications.length) {
    return (
      <EmptyState
        title="No applications yet"
        description="Start tracking your first job application."
      />
    );
  }

  return (
    <div className="space-y-8">
      <SummaryCards applications={applications} />

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-lg font-semibold">
            Applications by Status
          </h2>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                >
                  {statusData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-lg font-semibold">
            Applications by Month
          </h2>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <XAxis dataKey="month" />

                <YAxis allowDecimals={false} />

                <Tooltip />

                <Bar
                  dataKey="total"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <RecentApplications applications={applications} />
    </div>
  );
}

export default Dashboard;