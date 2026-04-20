import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts";
import { getUserAllResult } from "../../api/anxietyTestApi";

const AnxietyReport = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = async () => {
    try {
      const res = await getUserAllResult();
      const data = Array.isArray(res.data) ? res.data : [res.data];
      setResults(data || []);
    } catch (err) {
      console.error("Error fetching anxiety results:", err);
    }
  };

  /* ---------------------------
     Data prep
  ---------------------------- */

  const chartData = results.map((r) => ({
    date: r.date,
    score: r.score,
    level: r.level,
  }));

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    });

  /* ---------------------------
     Dark tooltip
  ---------------------------- */

  const DarkTooltip = ({ active, payload }) => {
    if (active && payload?.length) {
      const { date, score, level } = payload[0].payload;

      return (
        <div className="bg-slate-900 text-slate-200 p-3 rounded-lg text-xs shadow-xl border border-slate-700">
          <div className="opacity-70 mb-1">
            {new Date(date).toLocaleString()}
          </div>
          <div className="text-cyan-400 font-semibold">
            Score: {score}
          </div>
          <div
            className={`font-semibold mt-1 ${
              score >= 36
                ? "text-red-400"
                : score >= 22
                ? "text-amber-400"
                : "text-emerald-400"
            }`}
          >
            {level}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 p-6">
      <h1 className="text-2xl font-bold tracking-wide text-slate-200 text-center mb-8">
        Anxiety Analytics
      </h1>

      <div className="max-w-6xl mx-auto bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-slate-800">
        <p className="text-sm text-slate-400 mb-5 text-center tracking-wide">
          Anxiety score trend across your assessments
        </p>

        <ResponsiveContainer width="100%" height={420}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="anxietyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.35} />
                <stop offset="85%" stopColor="#38bdf8" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1e293b"
              opacity={0.35}
            />

            <XAxis
              dataKey="date"
              tickFormatter={formatDate}
              tick={{ fill: "#94a3b8", fontSize: 11 }}
            />
            <YAxis
              domain={[0, 63]}
              tick={{ fill: "#94a3b8", fontSize: 11 }}
              allowDecimals={false}
            />

            {/* Severity thresholds */}
            <ReferenceLine
              y={22}
              stroke="#fbbf24"
              strokeDasharray="5 5"
              label={{
                value: "Moderate",
                fill: "#fbbf24",
                position: "insideTopRight",
              }}
            />
            <ReferenceLine
              y={36}
              stroke="#f87171"
              strokeDasharray="5 5"
              label={{
                value: "High",
                fill: "#f87171",
                position: "insideTopRight",
              }}
            />

            <Tooltip content={<DarkTooltip />} />

            <Area
              type="monotone"
              dataKey="score"
              stroke="#38bdf8"
              strokeWidth={2.8}
              fill="url(#anxietyGradient)"
              dot={false}
              activeDot={{ r: 7, fill: "#38bdf8" }}
              animationDuration={900}
            />
          </AreaChart>
        </ResponsiveContainer>

        {/* Legend-style explanation */}
        <div className="flex flex-wrap justify-center gap-4 mt-6 text-xs">
          <LegendItem color="emerald" label="Low Anxiety (<22)" />
          <LegendItem color="amber" label="Moderate Anxiety (22–35)" />
          <LegendItem color="red" label="High Anxiety (36+)" />
        </div>
      </div>
    </div>
  );
};

function LegendItem({ color, label }) {
  const colorMap = {
    emerald: "bg-emerald-400",
    amber: "bg-amber-400",
    red: "bg-red-400",
  };

  return (
    <div className="flex items-center gap-2 text-slate-300">
      <span className={`w-3 h-3 rounded-full ${colorMap[color]}`} />
      <span>{label}</span>
    </div>
  );
}

export default AnxietyReport;
