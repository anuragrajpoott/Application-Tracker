import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { getApplications } from "../api/applicationApi";

import Loader from "../components/Loader";

const COLORS = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#8b5cf6",
  "#ef4444",
  "#64748b",
];

export default function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApplications();
  }, []);

  async function loadApplications() {
    try {
      setLoading(true);

      const data = await getApplications();
      setApplications(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const {
    summary,
    statusData,
    monthlyData,
    recentApplications,
  } = useMemo(() => {
    const summary = {
      total: applications.length,
      applied: 0,
      interview: 0,
      offer: 0,
    };

    const statusCounts = {};
    const monthCounts = {};

    applications.forEach(({ status, appliedDate }) => {
      statusCounts[status] = (statusCounts[status] || 0) + 1;

      if (status === "Applied") summary.applied++;
      if (status === "Interview") summary.interview++;
      if (status === "Offer") summary.offer++;

      const month = new Date(appliedDate).toLocaleString("default", {
        month: "short",
      });

      monthCounts[month] = (monthCounts[month] || 0) + 1;
    });

    return {
      summary,

      statusData: Object.entries(statusCounts).map(([name, value]) => ({
        name,
        value,
      })),

      monthlyData: Object.entries(monthCounts).map(([month, total]) => ({
        month,
        total,
      })),

      recentApplications: [...applications]
        .sort(
          (a, b) =>
            new Date(b.appliedDate) - new Date(a.appliedDate)
        )
        .slice(0, 5),
    };
  }, [applications]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Dashboard
        </h1>

        <p className="text-slate-500">
          Overview of your job applications.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[
          ["Total", summary.total],
          ["Applied", summary.applied],
          ["Interview", summary.interview],
          ["Offer", summary.offer],
        ].map(([label, value]) => (
          <div
            key={label}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <p className="text-sm text-slate-500">{label}</p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              {value}
            </h2>
          </div>
        ))}
      </div>

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
                  fill="#3b82f6"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">
          Recent Applications
        </h2>

        {recentApplications.length === 0 ? (
          <p className="text-slate-500">
            No applications found.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b text-left">
                <tr>
                  <th className="py-3">Company</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {recentApplications.map((application) => (
                  <tr
                    key={application._id}
                    className="border-b last:border-0"
                  >
                    <td className="py-3 font-medium">
                      {application.company}
                    </td>

                    <td>{application.role}</td>

                    <td>{application.status}</td>

                    <td>
                      {new Date(
                        application.appliedDate
                      ).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}