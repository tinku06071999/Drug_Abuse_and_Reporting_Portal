//// TotalReports.js
//import React, { useEffect, useState, useCallback } from 'react';
//import AdminHeader from './AdminHeader';
//import { getAllReports, updateReportStatus } from '../../api/reportApi';
//import AdminNavbar from "./AdminNavbar";
//
//function TotalReports() {
//  const [allReports, setAllReports] = useState([]);
//  const [resolvedReports, setResolvedReports] = useState([]);
//  const [unresolvedReports, setUnresolvedReports] = useState([]);
//  const [filterType, setFilterType] = useState('all');
//  const [loading, setLoading] = useState(false);
//
//  const splitBuckets = useCallback((list) => {
//    const resolved = list.filter((r) => !!r.resolved);
//    const unresolved = list.filter((r) => !r.resolved);
//    setResolvedReports(resolved);
//    setUnresolvedReports(unresolved);
//  }, []);
//
//  const fetchReports = useCallback(async () => {
//    try {
//      setLoading(true);
//      const res = await getAllReports();
//      const data = Array.isArray(res?.data) ? res.data : [];
//      setAllReports(data);
//      splitBuckets(data);
//
//    } catch (error) {
//      console.error("Error fetching reports:", error);
//      alert(error?.response?.data?.message || error?.message || "Failed to load reports");
//    } finally {
//      setLoading(false);
//    }
//  }, [splitBuckets]);
//
//  useEffect(() => {
//    fetchReports();
//  }, [fetchReports]);
//
//  const pickId = (report) => report?._id ?? null;
//
//  // Optimistic local toggle after server confirms
//  const toggleLocal = (reportId, newResolved) => {
//    const updated = allReports.map((r) =>
//      (pickId(r) === reportId) ? { ...r, resolved: newResolved } : r
//    );
//    setAllReports(updated);
//    splitBuckets(updated);
//  };
//
//
//
//    const resolveReport = async (report) => {
//
//      try {
//        const report_id = pickId(report)
//         console.log('Resolving report with id:', report_id, 'raw:', report);
//
//        if (!report_id) {
//              console.log("CLICKED REPORT:", report);
//                    console.log("pickId(report):", pickId(report));
//              alert('Invalid report id (id missing on the object).');
//              return;
//            }
//
//        await updateReportStatus(report_id);
//        toggleLocal(report_id, true);
//      } catch (error) {
//        console.error('Error resolving report:', error);
//        alert(error?.response?.data || error?.message || "Failed to resolve");
//      }
//    };
//
//
//    const unresolveReport = async (report) => {
//
//      try {
//        const report_id = pickId(report);
//
//        console.log('Unresolving report with id:', report_id, 'raw:', report);
//
//        if (!report_id) {
//        alert("CLICKED REPORT:", report);
//         alert("pickId(report):", pickId(report));
//          alert('Invalid report id (id missing on the object).');
//          return;
//        }
//
//        await updateReportStatus(report_id);
//        toggleLocal(report_id, false);
//      } catch (error) {
//        console.error('Error marking report as unresolved:', error);
//        alert(error?.response?.data || error?.message || "Failed to mark unresolved");
//      }
//    };
//
//  const handleFilterChange = (filter) => setFilterType(filter);
//
//  const getFilteredReports = () => {
//    switch (filterType) {
//      case 'resolved': return resolvedReports;
//      case 'unresolved': return unresolvedReports;
//      default: return allReports;
//    }
//  };
//
//  return (
//    <div>
//      <AdminNavbar />
//      <div className="container mx-auto mt-8 p-10">
//        <div className="flex items-center gap-4">
//          <h1 className="text-3xl font-bold mb-4">All Reports</h1>
//          {loading && <span className="text-sm text-gray-500">Loading…</span>}
//        </div>
//
//        {/* Filter Buttons */}
//        <div className="mb-4">
//          <button
//            onClick={() => handleFilterChange('all')}
//            className={`mr-2 px-4 py-2 rounded ${filterType === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
//          >
//            All Reports ({allReports.length})
//          </button>
//          <button
//            onClick={() => handleFilterChange('resolved')}
//            className={`mr-2 px-4 py-2 rounded ${filterType === 'resolved' ? 'bg-green-500 text-white' : 'bg-gray-300'}`}
//          >
//            Resolved ({resolvedReports.length})
//          </button>
//          <button
//            onClick={() => handleFilterChange('unresolved')}
//            className={`px-4 py-2 rounded ${filterType === 'unresolved' ? 'bg-red-500 text-white' : 'bg-gray-300'}`}
//          >
//            Unresolved ({unresolvedReports.length})
//          </button>
//        </div>
//
//        {/* Reports Grid */}
//        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//          {getFilteredReports().map((report) => {
//            const id = pickId(report);
//            return (
//              <div
//                key={id}
//                className={`border p-4 rounded shadow-md ${report.resolved ? 'bg-green-100 border-green-300' : 'bg-red-100 border-red-300'}`}
//              >
//                <h2 className={`text-${report.resolved ? 'green' : 'red'}-800 font-semibold mb-2`}>
//                  {report.resolved ? 'Resolved' : 'Unresolved'}
//                </h2>
//                <p className="text-gray-800">Title: {report.title}</p>
//                <p className="text-gray-600">Place of Incident: {report.placeOfIncident}</p>
//                <p className="text-gray-600">Date: {String(report.date)}</p>
//                <p className="text-gray-600">Time: {report.time}</p>
//                <p className="text-gray-600">Description: {report.description}</p>
//                <p className="text-gray-600">Seriousness: {report.seriousness}</p>
//
//                {!report.resolved ? (
//                  <button
//                    onClick={() => resolveReport(report)}
//                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
//                  >
//                    Resolve
//                  </button>
//                ) : (
//                  <button
//                    onClick={() => unresolveReport(report)}
//                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
//                  >
//                    Mark Unresolved
//                  </button>
//                )}
//              </div>
//            );
//          })}
//        </div>
//      </div>
//    </div>
//  );
//}
//
//export default TotalReports;
// TotalReports.jsx
import React, { useEffect, useState, useCallback, useMemo } from "react";
import AdminNavbar from "./AdminNavbar";
import { getAllReports, updateReportStatus } from "../../api/reportApi";

export default function TotalReports() {
  const [allReports, setAllReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterType, setFilterType] = useState("all");

  /* ---------------------------
     Helpers
  ---------------------------- */
  const pickId = (r) => r?._id ?? null;

  const resolvedReports = useMemo(
    () => allReports.filter((r) => r.resolved),
    [allReports]
  );

  const unresolvedReports = useMemo(
    () => allReports.filter((r) => !r.resolved),
    [allReports]
  );

  const filteredReports = useMemo(() => {
    switch (filterType) {
      case "resolved":
        return resolvedReports;
      case "unresolved":
        return unresolvedReports;
      default:
        return allReports;
    }
  }, [filterType, allReports, resolvedReports, unresolvedReports]);

  /* ---------------------------
     Fetch Data
  ---------------------------- */
  const fetchReports = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getAllReports();
      setAllReports(Array.isArray(res?.data) ? res.data : []);
    } catch (err) {
      alert(err?.response?.data || err?.message || "Failed to load reports");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  /* ---------------------------
     Resolve / Unresolve
  ---------------------------- */
  const toggleStatus = async (report, nextResolved) => {
    const id = pickId(report);
    if (!id) return alert("Invalid report id");

    try {
      await updateReportStatus(id);
      setAllReports((prev) =>
        prev.map((r) =>
          pickId(r) === id ? { ...r, resolved: nextResolved } : r
        )
      );
    } catch (err) {
      alert(err?.response?.data || err?.message || "Update failed");
    }
  };

  /* ---------------------------
     UI
  ---------------------------- */
  return (
    <div className="flex-1 flex flex-col bg-slate-950 text-slate-200 min-h-screen">
      <AdminNavbar />

      <div className="p-6 space-y-8">

        {/* Header */}
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Reports Overview</h1>
          {loading && (
            <span className="text-sm text-slate-400">Loading…</span>
          )}
        </div>

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <KpiCard label="Total Reports" value={allReports.length} />
          <KpiCard
            label="Resolved"
            value={resolvedReports.length}
            color="green"
          />
          <KpiCard
            label="Unresolved"
            value={unresolvedReports.length}
            color="red"
          />
        </div>

        {/* FILTERS */}
        <div className="flex gap-3">
          <FilterButton
            active={filterType === "all"}
            onClick={() => setFilterType("all")}
          >
            All
          </FilterButton>
          <FilterButton
            active={filterType === "resolved"}
            color="green"
            onClick={() => setFilterType("resolved")}
          >
            Resolved
          </FilterButton>
          <FilterButton
            active={filterType === "unresolved"}
            color="red"
            onClick={() => setFilterType("unresolved")}
          >
            Unresolved
          </FilterButton>
        </div>

        {/* REPORT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredReports.map((report) => (
            <ReportCard
              key={pickId(report)}
              report={report}
              onResolve={() => toggleStatus(report, true)}
              onUnresolve={() => toggleStatus(report, false)}
            />
          ))}

          {filteredReports.length === 0 && (
            <div className="text-slate-400 col-span-full">
              No reports found for this filter.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------
   Components
---------------------------- */

function KpiCard({ label, value, color = "cyan" }) {
  const colors = {
    cyan: "text-cyan-400",
    green: "text-emerald-400",
    red: "text-red-400",
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-md">
      <div className="text-xs uppercase tracking-wide text-slate-500">
        {label}
      </div>
      <div className={`text-2xl font-bold mt-1 ${colors[color]}`}>
        {value}
      </div>
    </div>
  );
}

function FilterButton({ active, children, onClick, color = "cyan" }) {
  const colors = {
    cyan: "data-[active=true]:bg-cyan-600",
    green: "data-[active=true]:bg-emerald-600",
    red: "data-[active=true]:bg-red-600",
  };



  return (
    <button
      data-active={active}
      onClick={onClick}
      className={`
        px-4 py-2 rounded-lg text-sm transition
        bg-slate-800 text-slate-300 hover:bg-slate-700
        ${colors[color]} data-[active=true]:text-white
      `}
    >
      {children}
    </button>
  );
}

function ReportCard({ report, onResolve, onUnresolve }) {
  const resolved = report.resolved;
const formatDate = (value) =>
  value
    ? new Date(value).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Not specified";

  return (
    <div
      className={`
        rounded-lg p-4 shadow-md border
        ${resolved
          ? "bg-emerald-900/20 border-emerald-700"
          : "bg-red-900/20 border-red-700"}
      `}
    >
      <div
        className={`text-xs font-semibold mb-1 ${
          resolved ? "text-emerald-400" : "text-red-400"
        }`}
      >
        {resolved ? "Resolved" : "Unresolved"}
      </div>

      <p className="text-slate-100 font-medium text-sm">
        {report.title}
      </p>

      <div className="mt-2 text-xs text-slate-400 space-y-0.5">
        <div>📍 {report.placeOfIncident}</div>
        <div>📅 {formatDate(report.date)}</div>
        <div>⏰ {report.time ?? "Not specified"}</div>
        <div>⚠️ {report.seriousness ?? "Unknown"}</div>
      </div>

      <p className="mt-2 text-xs text-slate-300 line-clamp-2">
        {report.description}
      </p>

      <div className="mt-3">
        {!resolved ? (
          <ActionButton color="green" onClick={onResolve}>
            Mark Resolved
          </ActionButton>
        ) : (
          <ActionButton color="red" onClick={onUnresolve}>
            Mark Unresolved
          </ActionButton>
        )}
      </div>
    </div>
  );
}

function ActionButton({ children, onClick, color }) {
  const colors = {
    green: "bg-emerald-600 hover:bg-emerald-700",
    red: "bg-red-600 hover:bg-red-700",
  };

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-xs text-white transition ${colors[color]}`}
    >
      {children}
    </button>
  );
}