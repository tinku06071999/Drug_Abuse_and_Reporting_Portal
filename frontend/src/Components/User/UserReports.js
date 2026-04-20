import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { getQuizResults } from "../../api/userQuizApi";

export default function UserReports() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const res = await getQuizResults();
      const data = Array.isArray(res.data) ? res.data : [];
      setQuizzes(data);
    } catch (e) {
      console.error("Error loading reports", e);
    }
  };

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    });

  const mapData = (key, transform = (v) => v) =>
    quizzes.map((q) => ({
      date: q.date,
      value: transform(q[key] ?? 0),
    }));

  const meditation = mapData("meditationMinutes");
  const exercise = mapData("exerciseMinutes");
  const sleep = mapData("sleepHours");
  const sober = mapData("sober", (v) => (v === "Yes" ? 1 : 0));

  const sum = (arr) => arr.reduce((a, b) => a + b.value, 0);

  const DarkTooltip = ({ active, payload }) => {
    if (active && payload?.length) {
      const { date, value } = payload[0].payload;
      return (
        <div className="bg-slate-900 text-slate-200 p-2 rounded-lg text-xs shadow-lg border border-slate-700">
          <div className="opacity-70">{new Date(date).toLocaleString()}</div>
          <div className="font-semibold text-cyan-400">{value}</div>
        </div>
      );
    }
    return null;
  };


  const ChartCard = ({ title, data, color }) => (
    <div className="bg-slate-900/80 backdrop-blur-xl rounded-xl p-4 shadow-xl border border-slate-800">
      <h3 className="text-sm uppercase tracking-wider text-slate-400 mb-2">
        {title}
      </h3>

      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id={title} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.4} />
              <stop offset="90%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#1e293b"
            opacity={0.3}
          />
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            tick={{ fill: "#94a3b8", fontSize: 11 }}
          />
          <YAxis
            tick={{ fill: "#94a3b8", fontSize: 11 }}
            allowDecimals={false}
          />
          <Tooltip content={<DarkTooltip />} />

          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2.5}
            fill={`url(#${title})`}
            dot={false}
            activeDot={{ r: 6, fill: color }}
            animationDuration={900}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 p-6">
      <h1 className="text-2xl font-bold tracking-wide text-slate-200 text-center mb-8">
        Wellness Analytics
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        <ChartCard title="Meditation (Min)" data={meditation} color="#38bdf8" />
        <ChartCard title="Exercise (Min)" data={exercise} color="#4ade80" />
        <ChartCard title="Sleep (Hours)" data={sleep} color="#818cf8" />
        <ChartCard title="Sober Days" data={sober} color="#facc15" />
      </div>


      <div className="max-w-4xl mx-auto mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <Summary label="Meditation" value={sum(meditation)} />
        <Summary label="Exercise" value={sum(exercise)} />
        <Summary label="Sleep" value={sum(sleep)} />
        <Summary label="Sober Days" value={sum(sober)} />
      </div>
    </div>
  );
}

function Summary({ label, value }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 text-center shadow-md">
      <div className="text-xs uppercase tracking-widest text-slate-400">
        {label}
      </div>
      <div className="text-2xl font-bold text-cyan-400 mt-1">{value}</div>
    </div>
  );
}