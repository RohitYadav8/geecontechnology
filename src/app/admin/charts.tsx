"use client";

import {
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

// Brand palette: blue → violet → cyan, plus two supporting tones.
const COLORS = [
  "#2563eb",
  "#7c5cf6",
  "#06b6d4",
  "#a78bfa",
  "#60a5fa",
];

export function AdminDashboardCharts({
  data,
}: {
  data: ChartDatum[];
}) {
  const pieData = data.filter((item) => item.value > 0);

  return (
    <div className="rounded-[26px] border border-slate-200/80 bg-white p-5 shadow-[0_30px_70px_-45px_rgba(15,23,42,.45)] sm:p-7 dark:border-white/[0.07] dark:bg-[#0b1220]">
      <div className="flex items-center gap-3">
        <span className="brand-grad block h-6 w-1.5 rounded-full" />

        <h3 className="text-lg font-extrabold tracking-[-0.02em] text-slate-950 dark:text-white">
          Content Distribution
        </h3>
      </div>

      <div className="mt-4 h-80">
        {pieData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="label"
                cx="50%"
                cy="45%"
                innerRadius={65}
                outerRadius={110}
                paddingAngle={3}
                stroke="none"
              >
                {pieData.map((item, index) => (
                  <Cell
                    key={item.label}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Legend iconType="circle" />

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
  );
}
