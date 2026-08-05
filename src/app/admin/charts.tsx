"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

interface ChartDatum {
    label: string;
    value: number;
}

const COLORS = ["#ef4444", "#3b82f6", "#a855f7", "#22c55e", "#f97316"];

export function AdminDashboardCharts({ data }: { data: ChartDatum[] }) {
    const pieData = data.filter((d) => d.value > 0);

    return (
        <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-900">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">Analytics Overview</h3>
                <div className="mt-4 h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey="label" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                            <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" allowDecimals={false} />
                            <Tooltip />
                            <Bar dataKey="value" fill="#0f172a" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-900">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">Content Distribution</h3>
                <div className="mt-4 h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={pieData} dataKey="value" nameKey="label" cx="50%" cy="50%" outerRadius={90} label>
                                {pieData.map((_, i) => (
                                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                ))}
                            </Pie>
                            <Legend />
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
