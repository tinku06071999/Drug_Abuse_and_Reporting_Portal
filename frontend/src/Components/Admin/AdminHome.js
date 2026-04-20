// AdminHome.jsx
import React, { useEffect, useMemo, useState } from "react";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsSpeedometer2,
  BsPersonCheck,
  BsEnvelopeOpen,
} from "react-icons/bs";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  getReportsByDate,
  getAllReports,
  getResolvedReports,
  getPendingReports,
} from "../../api/reportApi";
import { getEmployees } from "../../api/employeeApi";
import { getAllResponses } from "../../api/collegeSupportApi";

export default function AdminHome() {
  const [reportsPerDay, setReportsPerDay] = useState([]);
  const [totalReports, setTotalReports] = useState(0);
  const [resolvedReports, setResolvedReports] = useState(0);
  const [pendingReports, setPendingReports] = useState(0);
  const [employees, setEmployees] = useState([]);
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [
        byDate,
        allReports,
        resolved,
        pending,
        employeeRes,
        supportRes,
      ] = await Promise.all([
        getReportsByDate(),
        getAllReports(),
        getResolvedReports(),
        getPendingReports(),
        getEmployees(),
        getAllResponses(),
      ]);

      const sorted = (byDate.data || []).sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );

      setReportsPerDay(sorted);
      setTotalReports(allReports.data.length);
      setResolvedReports(resolved.data.length);
      setPendingReports(pending.data.length);
      setEmployees(employeeRes.data || []);
      setResponses(supportRes.data || []);
    } catch (err) {
      console.error("Failed to load admin dashboard data", err);
      alert("Failed to load admin analytics");
    }
  };

  /* ---------------------------
     Derived Insights
  ---------------------------- */
  const resolutionRate = totalReports
    ? Math.round((resolvedReports / totalReports) * 100)
    : 0;

  const verifiedEmployees = employees.filter((e) => e.verified).length;
  const adminCount = employees.filter((e) =>
    e.roles?.includes("ADMIN")
  ).length;

  const uniqueStudents = useMemo(
    () => new Set(responses.map((r) => r.rollNumber)).size,
    [responses]
  );

  const avgMsgPerStudent = uniqueStudents
    ? (responses.length / uniqueStudents).toFixed(1)
    : 0;

  const trend = useMemo(() => {
    if (reportsPerDay.length < 2) return "Stable";
    return reportsPerDay.at(-1).count > reportsPerDay.at(-2).count
      ? "Increasing"
      : "Decreasing";
  }, [reportsPerDay]);

  /* ---------------------------
     UI
  ---------------------------- */
  return (
    <div className="p-6 space-y-10 text-slate-200">

      <h1 className="text-2xl font-bold">Admin Analytics Dashboard</h1>

      {/* KPI ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-6 gap-6">
        <StatCard
          icon={<BsFillArchiveFill />}
          label="Total Reports"
          value={totalReports}
          color="cyan"
        />
        <StatCard
          icon={<BsFillGrid3X3GapFill />}
          label="Resolved"
          value={resolvedReports}
          color="green"
        />
        <StatCard
          icon={<BsPeopleFill />}
          label="Pending"
          value={pendingReports}
          color="red"
        />
        <StatCard
          icon={<BsSpeedometer2 />}
          label="Resolution %"
          value={`${resolutionRate}%`}
          color="amber"
        />
        <StatCard
          icon={<BsPersonCheck />}
          label="Verified Employees"
          value={verifiedEmployees}
          color="green"
        />
        <StatCard
          icon={<BsEnvelopeOpen />}
          label="Support Messages"
          value={responses.length}
          color="cyan"
        />
      </div>

      {/* INSIGHTS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InsightCard
          title="Employee Onboarding"
          value={`${verifiedEmployees}/${employees.length} verified`}
          status={verifiedEmployees >= employees.length - 2 ? "Healthy" : "Attention"}
        />

        <InsightCard
          title="Student Engagement"
          value={`${uniqueStudents} Students`}
          helper={`Avg ${avgMsgPerStudent} msgs/student`}
        />

        <InsightCard
          title="Report Trend"
          value={trend}
          status={trend === "Increasing" ? "Warning" : "Stable"}
        />
      </div>

      {/* CHART */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
        <h2 className="text-lg font-semibold mb-4">Reports Per Day</h2>

        <ResponsiveContainer width="100%" height={360}>
          <BarChart data={reportsPerDay}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis
              dataKey="date"
              tickFormatter={(d) =>
                new Date(d).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                })
              }
            />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#38bdf8" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* ===========================
   Small Components
=========================== */

function StatCard({ icon, label, value, color }) {
  const colors = {
    cyan: "text-cyan-400",
    green: "text-emerald-400",
    red: "text-red-400",
    amber: "text-amber-400",
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
      <div className={`text-2xl mb-2 ${colors[color]}`}>{icon}</div>
      <div className="text-xs text-slate-400 uppercase">{label}</div>
      <div className={`text-2xl font-bold ${colors[color]}`}>{value}</div>
    </div>
  );
}

function InsightCard({ title, value, helper, status }) {
  const colors = {
    Healthy: "text-emerald-400",
    Attention: "text-amber-400",
    Warning: "text-red-400",
    Stable: "text-cyan-400",
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
      <div className="text-sm text-slate-400 uppercase mb-1">{title}</div>
      <div className={`text-2xl font-bold ${colors[status] || "text-cyan-400"}`}>
        {value}
      </div>
      {helper && <div className="text-xs text-slate-400 mt-2">{helper}</div>}
      {status && <div className={`text-sm mt-2 ${colors[status]}`}>{status}</div>}
    </div>
  );
}