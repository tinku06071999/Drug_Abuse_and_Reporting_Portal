//import React, { useEffect, useState } from 'react';
//import {
//  BsFillArchiveFill,
//  BsFillGrid3X3GapFill,
//  BsPeopleFill,
//} from 'react-icons/bs';
//import {
//  BarChart,
//  Bar,
//  CartesianGrid,
//  XAxis,
//  YAxis,
//  Tooltip,
//  Legend,
//  ResponsiveContainer,
//} from 'recharts';
//import '../../Styles/AdminStyle.css';
//
//import {
//  getReportsByDate,
//  getAllReports,
//  getResolvedReports,
//  getPendingReports
//} from "../../api/reportApi";
//
//function AdminHome() {
//  const [reportsPerDay, setReportsPerDay] = useState([]);
//  const [totalReports, setTotalReports] = useState(0);
//  const [resolvedReports, setResolvedReports] = useState(0);
//  const [pendingReports, setPendingReports] = useState(0);
//  const [loading, setLoading] = useState(false);
//
//useEffect(() => {
//
//  const fetchReportsByDate = async () => {
//    try {
//      setLoading(true);
//
//      const res = await getReportsByDate();
//      const list = res.data || [];
//
//      const sortedReports = [...list].sort(
//        (a, b) => new Date(a.date) - new Date(b.date)
//      );
//
//      setReportsPerDay(sortedReports);
//
//      const total = sortedReports.reduce(
//        (acc, report) => acc + (report.count || 0),
//        0
//      );
//
//      setTotalReports(total);
//
//    } catch (error) {
//      console.error("Error fetching reports per day:", error);
//      alert(error?.message || "Failed to load reports");
//
//    } finally {
//      setLoading(false);
//    }
//  };
//
//  const fetchResolvedReports = async () => {
//    try {
//      const res = await getResolvedReports();
//      setResolvedReports(res.data.length);
//
//    } catch (error) {
//      console.error("Error fetching resolved reports:", error);
//    }
//  };
//
//  const fetchPendingReports = async () => {
//    try {
//      const res = await getPendingReports();
//      setPendingReports(res.data.length);
//
//    } catch (error) {
//      console.error("Error fetching pending reports:", error);
//    }
//  };
//
//  const fetchTotalReports = async () => {
//    try {
//      const res = await getAllReports();
//      setTotalReports(res.data.length);
//
//    } catch (error) {
//      console.error("Error fetching total reports:", error);
//    }
//  };
//
//  // 👉 CALL ALL FUNCTIONS here
//  fetchReportsByDate();
//  fetchResolvedReports();
//  fetchPendingReports();
//  fetchTotalReports();
//
//}, []);
//
//  return (
//    <main className="main-container">
//      <div className="main-title">
//        <h3>DASHBOARD</h3>
//      </div>
//
//      <div className="main-cards">
//        <div className="card">
//          <div className="card-inner">
//            <h3>Total Reports</h3>
//            <BsFillArchiveFill className="card_icon" />
//          </div>
//          <h1>{totalReports}</h1>
//        </div>
//
//        <div className="card">
//          <div className="card-inner">
//            <h3>Resolved Reports</h3>
//            <BsFillGrid3X3GapFill className="card_icon" />
//          </div>
//          <h1>{resolvedReports}</h1>
//        </div>
//
//        <div className="card">
//          <div className="card-inner">
//            <h3>Pending Reports</h3>
//            <BsPeopleFill className="card_icon" />
//          </div>
//          <h1>{pendingReports}</h1>
//        </div>
//      </div>
//
//      <div className="charts">
//        <ResponsiveContainer width={1000} height={400}>
//          <BarChart
//            data={reportsPerDay}
//            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
//          >
//            <CartesianGrid strokeDasharray="3 3" />
//            <XAxis
//              dataKey="date"
//              tickFormatter={(value) => value.split('/')[0]}
//              interval={0}
//            />
//            <YAxis dataKey="count" />
//            <Tooltip />
//            <Legend />
//            <Bar dataKey="count" fill="#8884d8" name="Reports" />
//          </BarChart>
//        </ResponsiveContainer>
//      </div>
//    </main>
//  );
//}
//
//export default AdminHome;


import React, { useEffect, useState } from "react";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
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

export default function AdminHome() {
  const [reportsPerDay, setReportsPerDay] = useState([]);
  const [totalReports, setTotalReports] = useState(0);
  const [resolvedReports, setResolvedReports] = useState(0);
  const [pendingReports, setPendingReports] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [byDate, all, resolved, pending] = await Promise.all([
      getReportsByDate(),
      getAllReports(),
      getResolvedReports(),
      getPendingReports(),
    ]);

    const sorted = (byDate.data || []).sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    setReportsPerDay(sorted);
    setTotalReports(all.data.length);
    setResolvedReports(resolved.data.length);
    setPendingReports(pending.data.length);
  };

  return (
    <div className="text-slate-200 space-y-8">
      <h1 className="text-2xl font-bold">
        Administration Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          color="amber"
        />
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
        <h2 className="text-lg font-semibold mb-4">
          Reports Trend
        </h2>

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

function StatCard({ icon, label, value, color }) {
  const colors = {
    cyan: "text-cyan-400",
    green: "text-emerald-400",
    amber: "text-amber-400",
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
      <div className={`text-2xl mb-3 ${colors[color]}`}>
        {icon}
      </div>
      <div className="text-sm text-slate-400 uppercase">
        {label}
      </div>
      <div className={`text-3xl font-bold ${colors[color]}`}>
        {value}
      </div>
    </div>
  );
}