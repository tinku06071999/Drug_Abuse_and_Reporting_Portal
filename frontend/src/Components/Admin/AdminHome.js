import React, { useEffect, useState } from 'react';
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
} from 'react-icons/bs';
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import '../../Styles/AdminStyle.css';

import {
  getReportsByDate,
  getAllReports,
  getResolvedReports,
  getPendingReports
} from "../../api/reportApi";

function AdminHome() {
  const [reportsPerDay, setReportsPerDay] = useState([]);
  const [totalReports, setTotalReports] = useState(0);
  const [resolvedReports, setResolvedReports] = useState(0);
  const [pendingReports, setPendingReports] = useState(0);
  const [loading, setLoading] = useState(false);

useEffect(() => {

  const fetchReportsByDate = async () => {
    try {
      setLoading(true);

      const res = await getReportsByDate();
      const list = res.data || [];

      const sortedReports = [...list].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );

      setReportsPerDay(sortedReports);

      const total = sortedReports.reduce(
        (acc, report) => acc + (report.count || 0),
        0
      );

      setTotalReports(total);

    } catch (error) {
      console.error("Error fetching reports per day:", error);
      alert(error?.message || "Failed to load reports");

    } finally {
      setLoading(false);
    }
  };

  const fetchResolvedReports = async () => {
    try {
      const res = await getResolvedReports();
      setResolvedReports(res.data.length);

    } catch (error) {
      console.error("Error fetching resolved reports:", error);
    }
  };

  const fetchPendingReports = async () => {
    try {
      const res = await getPendingReports();
      setPendingReports(res.data.length);

    } catch (error) {
      console.error("Error fetching pending reports:", error);
    }
  };

  const fetchTotalReports = async () => {
    try {
      const res = await getAllReports();
      setTotalReports(res.data.length);

    } catch (error) {
      console.error("Error fetching total reports:", error);
    }
  };

  // 👉 CALL ALL FUNCTIONS here
  fetchReportsByDate();
  fetchResolvedReports();
  fetchPendingReports();
  fetchTotalReports();

}, []);

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>DASHBOARD</h3>
      </div>

      <div className="main-cards">
        <div className="card">
          <div className="card-inner">
            <h3>Total Reports</h3>
            <BsFillArchiveFill className="card_icon" />
          </div>
          <h1>{totalReports}</h1>
        </div>

        <div className="card">
          <div className="card-inner">
            <h3>Resolved Reports</h3>
            <BsFillGrid3X3GapFill className="card_icon" />
          </div>
          <h1>{resolvedReports}</h1>
        </div>

        <div className="card">
          <div className="card-inner">
            <h3>Pending Reports</h3>
            <BsPeopleFill className="card_icon" />
          </div>
          <h1>{pendingReports}</h1>
        </div>
      </div>

      <div className="charts">
        <ResponsiveContainer width={1000} height={400}>
          <BarChart
            data={reportsPerDay}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(value) => value.split('/')[0]}
              interval={0}
            />
            <YAxis dataKey="count" />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" name="Reports" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}

export default AdminHome;