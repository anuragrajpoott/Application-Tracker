// src/components/application/Charts.jsx

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const COLORS = [
  "#64748b",
  "#3b82f6",
  "#f59e0b",
  "#22c55e",
  "#ef4444",
];

export default function Charts({ applications }) {
  const statusCounts = applications.reduce((counts, { status }) => {
    counts[status] = (counts[status] ?? 0) + 1;
    return counts;
  }, {});

  const data = Object.entries(statusCounts).map(([name, value]) => ({
    name,
    value,
  }));

  const hasData = data.length > 0;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-lg font-semibold text-slate-900">
        Applications by Status
      </h2>

      {!hasData ? (
        <p className="text-slate-500">
          No data available.
        </p>
      ) : (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {data.map(({ name }, index) => (
                  <Cell
                    key={name}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}