"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
} from "recharts";

interface ChartDatum {
  label: string;
  value: number;
}

const COLORS = [
  "#3b82f6",
  "#06b6d4",
  "#8b5cf6",
  "#22c55e",
  "#f59e0b",
];

export function AdminDashboardCharts({
  data,
}: {
  data: ChartDatum[];
}) {
  const pieData = data.filter((item) => item.value > 0);

  const hasData = data.some((item) => item.value > 0);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Bar Chart */}
      <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-900">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          Analytics Overview
        </h3>

        <div className="mt-4 h-72">
          {hasData ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{
                  top: 10,
                  right: 10,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e2e8f0"
                  vertical={false}
                />

                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 12 }}
                  stroke="#94a3b8"
                  tickLine={false}
                  axisLine={false}
                />

                <YAxis
                  tick={{ fontSize: 12 }}
                  stroke="#94a3b8"
                  allowDecimals={false}
                  tickLine={false}
                  axisLine={false}
                />

                <Tooltip />

                <Bar
                  dataKey="value"
                  fill="#2563eb"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={55}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-sm text-slate-400">
                No data available yet.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Pie Chart */}
      <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-900">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          Content Distribution
        </h3>

        <div className="mt-4 h-72">
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="label"
                  cx="50%"
                  cy="45%"
                  innerRadius={50}
                  outerRadius={90}
                  paddingAngle={3}
                >
                  {pieData.map((item, index) => (
                    <Cell
                      key={item.label}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Legend />

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-sm text-slate-400">
                No data available yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}